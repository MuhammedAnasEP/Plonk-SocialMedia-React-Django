import Card from "./Card";
import Avatar from "./Avatar";
import { useContext, useEffect, useState } from "react";
import { follow, getallusers, getuser } from "../Constants/Constants";
import axios from '../Axios'
import AuthContext from '../context/AuthContex'

function AddFriendCard() {

  const [userdata,setUserdata] = useState()
  const [allUsersData,setAllUsersData] = useState()
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    getUser()
    getAllUser()
  },[])
  function getUser(){
    axios.post(getuser,JSON.stringify({"user_id":user.user_id}),{headers:{'Content-Type' : 'application/json'}}).then((respone)=>{
      setUserdata(respone.data)
    })
  }

  function getAllUser(){
    axios.post(getallusers).then((respone)=>{
      setAllUsersData(respone.data)
    })
  }

  function Follow(to){
    axios.post(follow+user.user_id,JSON.stringify({'to':to}),{headers:{
      'Content-Type' : "application/json"
    }}).then((respons)=>{
      getAllUser()
    })
  }

  return (
    <div className="ml-6">
      <Card>
        <div className="border-b -mx-4 px-4 -mt-1 pb-2 mb-5">
          <h2 className="font-bold">Add Friends</h2>
        </div>
        {
          allUsersData?.map((data)=>(
          user.user_id !== data.id && (
          <div className="mt-4 flex justify-between -mx-2">
            <div className="flex items-center gap-3">
              <Avatar size="medium" urls={data.image}/>
              <p className="text-[14px] font-semibold ">{data.username}</p>
            </div>
            <button onClick={()=>{Follow(data.id)}} className="bg-socialBlue hover:bg-blue-400 px-2 rounded-md text-white text-[12px] font-semibold">Follow</button>
          </div>
          )
          ))
        }
      </Card>
    </div>
  )
}

export default AddFriendCard
