import Avatar from '../Avatar'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContex'
import { getfollownglist,getchat } from '../../Constants/Constants'
import axios from '../../Axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'


function ChatList() {
  const params = useParams()
  const {user} = useContext(AuthContext)
  const [followingList, setFollowingList] = useState()
  const [chatList,setChatList] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    getFollowngList()
    getChat()
  },[])

  function getFollowngList(){
    axios.get(getfollownglist).then((respone)=>{
      setFollowingList(respone.data)
    })
  }

  function getChat(){
    axios.get(getchat+user.user_id).then((respone)=>{
      setChatList(respone.data)
    })
  }

  function chatNav(newreceiver){
    navigate(`/messages/${user.user_id}/${newreceiver}`)
  }
  

  return (
    <div className='border-r border-[#ebe7fb] pr-[20px]'>
      <div className="flex justify-between align-center mb-2">
          <h2 className='font-extrabold text-gray-600 mb-4 text-[20px]'>Chats</h2>
      </div>
      <div>
        <div className=" border rounded-[20px] overflow-hidden">
          <input className='transparent p-[15px] outline-none border-none w-[80%] pr-0' type="text" placeholder="Search Here" required />
          <button className="h-[46px] border-none outline-none w-[20%] curosor-pointer text-[20px] bg-white">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
      <div>
        <div className='border-t mt-3 py-3 '>
          {
            followingList?.map((data,index)=>(
              chatList?.map((chat)=>(
                chat.receiver === data.follow_user.id &&
                  <div key={index} onClick={()=>{chatNav(chat.receiver)}} className='flex items-center gap-2 mb-5 cursor-pointer'>
                    <div>
                      <Avatar size='medium' urls = {data.follow_user.image}/>
                    </div>
                    <div>
                      <p className='font-bold text-[14px]'>{data.follow_user.username}</p>
                    </div>
                  </div>
              ))
            ))
          }       
        </div>
      </div>
    </div>
  )
}

export default ChatList