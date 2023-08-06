import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    if (!isAuthenticated) { //use Navigate instead of useNavigate to return a component
        return <Navigate to='/login'></Navigate> //smilar to Redirect but this is component
    } //not render children component anymore
    //binh thuong ta render roi moi dieu huong trang
    //bay h ta dieu huong trang roi moi render
    //nen neu dung useNavigate ko dc, mac du` tac dung nhu nhau, tuy truong hop

    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute