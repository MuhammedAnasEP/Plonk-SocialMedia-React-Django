import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from '../Axios';
import AuthContext from '../context/AuthContex';

function Signup() {

    const {user} = useContext(AuthContext)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const navigate = useNavigate();

    const [errors,setErrors] =  useState({})

    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault() 
        const err = validate()      
        setErrors(err)
        
        console.log('err',err)

        const body = JSON.stringify({
            username,
            email,
            password,
            firstname,
            lastname
        });
    
        if(err===true){
            console.log("enterd")
        axios.post('signup/', body, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Account created in Plonk!",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    navigate("/login");

                }
            }).catch((error)=>{
                if(error.response.status === 406){
                    setErrors({email:error.response.data})
                }
                if(error.response.status === 401){
                    setErrors({username:error.response.data})
                }
            });
        }
    };

    function validate(){
        let error = {}
        let flag = false
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/

        if (firstname === ""){
            flag = true
            error.firstname = "First Name should not be empty"
        }
        if (lastname === ""){
            flag = true
            error.lastname = "Last Name should not be empty"
        }
        if (username === ""){
            flag = true
            error.username = "Username shold not be empty"
        }
        else if (username.length < 3){
            flag = true
            error.username = "Username need atleast 3 character"
        }
        if (email === ""){
            flag = true
            error.email = "Email should not be empty"
        }
        else if(!email_pattern.test(email)){
            flag = true
            error.email = "Email is not valid"
        }
        if (password === ""){
            flag = true
            error.password = "Password should not empty"
        }
        else if(!password_pattern.test(password)){
            flag = true
            error.password = "Password is invalid, need one uppercase, lowercase and number"
        }
        if (cpassword === ""){
            flag = true
            error.cpassword = "Password not matched"
        }        
        else if(password !== cpassword){
            flag = true
            error.cpassword = "Password not matched"
        }
        

        if(flag === true){
            return error
        }
        else{
            console.log('else')
            return true
        }
    }

    const clearErrors = () =>{
        setErrors({})
    }

    return (
        <div>
            <section className="bg-gray-75 min-h-screen flex items-center justify-center">
                <div className="bg-[#E3EBF8] rounded-2xl p-5 items-center flex max-w-5xl p-5 shadow-xl h-[650px]">
                    <div className="lg:px-16 lg:w-3/4">
                        <h2 className="font-bold text-2xl text-[#5B6484]">Signup</h2>
                        <p className="text-xs mt-4 text-[#5B6484]">Welcome to Plonk!</p>
                        <form action="" onSubmit={handleSubmit} className="md:visible md:flex md:flex-col md:gap-4 hidden" >
                            <div className="mt-8 flex">
                                <div>
                                    <input onChange={(e) => {
                                        setFirstname(e.target.value);}} type="text" placeholder="First Name" className="border p-2 rounded-xl text-sm" />
                                    <span className='text-red-500 text-[12px] ml-1'>{errors.firstname}</span>
                                </div>

                                <div>
                                    <input onChange={(e) => {
                                        setLastname(e.target.value);}}  type="text" placeholder="Last Name" className="border p-2 rounded-xl text-sm ml-2" />
                                    <span className='text-red-500 text-[12px] ml-2'>{errors.lastname}</span>
                                </div>                                
                            </div>
                            <div>
                                <input onChange={(e) => {
                                    setUsername(e.target.value);}} type="text" placeholder="username" className="border p-2 rounded-xl w-full"/>
                                <span className='text-red-500 text-[12px] ml-1'>{errors.username}</span>
                            </div>
                            <div>
                                <input onChange={(e) => {
                                    setEmail(e.target.value);}} type="text" placeholder="Email" className="border p-2 rounded-xl text-sm w-full" />
                                <span className='text-red-500 text-[12px] ml-1'>{errors.email}</span>
                            </div>
                            <div>
                                <input onChange={(e) => {
                                    setPassword(e.target.value);}} type="password"  placeholder="Password" className="border p-2 rounded-xl text-sm w-full" />
                                <span className='text-red-500 text-[12px] ml-1'>{errors.password}</span>
                            </div>
                            <div>
                                <input onChange={(e) => {
                                    setCpassword(e.target.value);}} type="password" name='cpassword' placeholder="Confirm Password" className="border p-2 rounded-xl text-sm w-full"/>
                                <span className='text-red-500 text-[12px] ml-1'>{errors.cpassword}</span>
                            </div>
                            <button className="bg-[#44517b] text-white rounded-xl py-2 hover:scale-105 duration-300">Signup</button>
                        </form>



                        <form action="" className="flex flex-col gap-4 md:hidden">

                            <input onChange={(e) => {
                          setFirstname(e.target.value);}} type="text" placeholder="First Name" className="border p-2 rounded-xl text-sm mt-8" />
                            <input onChange={(e) => {
                          setLastname(e.target.value);}} type="text" placeholder="Last Name" className="border p-2 rounded-xl text-sm" />

                            <input onChange={(e) => {
                          setUsername(e.target.value);}} type="text" placeholder="username" className="border p-2 rounded-xl" />
                            <input onChange={(e) => {
                          setEmail(e.target.value);}} type="text" placeholder="Email" className="border p-2 rounded-xl text-sm" />
                            <input onChange={(e) => {
                          setPassword(e.target.value);}} type="password" placeholder="Password" className="border p-2 rounded-xl text-sm" />
                            <input type="password" placeholder="Confirm Password" className="border p-2 rounded-xl text-sm" />
                            <button className="bg-[#44517b] text-white rounded-xl py-2 hover:scale-105 duration-300">Signup</button>
                        </form>

                        {/* <div className="mt-6 grid grid-cols-3 items-center ">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm text-gray-400">OR</p>
                            <hr className="border-gray-400" />
                        </div>
                        <button className="border bg-white text-[#44517b] rounded-xl w-full mt-5 py-2 text-sm flex justify-center items-center hover:scale-105 duration-300">
                            <img src="images/googleIcon.png" alt='' className="w-5 mr-3" />
                            Signup with Google
                        </button> */}

                        <div onClick={clearErrors} className="mt-3 text-xs flex justify-between items-center text-[#5B6484] border-t  border-[#5B6484] py-4 mt-7">
                            <p>Already have account ?</p>
                            <Link to='/login'><button className="bg-white border rounded-xl py-2 px-5 hover:scale-105 duration-300">Login</button></Link>
                        </div>
                    </div>
                    <div className="lg:block hidden bg-[#E3EBF8]" >
                        <img src="images/login.jpg" alt='' className="rounded-3xl" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup