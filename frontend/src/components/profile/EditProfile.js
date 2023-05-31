import Card from "../Card";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContex";
import axios from '../../Axios';
import { changepassword, editprofile, getuser } from "../../Constants/Constants";
import Swal from "sweetalert2";

function EditProfile(){
    
    const {user} = useContext(AuthContext)
    const [oldProfileImage,setOldProfileImage] = useState()
    const [profileImage,setProfileImage] = useState()
    const [firstname,setFirstname] = useState()
    const [lastname,setLastname] = useState()
    const [username,setUsername] = useState()
    const [email,setEmail] = useState()
    const [about,setAbout] = useState()
    const [validationErrors, setValidationErrors] = useState({})
    const [currentPassword,setCurrentPassword] = useState()
    const [newPassword,setNewPassword] = useState()
    const [Cpassword,setCPassword] = useState()

    useEffect(()=>{
        getUser()
    },[])

    function ProfileSubmit(e){
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('firstname',firstname)
        formdata.append('lastname',lastname)
        formdata.append('username',username)
        formdata.append('email',email)
        formdata.append('about',about)
        if(profileImage === 'undefined'){
            formdata.append('profileImage',oldProfileImage)    
        }
        else if(!oldProfileImage && !profileImage){
            formdata.append('profileImage','')
        }
        else{
            formdata.append('profileImage',profileImage)
        }
        
        let err = profileValidate()
        if(err !== false){
            setValidationErrors(err)
        }
        if (err === false ){
            axios.put(editprofile+user.user_id,formdata).then((respone)=>{
               getUser()
               Swal.fire({
                position: "center",
                icon: "success",
                title: "",
                showConfirmButton: false,
                timer: 1000,
            });
            }).catch((error)=>{
                if(error.response.status === 406){
                    setValidationErrors({email:error.response.data})
                }
                if(error.response.status === 401){
                    setValidationErrors({username:error.response.data})
                }
            });
        }

    }

    function profileValidate(){
        let error= {}
        let flag = false
        const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (firstname === ""){
            flag = true
            error.firstname = "Firstname should not be empty"
        }
        if (lastname === ""){
            flag = true
            error.lastname = "Lastname should not be empty"
        }
        if (username === ""){
            flag = true
            error.username = "Username shoul not be empty"
        }
        if (email === ""){
            flag = true
            error.email = "Email should not be empty"
        }
        else if (!email_pattern.test(email)){
            flag = true
            error.email = "Invalid Email"
        }
        if (about == ""){
            flag = true
            error.about = "Write anything about yourself"
        }
        if(flag === true){
            return error
        }
        else{
            console.log('else')
            return flag
        }
    }



    function getUser(){
        axios.post(getuser,JSON.stringify({"user_id":user.user_id}),{headers:{'Content-Type' : 'application/json'}}).then((respone)=>{
            setAbout(respone.data.about)
            setFirstname(respone.data.first_name)
            setLastname(respone.data.last_name)
            setUsername(respone.data.username)
            setEmail(respone.data.email)
            setOldProfileImage(respone.data.image)
        })
    }

   
    
    function changePassword(e){
        e.preventDefault()

        let err = passwordValidation()
        if(err !== false){
            setValidationErrors(err)
        }
        if (err === false ){
            const data = JSON.stringify({
                'currentPassword': currentPassword,
                'newPassword': newPassword
            })
            Swal.fire({
                title: 'Are you Sure',
                icon:'warning',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes",
            }).then((result)=>{
                if(result.value){
                    axios.put(changepassword+user.user_id,data,{headers:{'Content-Type' : 'application/json'}}).then((respone)=>{
                        setCPassword("")
                        setNewPassword("")
                        setCPassword("")
                    }).catch((error)=>{
                        if(error.response.status === 401){
                            setValidationErrors({currentpassword:error.response.data})
                        }
                    })
                }
            })
        }
    }

    function passwordValidation(){
        let error = {}
        let flag = false
        const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/
        if(currentPassword == ""){
            flag = true
            error.currentpassword = "Current Password should not be empty"
        }if(newPassword == ""){
            flag = true
            error.newpassword = "New Password should not be empty"
        }else if(!password_pattern.test(newPassword)){
            flag = true
            error.newpassword = "Password is invalid, need one uppercase, lowercase and number"
        }
        if(Cpassword == ""){
            flag = true
            error.cpassword = "Confirm Password should not be empty"
        }else if(newPassword !== Cpassword){
            flag = true
            error.cpassword = "Password not match"
        }
        if(flag === true){
            return error
        }
        else{
            console.log('else')
            return flag
        }
        
    }



    return(
        <div>
            <Card>
                <div>
                <h2 className="font-bold mb-5 border-b">Edit Profile</h2>
                    <form onSubmit={ProfileSubmit} className="flex flex-col items-center">
                        <div className="flex flex-col items-center mb-5 relative">
                            <div className="w-36 h-36 bg-gray-400 rounded-full overflow-hidden">
                                {profileImage && <img className="object-fill" src={URL.createObjectURL(profileImage)} alt=""></img>}
                                {oldProfileImage !== null ? <img className="object-fill" src={'http://127.0.0.1:8000/'+oldProfileImage} alt=""></img> : <img className="object-cover" src="/images/profile.jpg" alt=""/>}
                            </div>
                            <button className="font-bold bg-gray-500 px-2 mt-1 text-white hover:bg-gray-400 rounded-md shadow-md">Change</button>
                            <input onChange={(e)=>setProfileImage(e.target.files[0])} type="file" className="w-14 h-6 absolute bottom-0 opacity-0"/>
                        </div>
                        <div className="flex gap-3 mb-5 items-center">
                            <label className="font-bold">First Name</label>                        
                            <input onChange={(e)=>{setFirstname(e.target.value)}} value={firstname} className="border rounded-xl p-1 outline-none" placeholder="First Name"/>                     
                        </div>
                        <span className="text-red-600 text-[12px] ml-[10%]  -mt-5 mb-5 ">{validationErrors.firstname}</span>
                        
                        <div className="flex gap-3 mb-5 items-center">
                            <label className="font-bold">Last Name</label>
                            <input onChange={(e)=>{setLastname(e.target.value)}} value={lastname} className="border rounded-xl p-1 outline-none " placeholder="Last Name"/>
                        </div>
                        <span className="text-red-600 text-[12px] ml-[10%]  -mt-5 mb-5 ">{validationErrors.lastname}</span>

                        <div className="flex gap-4 mb-5 items-center">
                            <label className="font-bold">Username</label>
                            <input onChange={(e)=>{setUsername(e.target.value)}} value={username} className="border rounded-xl p-1 outline-none" placeholder="Username"/>
                        </div>
                        <span className="text-red-600 text-[12px] ml-[10%]  -mt-5 mb-5 ">{validationErrors.username}</span>

                        <div className="flex gap-12 mb-5 items-center"> 
                            <label className="font-bold">Email</label>
                            <input onChange={(e)=>{setEmail(e.target.value)}} value={email} className="border rounded-xl p-1 outline-none " placeholder="email"/>
                        </div>
                        <span className="text-red-600 text-[12px] ml-[10%]  -mt-5 mb-5 ">{validationErrors.email}</span>
                        {
                            about ? 
                            <div className="flex gap-12 mb-5 items-center">
                                <label className="font-bold">About</label>
                                <textarea onChange={(e)=>{setAbout(e.target.value)}} value={about} className="border rounded-xl p-1 outline-none" placeholder="About"></textarea>
                            </div>:
                            <div className="flex gap-12 mb-5 items-center">
                                <label className="font-bold">About</label>
                                <textarea onChange={(e)=>{setAbout(e.target.value)}} className="border rounded-xl p-1 outline-none" placeholder="About"></textarea>
                            </div>
                        }
                        <span className="text-red-600 text-[12px] ml-[10%]  -mt-5 mb-5 ">{validationErrors.about}</span>

                        <div className="mb-5 mt-2 -ml-10">
                            <button className="bg-socialBlue px-2 p-1 rounded-md font-bold text-white">Submit</button>
                        </div>
                    </form>
                </div>
            </Card>
            <Card>
                <h2 className="font-bold mb-5 border-b">Change Password</h2>
                <form onSubmit={changePassword} className="flex flex-col items-center">
                    <div className="flex gap-4 mb-5 items-center">
                        <label className="font-bold">Current Password</label>
                        <input onChange={(e)=>{setCurrentPassword(e.target.value)}} type="password" className="border w-[62%] rounded-xl p-1 outline-none " placeholder="Current Psssword"/>
                    </div>
                    <span className="text-red-600 text-[12px] ml-[10%]  -mt-5 mb-5 ">{validationErrors.currentpassword}</span>
                    <div className="flex gap-10 mb-5 items-center">
                        <label className="font-bold">New Password</label>
                        <input onChange={(e)=>{setNewPassword(e.target.value)}} type="password" className="border w-[62%] rounded-xl p-1 outline-none " placeholder="New Psssword"/>
                    </div>
                    <span className="text-red-600 text-[12px] ml-[10%]  -mt-5 mb-5 ">{validationErrors.newpassword}</span>
                    <div className="flex gap-3 mb-5 items-center">
                        <label className="font-bold">Confirm Password</label>
                        <input onChange={(e)=>{setCPassword(e.target.value)}} type="password" className="border w-[62%] rounded-xl p-1 outline-none " placeholder="Confirm Psssword"/>
                    </div>
                    <span className="text-red-600 text-[12px] ml-[10%]  -mt-5 mb-5 ">{validationErrors.cpassword}</span>
                    <div className="mb-5 mt-2 ">
                        <button className="bg-socialBlue px-2 p-1 rounded-md font-bold text-white">Submit</button>
                    </div>
                </form>
            </Card>
        </div>
    )
}

export default EditProfile
