import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from 'react';
import axios from '../Axios';
import { AuthContext } from '../context/AuthContext';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {

    const {setUser,setAuthTokens} = useContext(AuthContext)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()


    function LoginSubmit(e){
        e.preventDefault()
        console.log("username",username)
        const body = JSON.stringify({
            username,
            password,
        });
        const head = {
            headers:{
                'Content-Type':'application/json'
            }
        }
        axios.post('login/', body, head).then((response)=>{
            if (response.status === 200){

                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.access))
                
                localStorage.setItem('authToken',JSON.stringify(response.data))                
                navigate('/users')

            }else{
                console.log('response : ',response)
            }
        })
    }

    return (
        <div>
            <img className="fixed hidden lg:block inset-0 h-full mt-0.5" src="assets/login/wave.png" />
            <div className="w-screen h-screen flex flex-col justify-around items-center lg:flex lg:flex-row">
                <img src="assets/login/unlock.svg" className="hidden lg:block z-0 w-1/6 hover:scale-125 transition-all duration-700 transform"/>
                <form onSubmit={LoginSubmit} className="flex flex-col justify-center items-center">
                    <img src="assets/login/personal.svg" className="w-32" />
                    <h2 className="my-8 font-display font-bold text-3xl text-gray-700 text-center">Welcome to you</h2>
                    <div className="relative">
                        <FontAwesomeIcon className="absolute top-1" icon={faUser} />
                        <input onChange={(e)=>{
                            setUsername(e.target.value)
                        }} type="text" placeholder="username" className="pl-8 border-b-2 font-display text-lg focus:outline-none focus:border-black transition duration-500"></input>
                    </div>
                    <div className="relative mt-8">
                        <FontAwesomeIcon className='absolute top-1' icon={faLock} />
                        <input onChange={(e)=>(setPassword(e.target.value))} type="password" placeholder="password" className="pl-8 border-b-2 font-display text-lg focus:outline-none focus:border-black transition duration-500" />
                    </div>
                    {/* <a href="#" className='self-end mt-4 text-gray-600 font-bold'>Forgot password?</a> */}
                    <button className='py-3 px-20 bg-black text-white font-bold rounded-full uppercase text-lg mt-6 transform hover:translate-y-1 transiton-all duration-500'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login