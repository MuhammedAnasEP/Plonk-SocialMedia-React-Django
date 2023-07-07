import { useState, useContext, useEffect } from "react"
import Card from "./Card"
import Avatar from "./Avatar"
import { Link } from "react-router-dom"
import AuthContext from "../context/AuthContex"
import { comments, getcomments, getlike, getsavedpost, like, savepost, getuser,deletecomment, savedpost, unsave, unlike, backend } from "../Constants/Constants"
import axios from "../Axios"
import moment from 'moment';
import Swal from "sweetalert2"

function SavedPostCard() {
    const [oldComments, setOldCommets] = useState(null)
    const [comment, setComment] = useState("")
    const [likes, setLikes] = useState(null)
    const [savedposts, setSavedPosts] = useState(null)
    const [saved, setSaved] = useState()
    const [profile, setProfile] = useState()
    const { user } = useContext(AuthContext)
    const [commentModal, setCommentModal] = useState(false)
    const [postId, setPostId] = useState()
    const [postImageUrl, setPostImgaeUrl] = useState()
    const [postUsername, setPostUsername] = useState()
    const [postUserProfile, setPostUserProfile] = useState()


    useEffect(() => {
        getComments()
        getLike()
        getSaved()
        getUser()
        savedPost()
    }, [])


    function addComment(user_id, post_id) {
        axios.post(comments, JSON.stringify({ "user": user_id, "post": post_id, "comment": comment }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((respone) => {
            getComments()
            setComment()
            Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }

    function getComments() {
        axios.get(getcomments).then((respone) => {
            setOldCommets(respone.data)
        })
    }

    function Like(user, post) {
        axios.post(like, JSON.stringify({ 'user': user, 'post': post }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((respone) => {
            getLike()
        })
    }

    function unLike(user, post) {

        axios.post(unlike, JSON.stringify({ 'user': user, 'post': post }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((respone) => {
            getLike()
        })
    }

    function getLike() {
        axios.get(getlike).then((respone) => {
            setLikes(respone.data)
        })
    }

    function Save(user, post) {
        axios.post(savepost, JSON.stringify({ 'user': user, 'post': post }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((respone) => {
            getSaved()
        })
    }

    function unSave(user, post) {
        axios.post(unsave, JSON.stringify({ 'user': user, 'post': post }), {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((respone) => {
            getSaved()
        })
    }


    function getSaved() {
        axios.get(getsavedpost).then((respone) => {
            setSavedPosts(respone.data)
        })
    }

    function getUser() {
        axios.post(getuser, JSON.stringify({ "user_id": user.user_id }), { headers: { 'Content-Type': 'application/json' } }).then((respone) => {
            setProfile(respone.data.image)
        })
    }

    function savedPost() {
        axios.get(savedpost + user.user_id).then((respone) => {
            setSaved(respone.data)
            console.log(respone.data)
        })
    }

    function toggleCommentModal(id, url, username, userpro) {
        setCommentModal(!commentModal)
        setPostId(id)
        setPostImgaeUrl(url)
        setPostUsername(username)
        setPostUserProfile(userpro)
    }
    if (commentModal) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }

    function deleteComment(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.value) {
                axios.put(deletecomment + id).then((respone) => {
                    getComments()
                })
            }
        })
    }

    return (
        <div className="realtive">
            {saved?.map((data) => {
                const isSaved = savedposts?.some((s) => s.user.id === user.user_id && s.post.id === data.post.id);
                const isLiked = likes?.some((l) => l.user.id === user.user_id && data.post.id === l.post.id);
                return (
                    data.user.id === user.user_id && (
                        <div>
                            <Card className="">
                                <div className="flex gap-3 mb-2">
                                    <div>
                                        <Link to={`/friendprofile/${data.user.id}`}>
                                            <Avatar urls={data.post.user.image} />
                                        </Link>
                                    </div>
                                    <div className="grow">
                                        <Link to={`/friendprofile/${data.user.id}`}><p><span className="font-semibold cursor-pointer hover:underline">{data.post.user.username}</span> Shared a <span className="text-socialBlue">post</span></p></Link>
                                        <p className="text-gray-500 text-sm">{moment.utc(data.post.date_posted).local().startOf('seconds').fromNow()}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="mb-1">{data.post.description}</p>
                                    <div className="rounded-md overflow-hidden bg-gray-300 flex justify-center">
                                        <img className="max-w-full max-h-[550px] rounded-md" src={backend + data.post.image} alt="" />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex gap-8">
                                        {
                                            isLiked ?
                                                <button onClick={() => { unLike(user.user_id, data.post.id) }} className="flex gap-2 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                    </svg>
                                                </button> : <button onClick={() => { Like(user.user_id, data.post.id) }} className="flex gap-2 items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                                    </svg>
                                                </button>
                                        }
                                    </div>
                                    <div className="">
                                        {isSaved ?
                                        <button onClick={() => { unSave(user.user_id, data.post.id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                            </svg>
                                        </button> : <button onClick={() => { Save(user.user_id, data.post.id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                            </svg>
                                        </button>}
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-3">
                                    <div className="mt-1">
                                        <Avatar size={'small'} urls={profile} />
                                    </div>
                                    <div className="flex w-[87%] h-8 text-center overflow-hidden">
                                        <div className="w-[87%]">
                                            <textarea onChange={(e) => { setComment(e.target.value) }} value={comment} className="block w-[92%] py-1 outline-none overflow-hidden" placeholder="Leave a comment" />
                                        </div>
                                    </div>
                                    <button onClick={() => { addComment(user.user_id, data.post.id) }} className="top-0 ml-20 text-blue-500 font-bold">Post</button>
                                </div>

                                <span onClick={() => { toggleCommentModal(data.post.id, data.post.image, data.user.username, data.user.image) }} className="text-sm text-gray-500 cursor-pointer">Show all comments</span>

                            </Card>
                        </div>
                    )
                )
            }
            )}
            {commentModal && (
            <div className="fixed top-0 left-0 modal z-40">
                <div className=" w-[1350px] h-screen bg-gray-300 opacity-[70%] "></div>
                <div className="w-full h-full absolute flex justify-center items-center top-0">

                    <Card className="" >
                        <div className="w-[800px] flex gap-2">
                            <div className="w-1/2">
                                <div>
                                    <div className="flex items-center justify-center overflow-hidden rounded-md">
                                        <img className="rounded-md w-[400px] h-[400px]" src={backend + postImageUrl} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="relative h-[400px] w-[400px] rounded-md flex flex-col w-1/2">
                                <div className="w-[365px] ml-1 h-[20px] bg-white border-b py-6 flex items-center -mt-1 gap-3 fixed">
                                    <Avatar size='medium' urls={postUserProfile} />
                                    <h2 className="font-bold">{postUsername}</h2>
                                </div>
                                <div className="bg-white py-3 px-2 mt-10 overflow-y-scroll" >
                                    {oldComments.map((comments) => (

                                        postId === comments.post.id && (<div className="mt-4">
                                            <div className="flex gap-2 items-center">
                                                <Avatar size='small' urls={comments.user.image} />
                                                <h2 className="font-bold text-[12px]">{comments.user.username}</h2>
                                                <p className="text-[11px] text-gray-500">{moment.utc(comments.comment_date).local().startOf('seconds').fromNow()}</p>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-[12px] ml-7">{comments.comment}</p>
                                                {comments.user.id === user.user_id &&
                                                    <svg onClick={() => { deleteComment(comments.id) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-3 hover:cursor-pointer">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>}
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

export default SavedPostCard