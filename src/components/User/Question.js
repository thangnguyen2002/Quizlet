import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";

const Question = (props) => {
    const { data, index, handleCheckBox } = props
    const [isPreviewImage, setIsPreviewImage] = useState(false)

    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    const handleHandleCheckBox = (event, answerId, questionId) => {
        // console.log(event.target.checked)
        // console.log('answerId:', answerId, ' questionId:', questionId)
        handleCheckBox(answerId, questionId)
    }

    // console.log(data)

    return (
        <>
            {data.image ?
                <div className="q-image">
                    <img src={`data:image/jpeg;base64,${data.image}`}
                        onClick={() => setIsPreviewImage(true)}
                        style={{ cursor: 'pointer' }}
                    />
                    {isPreviewImage === true &&
                        <Lightbox image={`data:image/jpeg;base64,${data.image}`}
                            title={"Question Image"}
                            onClose={() => setIsPreviewImage(false)}
                        >
                        </Lightbox>
                    }

                </div>
                :
                <div className="q-image">
                </div>
            }
            <div className="q-question">
                Question {index + 1}: {data.questionDesc}
            </div>
            <div className="q-answers">
                {data.answers && data.answers.length &&
                    data.answers.map(answer => {
                        {/* console.log(answer) */ }
                        return (
                            <div className="form-check" key={`${answer.id}-key`}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={answer.id}
                                    checked={answer.isSelected} //dựa theo state của react để biết true hay false
                                    onClick={(event) => handleHandleCheckBox(event, answer.id, data.questionId)} />
                                <label className="form-check-label" for={answer.id}>
                                    <div className="answer-child">{answer.description}</div>
                                </label>
                            </div>
                        )
                    })}
            </div>
        </>
    );
}

export default Question;