import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getDataQuiz, postQuizSubmit } from '../../services/apiService';
import _ from 'lodash';
import './DetailQuiz.scss'
import Question from './Question';
import ModalResult from './ModalResult';
import RightContent from './Content/RightContent';

const DetailQuiz = () => {
    const [quizData, setQuizData] = useState([])
    const [index, setIndex] = useState(0)
    const [showModalResult, setShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState({})

    const location = useLocation()
    // console.log(location);

    const params = useParams()
    // console.log('params: ', params)
    const quizId = params.id

    useEffect(() => {
        fetchQuestions()
    }, [quizId])
    //mỗi khi ngdùng chọn bài quiz khác hoặc lần đầu vào component này thì get data questions của quiz có id tương ứng

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId)
        // console.log('res: ', res)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id")
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let questionDesc, image = null
                    let answers = []

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDesc = item.description
                            image = item.image
                        }
                        item.answers.isSelected = false
                        answers.push(item.answers)
                        // console.log('item: ', item)
                    })
                    //sap xep lai cau tra loi theo id, thu tu asc la tang dan (lodash order by)
                    answers = _.orderBy(answers, ['id'], ['asc'])

                    // console.log('value: ', value)
                    return { questionId: key, questionDesc, answers, image } //key:value giong nhau nen viet tat nhu nay cung dc
                })
                .value()
            // console.log('data: ', data)
            setQuizData(data)
        }
    }

    // console.log('quizData: ', quizData)

    const handlePrev = () => {
        //tim phan tu dau tien 
        if (index - 1 < 0) return

        setIndex(index - 1)
    }

    const handleNext = () => {
        //tim phan tu cuoi cung
        if (quizData && quizData.length > index + 1) //coi quizData.length nhu index cuoi cung cua array quizData[]
            // để so sanh index o vi tri cuoi cung = quizData.length nen ta + 1 vao index vi index bat dau tu 0, neu chi de index thi khi lengthArray = 3 -> index = 2 se = length array -> ko dung
            setIndex(index + 1)
    }

    const handleCheckBox = (answerId, questionId) => {
        //chi dc thao tac qua ham` setQuizData hoac muon thao tac truc tiep state thi phai dung ham` trong lodash
        // cloneDeep clone tat ca object boc trong
        let dataQuizClone = _.cloneDeep(quizData)
        // console.log('dataQuizClone: ', dataQuizClone)
        let question = dataQuizClone.find(question => +question.questionId === +questionId)
        if (question && question.answers) {
            // console.log('question: ', question)
            question.answers = question.answers.map(answer => { //map xong thi` gan' de update answers của question
                // console.log(answer);
                if (answer.id === answerId) { //trung id -> toggle checked
                    answer.isSelected = !answer.isSelected
                }
                return answer //map return 1 array chua cac answer nen co the gan vao question.answer
            })
            // console.log(question.answers);

        }
        let index = dataQuizClone.findIndex(question => +question.questionId === +questionId)
        // console.log('index: ', index)
        if (index !== -1) {
            //question sau khi đã update isSelected -> gán vào câu hỏi hiện tại qua findIndex
            dataQuizClone[index] = question
            // console.log('dataQuizClone after update: ', dataQuizClone)
            setQuizData(dataQuizClone) //update state quizData để react lưu trạng thái state vào react
        }
    }

    const handleSubmitQuiz = async () => {
        // {
        //     "quizId": 1,
        //     "answers": [
        //         { 
        //             "questionId": 1,
        //             "userAnswerId": [3]
        //         },
        //         { 
        //             "questionId": 2,
        //             "userAnswerId": [6]
        //         }
        //     ]
        // }
        // console.log('quizData before submit: ', quizData)
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = []
        if (quizData && quizData.length > 0) { //>0 to make sure array not null
            //loop từng question trong array quizData
            quizData.forEach(question => {
                let questionId = +question.questionId
                let userAnswerId = [] //array này chỉ chứa id của từng question được loop

                question.answers.forEach(answer => {
                    if (answer.isSelected === true) {
                        userAnswerId.push(answer.id)
                    }
                })
                answers.push({
                    questionId: questionId,
                    userAnswerId: userAnswerId
                })
            })
        }
        payload.answers = answers
        // console.log('payload final: ', payload)
        // submit api
        let res = await postQuizSubmit(payload)
        // console.log('res: ', res)
        if (res && res.EC === 0) {
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setShowModalResult(true) //ko co loi thi moi show modal result
        } else {
            alert('something went wrong...')
        }
    }

    return (
        <div className='q-detail-container'>
            <div className='content-left'>
                <div className="q-title">
                    Quiz {quizId}: {location?.state?.description}
                </div>
                <hr />

                <div className="q-content">
                    <Question
                        handleCheckBox={handleCheckBox}
                        index={index}
                        data={quizData && quizData.length > 0 ?
                            quizData[index]
                            : []}
                    />
                </div>

                <div className="footer">
                    <button className='btn btn-secondary' onClick={handlePrev}>Prev</button>
                    <button className='btn btn-primary' onClick={handleNext}>Next</button>
                    <button className='btn btn-danger' onClick={handleSubmitQuiz}>Finish</button>
                </div>
            </div>

            <div className='content-right'>
                <RightContent quizData={quizData}
                    handleSubmitQuiz={handleSubmitQuiz}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult
                show={showModalResult}
                setShow={setShowModalResult}
                dataModalResult={dataModalResult}
            />
        </div>
    );
}

export default DetailQuiz;