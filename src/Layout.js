import { Routes, Route } from 'react-router-dom';
import App from './App';
import Admin from './components/Admin/Admin';
import Home from './components/Home/Home';
import Dashboard from './components/Admin/Content/Dashboard';
import ManageUser from './components/Admin/Content/ManageUser';
import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import ListQuiz from './components/User/ListQuiz';
import DetailQuiz from './components/User/DetailQuiz';
import ManageQuiz from './components/Admin/Content/Quiz/ManageQuiz';
import Questions from './components/Admin/Content/Question/Questions';
import PrivateRoute from './components/routes/PrivateRoute';
import { Suspense } from 'react';

const NotFound = () => {
    return (
        <div className='alert alert-danger container mt-3'>
            Something went wrong. Please check your URL again!
        </div>
    )
}

const Layout = () => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Home />} />
                    {/* index la props truyen vao, nghia la component path mac dinh theo path cua cha (no se xem con cua App co path nao trung vs ng dung tim kiem ko
                , neu ko thi dung component Home) */}
                    <Route path='users' element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>
                    } />
                    {/* cac component con thi ko can / nua */}
                </Route>

                <Route path="/quiz/:id" element={<DetailQuiz />} />

                <Route path='/admins' element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                    <Route path='manage-quizes' element={<ManageQuiz />} />
                    <Route path='manage-questions' element={<Questions />} />
                </Route>

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route path='*' element={<NotFound />} />
                {/* * nghia la neu cac path tren ko match thi` vao component nay */}
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </Suspense>
    );
}

export default Layout;