import axios from '../Axios';
import jwt_decode from "jwt-decode";
import { createContext, useState} from 'react';
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')): null )
    const [user, setUser] = useState(()=>localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')): null)
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    let loginUser = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        const password = e.target.password.value

        const err = Validate(username, password)
        
        if (err !== true){
            setErrors(err)
        }
        if (err === true){
            console.log('in')
            axios.post('token/',JSON.stringify({ 'username': username, 'password': password }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((respone) => {
                if (respone.status === 200) {
                    
                    setAuthTokens(respone.data)
                    setUser(jwt_decode(respone.data.access))

                    localStorage.setItem('authToken',JSON.stringify(respone.data))
                    navigate('/')

                } else {
                    alert('Somthing went Wrong')
                }
            }).catch((error)=>{
                if (error.response.status === 401){
                    setErrors({username:"Inavalid username or password", password:"Inavalid username or password"})
                }
            })
        }

    }

    const Validate = (username, password) =>{
        const error = {}
        let flag = false

        if (username === ""){
            flag = true
            error.username = "Username should not be empty"
        }
        if (password === "")
        {
            flag = true
            error.password = "Password should not be empty"
        }

       if (flag === true){
        return error
       }
       else{
        return true
       }

    }

    let logoutUser = () =>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authToken')
    }

    let contextData = {
        user: user,
        logoutUser: logoutUser,
        loginUser: loginUser,
        errors: errors,
        setErrors: setErrors
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}