import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const ManageQuiz = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' },
    ]

    const handleChangeFile = (e) => {
        if (e.target && e.target.files && e.target.files[0])
            setImage(e.target.files[0])
    }

    const handleSubmitQuiz = async () => {
        //validate
        if (!name || !description) {
            toast.error('Name/description is required')
            return //ko goi api
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image)
        console.log('res: ', res)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setName('')
            setDescription('')
            setType('')
            setImage(null)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            {/* <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quiz</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quiz</legend>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="enter quiz name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="enter quiz desc"
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label>Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        defaultValue={type} //state doi vs select se o dang object, vd: {label: "MEDIUM", value: "MEDIUM"}
                                        onChange={setType}
                                        placeholder="Quiz type..."
                                        options={options}
                                    />
                                </div>
                                <div className="more-actions">
                                    <label className='mb-1'>Upload Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={handleChangeFile}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-warning' onClick={handleSubmitQuiz}>Save</button>
                                </div>
                            </fieldset>
                        </div>
                        <div className="list-detail mt-3">
                            <TableQuiz />
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Question/Answer Quiz</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign Quiz to users</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion> */}
            <Tabs>
                <TabList>
                    <Tab>Manage Quiz</Tab>
                    <Tab>Update Question/Answer Quiz</Tab>
                    <Tab>Assign Quiz to users</Tab>
                </TabList>

                <TabPanel>
                    <div className="add-new">
                        <fieldset className="border rounded-3 p-3">
                            <legend className="float-none w-auto px-3">Add new Quiz</legend>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter quiz name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                                <label>Name</label>
                            </div>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="enter quiz desc"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                />
                                <label>Description</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue={type} //state doi vs select se o dang object, vd: {label: "MEDIUM", value: "MEDIUM"}
                                    onChange={setType}
                                    placeholder="Quiz type..."
                                    options={options}
                                />
                            </div>
                            <div className="more-actions">
                                <label className='mb-1'>Upload Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleChangeFile}
                                />
                            </div>
                            <div className='mt-3'>
                                <button className='btn btn-warning' onClick={handleSubmitQuiz}>Save</button>
                            </div>
                        </fieldset>
                    </div>
                    <div className="list-detail mt-3">
                        <TableQuiz />
                    </div>
                </TabPanel>
                <TabPanel>
                    <QuizQA />
                </TabPanel>
                <TabPanel style={{ padding: "0 20px" }}>
                    <AssignQuiz />
                </TabPanel>
            </Tabs>

        </div>
    );
}

export default ManageQuiz;