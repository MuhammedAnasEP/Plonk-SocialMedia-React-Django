import { useState, useContext, useEffect } from "react"
import Card from "./Card"
import Avatar from "./Avatar"
import { Link } from "react-router-dom"
import ClickOutHandler from "react-clickout-handler"
import AuthContext from "../context/AuthContex"
import { baseUrl, getpost } from "../Constants/Constants"
import axios from "../Axios"


function SavedPostCard() {
    const [post,setPost] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const {user} = useContext(AuthContext)

   useEffect(()=>{
    axios.get(getpost).then((respone)=>{
        
        setPost(respone.data)

    })
   },[])
    return (<div>

        {post?.map((po)=>(
            
            <Card>                  
                <div className="flex gap-3">
                    <div>
                        <Link to='/profile'>
                            <a classsName="curson-pointer">
                                <Avatar />
                            </a>
                        </Link>
                    </div>
                    <div className="grow">
                        <Link to='/profile'><p><a className="font-semibold cursor-pointer hover:underline">{po.user.username}</a> Shared a <a className="text-socialBlue">post</a></p></Link>
                        <p className="text-gray-500 text-sm">2 hours ago</p>
                    </div>
                    <div className="relative">                  
                        <button className="text-gray-400" onClick={() => setDropdownOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>
                        {
                            dropdownOpen &&(
                               <div className="w-5 h-5 absolute top-0"></div>
                            )
                        }
                        <ClickOutHandler onClickOut={() => {setDropdownOpen(false)}}>
                            <div className="relative">
                                {dropdownOpen && (
                                    <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52">
                                        <a href="" className="flex gap-3 my-2 py-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                            </svg>
                                            Save Post
                                        </a>
                                        <a href="" className="flex gap-3 my-2 py-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Hide
                                        </a>
                                        <a href="" className="flex gap-3 my-2 py-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                            </svg>
                                            Report
                                        </a>
                                    </div>
                                )}
                            </div>
                        </ClickOutHandler>
                    </div>
                </div>
                <div>
                    <p>{po.description}</p>
                    <div className="rounded-md overflow-hidden bg-gray-200 flex justify-center">
                        <img className="w-full" src={'http://127.0.0.1:8000/'+po.image} />
            
                    </div>
                </div>
                <div className="mt-5 flex gap-8">
                    <button className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        72
                    </button>
                    <button className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                        72
                    </button>
                    <button className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
                <div className="flex mt-4 gap-3">
                    <div>
                        <Avatar />
                    </div>
                    <div className="border grow rounded-full relative">
                        <textarea className="block w-full p-3 px-4 h-12 overflow-hidden rounded-full outline-none" placeholder="Leave a comment" />
                        <button className="absolute top-3 right-3 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
                
            </Card>
        )
        )}
    </div>
    )
}

export default SavedPostCard