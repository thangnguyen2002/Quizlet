import { useState, useEffect } from 'react';
import { getQuizUser } from '../../services/apiService';
import './ListQuiz.scss'
import { useNavigate } from 'react-router-dom';

const ListQuiz = () => {
    const [arrQuiz, setArrQuiz] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async () => {
        let res = await getQuizUser()
        if (res && res.EC === 0) {
            // console.log('res: ', res)
            setArrQuiz(res.DT)
        }
    }

    return (
        // container la class boostrap, nó sẽ thêm margin left right ra 1 chút cho cân
        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map(quiz => {
                    return (
                        <div className="card" style={{ width: "18rem" }} key={`${quiz.id}-userQuiz`}>
                            <img src={`data:image/jpeg;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {quiz.id}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`, { state: { description: quiz.description } })}>
                                    Start Now
                                </button>
                            </div>
                        </div>
                    )
                })
            }

            {arrQuiz && arrQuiz.length === 0 &&
                <div>You don't have any Quiz now...</div>
            }
        </div>
    );
}

export default ListQuiz;