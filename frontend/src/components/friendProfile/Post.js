import { useState, useContext, useEffect } from "react"
import Card from "../Card"
import Avatar from "../Avatar"
import { Link, useParams } from "react-router-dom"
import AuthContext from "../../context/AuthContex"
import { comments, getcomments, getlike, getpost, getsavedpost, like, savepost, getuser, unlike, unsave, backend } from "../../Constants/Constants"
import axios from "../../Axios"
import moment from 'moment';

function Post(id) {
    const params = useParams()
    const [post,setPost] = useState(null)
    const [oldComments,setOldCommets] = useState(null)
    const [comment, setComment] = useState("")
    const [likes, setLikes] = useState(null)
    const [savedposts, setSavedPosts] = useState(null)
    const [profile,setProfile] = useState()
    const {user} = useContext(AuthContext)
    const [commentModal, setCommentModal] = useState(false)
    const [postId, setPostId] = useState()
    const [postImageUrl, setPostImgaeUrl] = useState(id)
    const [friend, setFriend] = useState()

   useEffect(()=>{
        getPost()
        getComments()
        getLike()
        getSaved()
        getUser()
        getUserp()
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

    function Like(users,post){        
        axios.post(like,JSON.stringify({'user':users, 'post':post}),{headers:{
            'Content-Type' : 'application/json'
            }}).then((respone)=>{
                getLike()
        })
    }

    
    function unLike(user,post){
        
        axios.post(unlike,JSON.stringify({'user': user, 'post':post}),{headers:{
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

    function Save(users,post){
        axios.post(savepost,JSON.stringify({'user':users, 'post':post}),{headers:{
            'Content-Type' : 'application/json'
            }}).then((respone)=>{
                getSaved()
        })
    }

    function unSave(user,post){
        axios.post(unsave,JSON.stringify({'user':user, 'post':post}),{headers:{
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

    function getUserp(){
        axios.post(getuser,JSON.stringify({"user_id":params.userId}),{headers:{'Content-Type' : 'application/json'}}).then((respone)=>{
            setFriend(respone.data.id)
        })
    }


    function toggleCommentModal(id, url){
        setCommentModal(!commentModal)
        setPostId(id)
        setPostImgaeUrl(url)
    }
    if (commentModal) {
        document.body.style.overflow = 'hidden';
    }else{
        document.body.style.overflow = 'unset';
    }


    return (
    <div className="realtive">
        {post?.map((po)=>{
            const isSaved = savedposts?.some((s)=>s.user.id === user.user_id && s.post.id === po.id);
            const isLiked = likes?.some((l)=> l.user.id === user.user_id && po.id === l.post.id);
            return(
            po.user.id === friend && (

            <div>                
                <Card className="">    
                              
                    <div className="flex gap-3 mb-2">
                        <div>
                            <Link>
                                <Avatar urls={po.user.image}/>
                            </Link>
                        </div>
                        <div className="grow">
                            <Link to='/profile'><p><span className="font-semibold cursor-pointer hover:underline">{po.user.username}</span> Shared a <span className="text-socialBlue">post</span></p></Link>
                            <p className="text-gray-500 text-sm">{moment.utc(po.date_posted).local().startOf('seconds').fromNow()}</p>
                        </div>
                    </div>
                    <div>
                        <p className="mb-1">{po.description}</p>
                        <div className="rounded-md overflow-hidden bg-gray-300 flex justify-center">
                            <img  className="max-w-full max-h-[550px] rounded-md" src={backend+po.image} alt=""/>                
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <div className="flex gap-8">
                            {
                            isLiked ? 
                            <button onClick={()=>{unLike(user.user_id,po.id)}} className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>                
                            </button>:<button onClick={()=>{Like(user.user_id,po.id)}} className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>   
                            </button>
                            }
                        </div>
                        <div className="">
                            {
                            isSaved ? 
                            <button onClick={()=>{unSave(user.user_id,po.id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                            </svg>
                            </button> : <button onClick={()=>{Save(user.user_id,po.id)}}>
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
                        <button onClick={()=>{addComment(user.user_id, po.id)}} className="top-0 text-blue-500 font-bold ml-20">Post</button>
                    </div>

                    <span onClick={()=>{toggleCommentModal(po.id, po.image)}} className="text-sm text-gray-500 cursor-pointer">Show all comments</span>

                    
                </Card>
            </div>
            )
        )}
        )}
        {commentModal && (
        <div className="fixed top-0 left-0 modal">
            <div className=" w-[1350px] h-screen bg-gray-300 opacity-[70%]"></div>
            <div className="w-full h-full absolute flex justify-center items-center top-0">
                
                <Card className="">
                    <div className="w-[800px] flex gap-2">
                        <div className="w-1/2">
                            {/* <div className="flex justify-between border-b border-gray-200 -mx-4 px-4 mb-2">
                                <h2 className="font-bold -mt-1">Edit Profile </h2>
                                <svg onClick={toggleModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 -mt-1 mb-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div> */}
                            <div>
                                <div className="flex items-center justify-center overflow-hidden rounded-md">
                                    <img className="rounded-md w-[400px] h-[400px]" src={backend+postImageUrl} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="relative h-[400px] w-[400px] rounded-md flex flex-col w-1/2">
                            <div className="w-[365px] ml-1 h-[20px] bg-white border-b py-6 flex items-center -mt-1 gap-3 fixed">
                                <Avatar size = 'medium' />
                                <h2 className="font-bold">User name</h2>
                            </div>
                            <div className="bg-white py-3 px-2 mt-10 overflow-y-scroll" >
                            {oldComments.map((comments)=>(
                                
                                postId === comments.post.id && (<div className="mt-4">
                                    <div className="flex gap-2 items-center">
                                        <Avatar size = 'small' urls={comments.user.image}/>
                                        <h2 className="font-bold text-[12px]">{comments.user.username}</h2>
                                        <p className="text-[11px] text-gray-500">{moment.utc(comments.comment_date).local().startOf('seconds').fromNow()}</p>
                                    </div>
                                </div>)
                            ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>    
            <div className="absolute top-5 right-5 cursor-pointer">
                <svg onClick={toggleCommentModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        </div>)}
    </div>
    )
}

export default Post