import { useEffect, useState } from 'react';
import './Dashboard.scss'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import { getOverView } from '../../../services/apiService';


const Dashboard = () => {
    const [dataOverView, setDataOverView] = useState([]) // data from api
    const [dataChart, setDataChart] = useState([]) //set data for displaying on chart

    // console.log('datachart: ', dataChart);

    useEffect(() => {
        fetchDataOverView()
    }, [])

    const fetchDataOverView = async () => {
        const res = await getOverView()
        if (res && res.EC === 0) {
            setDataOverView(res.DT)

            let Qz = 0, Qs = 0, As = 0
            Qz = res?.DT?.others?.countQuiz ?? 0 //?? is default: 0
            Qs = res?.DT?.others?.countQuestions ?? 0 //?? is default: 0
            As = res?.DT?.others?.countAnswers ?? 0 //?? is default: 0
            const data = [
                {
                    "name": "Total Quizzes",
                    "Qz": Qz,
                },
                {
                    "name": "Total Questions",
                    "Qs": Qs,
                },
                {
                    "name": "Total Answers",
                    "As": As,
                }
            ]
            setDataChart(data)
        }
    }
    // console.log('dataOverView: ', dataOverView); //useEffect chay sau cai nay


    return (
        <div className='dashboard-container'>
            <div className="title">
                Analytics Dashboard
            </div>

            <div className="content">
                <div className="c-left">
                    <div className="child">
                        <span className='text1'>Total Users</span>
                        <span className='text2'>
                            {
                                dataOverView && dataOverView.users && dataOverView.users.total ?
                                    <>{dataOverView.users.total}</> : <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className='text1'>Total Quizzes</span>
                        <span className='text2'>
                            {
                                dataOverView && dataOverView.others && dataOverView.others.countQuiz ?
                                    <>{dataOverView.others.countQuiz}</> : <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className='text1'>Total Questions</span>
                        <span className='text2'>
                            {
                                dataOverView && dataOverView.others && dataOverView.others.countQuestions ?
                                    <>{dataOverView.others.countQuestions}</> : <>0</>
                            }
                        </span>
                    </div>
                    <div className="child">
                        <span className='text1'>Total Answers</span>
                        <span className='text2'>
                            {
                                dataOverView && dataOverView.others && dataOverView.others.countAnswers ?
                                    <>{dataOverView.others.countAnswers}</> : <>0</>
                            }
                        </span>
                    </div>
                </div>

                <div className="c-right">
                    <ResponsiveContainer width="94%" height={'100%'}>
                        <BarChart width={730} height={250} data={dataChart}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <XAxis dataKey="name" />
                            {/* <YAxis /> */}
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#e5990a" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;