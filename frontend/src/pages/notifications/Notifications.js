import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContex";
import axios from '../../Axios';
import { getnotifications, markasread } from "../../Constants/Constants";
import { Link } from "react-router-dom";

function Notifications() {

    const {user} = useContext(AuthContext)
    const [notification, setNotification] = useState()

    useEffect (()=>{
        getNotifictaion()
    },[])

    const getNotifictaion = () =>{
        axios.get(getnotifications+user.user_id).then((respone)=>{
            setNotification(respone.data)
        })
    }

    const markAsRead=(noti)=>{
        axios.post(markasread,JSON.stringify({'notification':noti}),{
            headers: { "Content-Type": "application/json" },
        }).then((respone)=>{
            getNotifictaion()
        })
    }

  return (
    <div>
        <Layout>
            <Card className="p-4 mb-2">
                <h2 className="font-bold text-2xl text-gray-500 text-center">Notifications</h2>
            </Card>
            <Card noPadding={true}>
                <div className="">
                    {notification?.map((data,index)=>(
                        <div key={index}>                      
                            <div className="flex gap-2 items-center border-b p-4 relative">
                                <Link to={`/friendprofile/${data.sender.id}`}>
                                    <div className="flex gap-2 items-center p-4">
                                        <Avatar urls={data.sender.image}/>
                                        <div className="flex gap-2"><p className="font-bold">{data.sender.username}</p>{data.message}</div>
                                    </div>
                                </Link>
                                <div className="absolute right-10 cursor-pointer" onClick={()=>markAsRead(data.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </Layout>
    </div>
  )
}

export default Notifications
