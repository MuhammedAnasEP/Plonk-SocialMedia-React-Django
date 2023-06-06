import Layout from "../../components/Layout";
import Card from "../../components/Card";
import Avatar from "../../components/Avatar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContex";
import axios from '../../Axios';
import { getnotifications } from "../../Constants/Constants";
import { Link } from "react-router-dom";

function Notifications() {

    const {user} = useContext(AuthContext)
    const [notificarion, setNotification] = useState()

    useEffect (()=>{
        getNotifictaion()
    },[])

    const getNotifictaion = () =>{
        axios.get(getnotifications+user.user_id).then((respone)=>{
            setNotification(respone.data)
        })
    }

  return (
    <div>
        <Layout>
            <Card className="p-4 mb-2">
                <h2 className="font-bold text-2xl text-gray-500">Notifications</h2>
            </Card>
            <Card noPadding={true}>
                <div className="">
                    {notificarion?.map((data,index)=>(                        
                        <Link to={`/friendprofile/${data.sender.id}`}>
                    <div key={index} className="flex gap-2 items-center border-b p-4">
                            <Avatar urls={data.sender.image}/>
                            <div className="flex gap-2"><p className="font-bold">{data.sender.username}</p>{data.message}</div>
                    </div>
                        </Link>
                    ))}
                </div>
            </Card>
        </Layout>
    </div>
  )
}

export default Notifications
