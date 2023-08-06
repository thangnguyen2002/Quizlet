import axios from "../utils/apiCustomize"; //goi axios thong qua viec customize no' chu ko phai truc tiep tu thu vien
// co the dat ten la axios hay abc j cx dc, vi file apiCustomize return default tuc la return 1 biến duy nhat nen no' se tu hieu

const postCreateNewUser = (email, password, username, role, image) => {
    //Call API (khi ko can truyen file)
    // let data = {
    //   email: email,
    //   password: password,
    //   username: username,
    //   role: role,
    //   userImage: image,
    // }
    // console.log(data);

    //Call API (khi can truyen file, do' la form-data trong postman)
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data) //truyen data len server
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all') //get thi ko can truyen data len serve nen bo data
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data)
}

const deleteUser = (id) => {
    //api nay dung ko truyen file (form-urlencoded) nen dung ntn
    return axios.delete('api/v1/participant', { data: { id: id } })
}

const getUsersPagniate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login',
        {
            email,
            password,
            delay: 2000
        }) //hoac {email: email, password: password} cung tuong tu
}

const postRegister = (email, password, username) => {
    return axios.post('api/v1/register', { email, password, username })
}

const getQuizUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)
}

const postQuizSubmit = (data) => {
    // console.log('api submit data: ', {...data});
    return axios.post('api/v1/quiz-submit', { ...data }) //neu {data} se sai, truyen len object len server -> dung spread, len hoi group
    //...data la copy toan bo phan tu cua object nay`, thay vi truyen object vao {}
    //neu de data thi phai bo {} di vi data no da chua object return axios.post('api/v1/quiz-submit', data)
}

const postCreateNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data)
}

const getAllQuizForAdmin = () => {
    return axios.get('api/v1/quiz/all')
}

const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quiz_id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data)
}

const postCreateNewAnswerForQuestion = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correct_answer, question_id
    })
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data })
}

const postLogOut = (email, refresh_token) => { //logout qua server vi data dc luu duoi database, logout se ko cho browser dung data minh` nua
    return axios.post('api/v1/logout', { email, refresh_token })
}

const getOverView = () => {
    return axios.get('api/v1/overview')
}

export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUsersPagniate,
    postLogin,
    postRegister,
    getQuizUser,
    getDataQuiz,
    postQuizSubmit,
    postCreateNewQuiz,
    getAllQuizForAdmin,
    postCreateNewQuestionForQuiz,
    postCreateNewAnswerForQuestion,
    postAssignQuiz,
    getQuizWithQA,
    postUpsertQA,
    postLogOut,
    getOverView
};
// export ntn co the export 1 hoac nhieu biến/ham`
// export default tuc la chi export duy nhat ham` do'