import { useState, useEffect } from "react"
import Avatar from "../Avatar"
import { getmessages, getonechat, sendchat } from "../../Constants/Constants"
import { useParams } from "react-router-dom"
import axios from '../../Axios'



const ChatContent = () => {
  const params = useParams()
  const [message, setMessage] = useState()
  const [oldMessages, setOldMessages] = useState();
  const [chat, setChat] = useState()



  useEffect(() => {
    getOneChat()
  },[])

  const sendMessage = () => {
    const data = {
      'message': message,
    }
    axios.post(sendchat + params.sender + '/' + params.receiver, data, {
      Headers: {
        'Content-Type': 'application/json'
      }
    }).then((respone) => {
      getOneChat()
      setMessage("")
    })

  }

  const getOneChat = () => {
    axios.get(getonechat + params.sender + '/' + params.receiver).then((respone) => {
      getMessages(respone.data.id)
      setChat(respone.data)
    })
  }

  const getMessages = (chatID) => {
    axios.get(getmessages + chatID).then((respone) => {
      setOldMessages(respone.data)
    })
  }

  return (
    <div className="relative">
      <div className="flex gap-4 items-center border-b pb-4 w-[500px]">
        <Avatar />
        <h2 className="font-bold">User Name</h2>
      </div>
      {
        oldMessages?.map((data)=>(
          chat.sender === data.sender ? 
          <div className="flex justify-between mt-3"> 
            <div className="border opacity-0 rounded-xl p-4 w-[200px]">
              <p>{data.content}</p>
            </div>
            <div className="border rounded-xl p-4 w-[200px] bg-blue-400">
              <p>{data.content}</p>
            </div> 
          </div> :
          <div className="flex justify-between mt-3"> 
            <div className="border opacity-0 rounded-xl p-4 w-[200px]">
              <p>{data.content}</p>
            </div>
            <div className="border rounded-xl p-4 w-[200px] bg-blue-400 opacity-0">
              <p>{data.content}</p>
            </div> 
          </div>             
        ))
      }
      <div className="absolute bottom-0 flex">
        <input className="border-2 outline-none w-[500px] rounded-full p-4" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="Type your message" />
        {message &&
          <div className="absolute top-5 right-5" onClick={sendMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
        }
      </div>
    </div>
  )
}

export default ChatContent