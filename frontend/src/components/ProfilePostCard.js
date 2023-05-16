import { useState, useContext, useEffect } from "react"
import Card from "./Card"
import Avatar from "./Avatar"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContex"
import {comments, getcomments, getlike, getpost, getsavedpost, like, savepost, getuser } from "../Constants/Constants"
import axios from "../Axios"
import { useNavigate } from "react-router-dom"


function PostCard() {
    const [post,setPost] = useState(null)
    const [oldComments,setOldCommets] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [comment, setComment] = useState("")
    const [likes, setLikes] = useState(null)
    const [savedposts, setSavedPosts] = useState(null)
    const [profile,setProfile] = useState()
    const {user} = useContext(AuthContext)
    const [modal,setModal] = useState(false)
    const [newPost, setNewPost] = useState()
    const [editImage, setEditImage] = useState()
    const [editId, setEditId] = useState()
    const [editDes, setDes] = useState()
    const [newDes, setNewDes] = useState()

    const navigate = useNavigate()


   useEffect(()=>{
        getPost()
        getComments()
        getLike()
        getSaved()
        getUser()
   },[])


   function getPost(){
    axios.get(getpost).then((respone)=>{
        
        setPost(respone.data)

    })
   }
   
   function addComment(user_id, post_id){
       axios.post(comments,JSON.stringify({"user": user_id, "post": post_id, "comment": comment}),{headers:{
           'Content-Type' : 'application/json'
        }}).then((respone)=>{
            getComments()
        })
    }

    function getComments(){
     axios.get(getcomments).then((respone)=>{
         setOldCommets(respone.data)
     })
    }

    function Like(user,post){
        
        axios.post(like,JSON.stringify({'user':user, 'post':post}),{headers:{
            'Content-Type' : 'application/json'
            }}).then((respone)=>{
                getLike()
        })
    }

    function unLike(liked_id){
        
        axios.post(like,JSON.stringify({'liked_id': liked_id}),{headers:{
            'Content-Type' : 'application/json'
            }}).then((respone)=>{
            getLike()
        })
    }

    function getLike(){
        axios.get(getlike).then((respone)=>{
            setLikes(respone.data)
        })
    }

    function Save(user,post){
        axios.post(savepost,JSON.stringify({'user':user, 'post':post}),{headers:{
            'Content-Type' : 'application/json'
            }}).then((respone)=>{
                getSaved()
        })
    }

    function unSave(saved_id){
        axios.post(savepost,JSON.stringify({'saved_id':saved_id}),{headers:{
            'Content-Type' : 'application/json'
            }}).then((respone)=>{
                getSaved()
            })
    }

    function getSaved(){
        axios.get(getsavedpost).then((respone)=>{
            setSavedPosts(respone.data)
        })
    }

    function getUser(){
        axios.post(getuser,JSON.stringify({"user_id":user.user_id}),{headers:{'Content-Type' : 'application/json'}}).then((respone)=>{
                    setProfile(respone.data.image)
        })
    }


    const toggleModal=(id,img,des)=>{
        setEditId(id)
        setEditImage(img)
        setDes(des)
        setModal(!modal)

        if (!modal){
            setDropdownOpen(!dropdownOpen)
        }
    }

    function editPost(e){
        e.preventDefault()
        const formdata = new FormData();
        if(newDes && newPost){
            formdata.append('image',newPost)
            formdata.append('description',newDes)
        }
        if (newDes && !newPost){
            formdata.append('image',editImage)
            formdata.append('description',newDes)
        }
        if (!newDes && newPost){
            formdata.append('image',newPost)
            formdata.append('description',editDes)
        }
        if (!newDes && !newPost){
            toggleModal()
        }
        axios.put()
    }

    return (
    <div className="realtive">
        {post?.map((po)=>(
            po.user.id === user.user_id && (

            <div>                
                <Card className="">                  
                    <div className="flex gap-3">
                        <div>
                            <Link>
                                <Avatar urls={po.user.image}/>
                            </Link>
                        </div>
                        <div className="grow">
                            <Link to='/profile'><p><span className="font-semibold cursor-pointer hover:underline">{po.user.username}</span> Shared a <span className="text-socialBlue">post</span></p></Link>
                            <p className="text-gray-500 text-sm">2 hours ago</p>
                        </div>
                        <div className="relative">                  
                            <button className="text-gray-400" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </button>
                            {
                                dropdownOpen &&(
                                <div onClick={() => setDropdownOpen(!dropdownOpen)} className="w-5 h-5 absolute top-0"></div>
                                )
                            }
                            <div>
                                <div className="relative">
                                    {dropdownOpen && (
                                        <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52">
                                            <a href="#" className="flex gap-3 my-2 py-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                                </svg>
                                                Save Post
                                            </a>
                                            <a href="#" className="flex gap-3 my-2 py-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Hide
                                            </a>
                                            <a onClick={()=>{
                                                toggleModal(po.id,po.image,po.description)
                                            }}  className="flex gap-3 my-2 py-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                                Edit
                                            </a>
                                            <a href="#" className="flex gap-3 my-2 py-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                                </svg>
                                                Report
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>{po.description}</p>
                        <div className="rounded-md overflow-hidden bg-gray-200 flex justify-center">
                            <img className="w-full" src={'http://127.0.0.1:8000/'+po.image} alt=""/>
                
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="mt-5 flex gap-8">
                            {
                                likes && likes.map((data)=>(
                                    data.user === user.user_id && po.id === data.post ?
                                    <button onClick={()=>{unLike(data.id)}} className="flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                        
                                    </button>: <button onClick={()=>{Like(user.user_id,po.id)}} className="flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>                                
                                    </button>                    
                                ))
                            }
                            {likes && likes.length === 0 && <button onClick={()=>{Like(user.user_id,po.id)}} className="flex gap-2 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </button>}                                                
                            {/* <button className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                                72
                            </button> */}
                            <button className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-5">
                            {savedposts?.map((data)=>(
                                data.user === user.user_id && data.post === po.id ? 
                                <button onClick={()=>{unSave(data.id)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                    </svg>{data.id}
                                </button> : <button onClick={()=>{Save
                                    (user.user_id,po.id)}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                </button>
                            ))}
                            {savedposts && savedposts.length === 0 &&
                            <button onClick={()=>{Save
                                (user.user_id,po.id)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>
                            </button>
                            }
                        </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                        <div className="mt-1">
                            <Avatar size={'small'} urls={profile}/>
                        </div>
                        <div className="flex w-[87%] h-8 text-center overflow-hidden">                
                            <div className="w-[87%]">
                                <textarea onChange={(e)=>{setComment(e.target.value)}} className="block w-[92%] py-1 outline-none overflow-hidden" placeholder="Leave a comment" />
                            </div>
                        </div>
                        <button onClick={()=>{addComment(user.user_id, po.id)}} className="top-0 text-blue-500 font-bold">Post</button>
                    </div>

                    <span className="text-sm text-gray-500">Show all comments</span>

                    {/* {oldComments?.map((comm)=>(
                        <div>{comm.post === po.id && comm.comment }</div>
                    ))} */}
                    
                </Card>
            </div>
            )
        )
        )}
        {modal && (
        <div className="absolute top-0 left-0">
            <div className=" w-[1350px] h-screen bg-gray-300 opacity-[70%]"></div>
            <div className="w-full h-full absolute flex justify-center items-center top-0">
                <Card className="">
                    <div className="flex justify-between border-b border-gray-200 -mx-4 px-4 mb-2">
                        <h2 className="font-bold -mt-1">Edit Profile </h2>
                        <svg onClick={toggleModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -mt-1 mb-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <div className="h-[400px] overflow-hidden rounded-md">
                            {newPost ? <img className="rounded-md" src={URL.createObjectURL(newPost)} /> : <img className="rounded-md" src={'http://127.0.0.1:8000/'+editImage}/>}
                        </div>
                        <form className="">
                           <div className="relative">
                                <button className="bg-black text-white px-3 py-1 rounded-md mt-2">Change</button>
                                <input onChange={(e)=>setNewPost(e.target.files[0])} type="file" className="absolute top-2 left-0 w-[78px] opacity-0"/>
                           </div>
                            <textarea onChange={(e)=>setNewDes(e.target.value)} placeholder="Descrioption" value={editDes} className="w-[100%] border-2 rounded-md mt-2 outline-0"/>
                            <button className="bg-black text-white px-3 py-1 rounded-md mt-2 ml-[80%] hover:bg-gray-800">Submit</button>
                        </form>
                    </div>
                </Card>
            </div>    
        </div>)}
    </div>
    )
}

export default PostCard