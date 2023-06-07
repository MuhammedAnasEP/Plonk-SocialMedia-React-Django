import {Outlet ,Navigate} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const PrivateRoute =()=>{
    
    let {user} = useContext(AuthContext)
    console.log('dfsf',user)      
    return(
        user ? <Outlet/>: <Navigate to="/" /> 
    )
}

export default PrivateRoute