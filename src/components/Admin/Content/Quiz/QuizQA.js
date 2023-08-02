import { useState, useEffect } from 'react';
import Select from 'react-select';
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { BsPatchMinusFill } from "react-icons/bs";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import "./QuizQA.scss"
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postUpsertQA } from "../../../../services/apiService";
import { getQuizWithQA } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const QuizQA = () => {
    // const options = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' },
    // ]
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [dataImagePreview, setDataImagePreview] = useState({
        url: '',
        title: ''
    })
    const [listQuiz, setListQuiz] = useState([])

    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },
                // {
                //     id: uuidv4(),
                //     description: '',
                //     isCorrect: false,
                // },
            ]
        }
    ]

    const [questions, setQuestions] = useState(initQuestions)
    // console.log('questions: ', questions)

    console.log('selected quiz: ', selectedQuiz); //moi khi select no se state cua no dc thay doi
    useEffect(() => {
        fetchQuiz()
    }, [])

    useEffect(() => { //trong hook define bn useEffect cung dc
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA()
        }
    }, [selectedQuiz]) //quan sat moi khi selectedQuiz thay doi -> thuc hien logic trong ham` useEffect

    //convert base 64 -> file object
    function urltoFile(url, filename, mimeType) {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer() })
            .then(function (buf) { return new File[buf], filename, { type: mimeType } })
        )
    }

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value)
        if (res && res.EC === 0) {
            let newQA = []
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]
                if (q.imageFile) {
                    q.imageFile = `Question-${q.id}.png`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, `image/png`)
                }
                newQA.push(q)
            }
            setQuestions(newQA)
        }
    }

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin()
        // console.log('res: ', res)
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    // console.log(selectedQuiz);
    // console.log('listQuiz: ', listQuiz)

    const handleAddRemoveQuestion = (type, id) => {
        // console.log(type, id)
        if (type === 'ADD') {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false,
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }

        if (type === 'REMOVE') {
            let questionClone = _.cloneDeep(questions)
            questionClone = questionClone.filter((question => id !== question.id))
            setQuestions(questionClone)
        }
    }

    const handleAddRemoveAnswer = (type, quesId, ansId) => {
        // console.log(type, quesId, ansId)
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(question => question.id === quesId) //xac dinh question

        if (type === 'ADD') {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false,
            }
            questionClone[index].answers.push(newAnswer)
            setQuestions(questionClone)
        }

        if (type === 'REMOVE') {
            if (index > -1) {
                // loc array answers
                questionClone[index].answers = questionClone[index].answers.filter(answer => answer.id !== ansId) //xac dinh answer
                setQuestions(questionClone)
            }
        }
    }

    const handleOnChange = (type, quesId, value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(question => question.id === quesId)
        if (index > -1) {
            if (type === 'QUESTION') {
                questionClone[index].description = value
                setQuestions(questionClone)
            }
        }
    }

    const handleOnChangeFileQuestion = (quesId, event) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(question => question.id === quesId)

        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionClone[index].imageFile = event.target.files[0]
            // console.log(event.target.files[0])
            questionClone[index].imageName = event.target.files[0].name
            setQuestions(questionClone)
        }
    }

    const handleAnswerQuestion = (type, quesId, ansId, value) => {
        // console.log(type, quesId, ansId, value)
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(question => question.id === quesId)
        if (index > -1) {
            if (type === 'CHECKBOX') {
                // console.log(type, quesId, ansId, value)
                questionClone[index].answers = questionClone[index].answers.map(answer => {
                    if (answer.id === ansId) {
                        answer.isCorrect = value
                    }
                    return answer
                })
                setQuestions(questionClone)
            }
            if (type === 'INPUT') {
                questionClone[index].answers = questionClone[index].answers.map(answer => {
                    if (answer.id === ansId) {
                        answer.description = value
                    }
                    return answer
                })
                setQuestions(questionClone)
            }
        }
    }

    const handleSubmitQuestionsForQuiz = async () => {
        // console.log('Submit: ', questions, selectedQuiz)
        // validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a Quiz!')
            return //ko cho chay tiep
        }

        // validate answer
        let isValidAnswer = true
        let indexQ = 0, indexA = 0
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) { //if null
                    isValidAnswer = false;
                    indexA = j
                    break;
                }
            }
            indexQ = i
            if (isValidAnswer === false) break //ko cho chay tiep nua
        }
        // console.log('isVali:', isValid, 'indexQ:', indexQ, 'indexA:', indexA);
        if (isValidAnswer === false) {
            toast.error(`Answer ${indexA + 1} at question ${indexQ + 1} is required`)
            return
        }

        // validate question
        let isValidQ = true
        let indexQ1 = 0
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQ = false
                indexQ1 = i
                break
            }
        }
        if (isValidQ === false) {
            toast.error(`Question ${indexQ1 + 1} is required`)
            return
        }

        let questionsClone = _.cloneDeep(questions)
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile)
            }
        }

        let res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone,
        })

        if (res && res.EC === 0) {
            toast.success(res.EM)
            fetchQuizWithQA()
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

    const handlePreviewImage = (quesId) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(question => question.id === quesId)
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setIsPreviewImage(true) //true -> hien modal lightbox
        }
    }

    return (
        <div className="questions-container">
            <div className="add-new-question">
                <div className="col-6">
                    <label>Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>

                <div className="mt-3">Add questions:</div>
                {questions && questions.length > 0
                    && questions.map((question, index) => {
                        return (
                            <div className='q-main mb-3' key={question.id}>
                                <div className="questions-content">
                                    <div className="form-floating mb-3 description">
                                        <input type="text"
                                            className='form-control'
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label>Question {index + 1} 's Description</label>
                                    </div>
                                    <div className="group-upload">
                                        {/* htmlFor va id generate động vì ta có rất nhiều câu hỏi -> sẽ bị trùng do cùng 1 lúc click nhiều cái sẽ sai -> lỗi */}
                                        <label className='label-up' htmlFor={`${question.id}`}><RiImageAddFill /></label>
                                        <input type={"file"}
                                            onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                            hidden id={`${question.id}`} />
                                        <span>{question.imageName ?
                                            <span onClick={() => handlePreviewImage(question.id)} style={{ cursor: 'pointer' }}>{question.imageName}</span>
                                            :
                                            '0 file is uploaded'}
                                        </span>
                                    </div>
                                    <div className="btn-add">
                                        <span onClick={() => handleAddRemoveQuestion('ADD')}>
                                            <BsFillPatchPlusFill className="icon-add" />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsPatchMinusFill className="icon-remove" />
                                            </span>
                                        }
                                    </div>
                                </div>

                                {question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div className="answers-content" key={answer.id}>
                                                <input type="checkbox"
                                                    className='form-check-input isCorrect'
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                />
                                                <div className="form-floating mb-3 answer-name">
                                                    <input
                                                        type="text"
                                                        className='form-control'
                                                        placeholder="name@example.com"
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)}
                                                    />
                                                    <label>Answer {index + 1} 's Description</label>
                                                </div>
                                                <div className="btn-add">
                                                    <span onClick={() => handleAddRemoveAnswer('ADD', question.id)}>
                                                        <AiFillPlusCircle className="icon-add" />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                            <IoMdRemoveCircleOutline className="icon-remove" />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        )
                    })
                }

                {questions && questions.length > 0 &&
                    <div>
                        <button className='btn btn-warning'
                            onClick={handleSubmitQuestionsForQuiz}>
                            Save Questions
                        </button>
                    </div>
                }
            </div>

            {isPreviewImage === true && //true -> hien modal <lightbox></lightbox>
                <Lightbox image={dataImagePreview.url}
                    title={dataImagePreview.title}
                    onClose={() => setIsPreviewImage(false)} //onClose cần 1 hàm gtri false để tắt lightbox
                >
                </Lightbox>
            }
        </div>
    );
}

export default QuizQA;