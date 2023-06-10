import {Outlet ,Navigate} from 'react-router-dom'
import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContex'

const PrivateRoute =()=>{
    
    const {user} = useContext(AuthContext)

    return(
        user ? <Outlet />: <Navigate to="/login" /> 
    )
}

export default PrivateRoute