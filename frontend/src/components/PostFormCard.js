import { useState, useContext, useEffect } from "react";
import axios from '../Axios'
import Avatar from "./Avatar";
import Card from "./Card";
import AuthContext from "../context/AuthContex";
import { baseUrl, postimage } from "../Constants/Constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getuser } from "../Constants/Constants";


function PostFormCard() {

    useEffect(()=>{
        getUser()
    })

    const { user } = useContext(AuthContext)
    const [image, setImage] = useState()
    const [description, setDescription] = useState()
    const [profile,setProfile] = useState()
    const navigate = useNavigate()
    const user_id = user.user_id

    console.log("profile : ", profile)

    function PostSubmit(e) {
        e.preventDefault()
        const formdata = new FormData();
        formdata.append('image', image)
        formdata.append('description', description)

        const body = formdata

        axios.post(baseUrl + postimage + user_id, body).then((response) => {
            if (response.status === 200) {
                Swal.fire({
                    position: "center",
                    type: "success",
                    title: "Post Uploaded",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            }
        })
    }
    function getUser(){
        axios.post(getuser,JSON.stringify({"user_id":user.user_id}),{headers:{'Content-Type' : 'application/json'}}).then((respone)=>{
                    setProfile(respone.data.image)
                    console.log("hello",respone.data.image)
        })
    }

    return (
        <Card>
            <form onSubmit={PostSubmit}>
                <div className="flex gap-3">
                    <div>
                       <Avatar urls={profile}/>
                    </div>
                    <textarea onChange={(e) => { setDescription(e.target.value) }} className="grow py-3 h-14 outline-none" placeholder="Whats on your mind?" />
                </div>
                <div className="flex gap-5 items-center mt-2">
                    <div className="relative flex gap-3">
                        <button type="file" className="flex gap-1 " placeholder="Post">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>
                            <span className="mt-1">Post</span>
                        </button>
                        <input onChange={(e) => { setImage(e.target.files[0]) }} name="image" type="file" className=" w-[60px] absolute top-0 opacity-0" />
                        { image &&
                        <div className="mt-1 -ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                        </div>
                        }
                    </div>
                    {/* <div>
                        <button className="flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            Check in
                        </button>
                    </div>
                    <div>
                        <button className="flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                            </svg>
                            Mood
                        </button>
                    </div> */}
                    <div className="grow text-right">
                        <button className="bg-socialBlue text-white px-6 py-0.5 rounded-md">Share</button>
                    </div>
                </div>
            </form>
        </Card>
    )
}

export default PostFormCard