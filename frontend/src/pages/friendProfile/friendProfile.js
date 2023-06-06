import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import About from "../../components/friendProfile/About";
import Friends from "../../components/friendProfile/Friends";
import axios from '../../Axios';
import { getuser } from "../../Constants/Constants";
import { useState, useEffect, useContext } from "react";
import Post from "../../components/friendProfile/Post";
import { addchat } from "../../Constants/Constants";
import AuthContext from "../../context/AuthContex";
import { unfollow } from "../../Constants/Constants";

function FriendProfile() {
    const location = useLocation()
    const params = useParams()
    const {pathname} = location
    const {user} = useContext(AuthContext)
    const [userProfile,setUserPofile] = useState()
    const [username,setUsername] = useState()
    const [userFirstname, setUserFirstname] = useState()
    const [userLastname, setUserLastname] = useState()
    const [id,setID] = useState(params.userId)
    const navigate = useNavigate()

    const tabClasses = 'flex gap-1 px-4 py-1 items-center border-b-4 border-b-white';
    const activeTabClasses = 'flex gap-1 px-4 py-1 items-center border-socialBlue border-b-4 text-socialBlue font-bold';

    useEffect(()=>{
        getUser()
    },[])

    function getUser(){
        axios.post(getuser,JSON.stringify({"user_id":id}),{headers:{'Content-Type' : 'application/json'}}).then((respone)=>{
            setUserPofile(respone.data.image)
            setUsername(respone.data.username)
            setUserFirstname(respone.data.first_name)
            setUserLastname(respone.data.last_name)
        })
    }

    function addChat(){
        axios.post(addchat+user.user_id+'/'+id,{headers:{
            'Content-Type' : 'application/json'
        }}).then((respone)=>{
            navigate(`/messages/${respone.data.sender}/${respone.data.receiver}`)
        })
    }

    const Unfollow = (id, follow) => {
        axios.put(unfollow + id + '/' + follow).then((respone) => {})
    }

    return (
        <div>
            <Layout>
                <Card noPadding={true}>
                    <div className="relative rounded-md overflow-hidden">
                        <div className="h-36 overflow-hidden flex justify-center items-center">
                            <img className="w-full" src="https://images.unsplash.com/photo-1682965636984-e5e8c00197bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="" />
                        </div>
                        <div className="absolute top-24 left-4">
                            <Avatar size='large' urls={userProfile}/>
                        </div>
                        <div className="p-4 pb-0">
                            <div className="flex items-center">
                                <div className="ml-40">
                                    <h2 className="text-3xl font-bold">{username}</h2>
                                    <div className="text-gray-500 leading-4">{userFirstname} {userLastname}</div>
                                </div>
                                <div className="flex ml-10 gap-3">
                                    <button onClick={() => { Unfollow(user.user_id, id) }} className="bg-gray-700 px-2 py-1 text-white font-bold rounded-lg hover:bg-gray-500">Unfollow</button>
                                    {/* <button onClick={addChat} className="bg-gray-700 px-2 py-1 text-white font-bold rounded-lg hover:bg-gray-500">Message</button> */}
                                </div>
                            </div>
                            <div className="mt-10 flex gap-0">
                                <Link to={`/friendprofile/posts/${id}`} className={ pathname === `/friendprofile/${id}` || pathname === `/friendprofile/posts/${id}` ? activeTabClasses : tabClasses}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>
                                    Posts
                                </Link>
                                <Link to={`/friendprofile/friends/${id}`} className={pathname === `/friendprofile/friends/${id}` ? activeTabClasses : tabClasses}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                    Friends
                                </Link>
                                <Link to={`/friendprofile/about/${id}`} className={pathname === `/friendprofile/about/${id}` ? activeTabClasses : tabClasses}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                    About
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
                <div>
                {
                    (()=>{if(pathname === `/friendprofile/${id}` || pathname === `/friendprofile/posts/${id}` )
                        {
                            return <Post/>
                        }else if (pathname === `/friendprofile/about/${id}`){
                            return <About />                    
                        }else if (pathname === `/friendprofile/friends/${id}`){
                            return <Friends/>
                        }
                    })()
                }
                </div>
            
            </Layout>        
            
        </div>
    )
}

export default FriendProfile