import React, { useEffect, useState } from 'react'

const RightContent = (props) => {
    const { quizData, handleSubmitQuiz } = props
    const [count, setCount] = useState(10) //5 mins
    useEffect(() => {
        if (count === 0) {
            handleSubmitQuiz() //het tgian -> tu dong nop bai
            return
        }

        const time = setInterval(() => {
            setCount(count - 1)
        }, 1000)

        // setTimeout(() => {
        //     clearInterval(time)
        // }, 5000)

        //time1 setCount -> change count
        //time2 setCount -> change count
        //... -> tao ra loop time, rat nhieu -> chay loan xa.

        //useEffect has return function to do something before continue running useEffect again
        //dc goi la ham` cleanUp
        //giai doan cleanUp giup chung ta thuc thi code, truoc 1 lan render moi
        return () => {
            clearInterval(time) //moi lan run useEffect -> create const time -> clear it -> run useEffect again (bc count is changed)
        }

    }, [count]) //ban dau chay vao day, va moi khi count change -> run code inside useEffect

    //Convert seconds to HH-MM-SS
    const toHHMMSS = (secs) => {
        const sec_num = parseInt(secs, 10)
        const hours = Math.floor(sec_num / 3600)
        const minutes = Math.floor(sec_num / 60) % 60
        const seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    return (
        <>
            <div className="main-timer">
                {toHHMMSS(count)}
            </div>

            <div className="main-question">
                {quizData && quizData.length > 0
                    && quizData.map((item, index) => {
                        return (
                            <div className="question" key={`Question-${index}`}>{index + 1}</div>
                        )
                    })}
            </div>
        </>
    )
}

export default RightContent