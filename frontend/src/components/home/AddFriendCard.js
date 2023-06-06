import Card from "../Card";
import Avatar from "../Avatar";
import { useContext, useEffect, useState } from "react";
import { follow, getallusers, getuser, getfollowings } from "../../Constants/Constants";
import axios from '../../Axios'
import AuthContext from '../../context/AuthContex'
import { Link } from "react-router-dom";
import swal from 'sweetalert2'

function AddFriendCard() {

  const [userImage,setUserImage] = useState()
  const [userUsername,setUserUsername] = useState()
  const [userId, setUserId] = useState()
  const [following, setFollowing] = useState()
  const [allUsersData,setAllUsersData] = useState([])
  const {user} = useContext(AuthContext)

  useEffect(()=>{
    getUser()
    getAllUser()
  },[])

  function getUser(){
    axios.post(getuser,JSON.stringify({"user_id":user.user_id}),{headers:{'Content-Type' : 'application/json'}}).then((respone)=>{
      setUserImage(respone.data.image)
      setUserUsername(respone.data.username)
      setUserId(respone.data.id)
      getFollowings(respone.data.id)
    })
  }

  function getAllUser(){
    axios.post(getallusers).then((respone)=>{
      setAllUsersData(respone.data)
    })
  }

  const getFollowings = (userId) => {
    axios.get(getfollowings+userId).then((respone)=>{
        setFollowing(respone.data)
    })
  }

  function Follow(to){
    axios.post(follow+user.user_id,JSON.stringify({'to':to}),{headers:{
      'Content-Type' : "application/json"
    }}).then((respone)=>{
      getAllUser()
      getFollowings(userId)
      swal.fire({
        icon:'success',
        title:'Followed',
        showConfirmButton:false,
        timer: 1500
      })   
    })
  }

  

  return (
    <div className="ml-6">
      <Card >
        <Link to='/profile'>
        <div className="flex items-center font-semibold gap-3 cursor-pointer">
          <Avatar size='medium' urls={userImage}/>
          <h2>{userUsername}</h2>
        </div>
        </Link>
      </Card>
      <Card>
        <div className="border-b -mx-4 px-4 -mt-1 pb-2 mb-5">
          <h2 className="font-bold">Add Friends</h2>
        </div>
        {
          allUsersData?.map((value)=>{
            if (following){
              const isFollowed = following.some((data)=> data.follow_user.id === value.id);
                if(!isFollowed && value.id !== userId){
                return(
                <div className="mt-4 flex justify-between -mx-2">
                  <Link to={`/friendprofile/${value.id}`}>
                    <div className="flex items-center gap-3">
                      <Avatar size="medium" urls={value.image}/>
                      <p className="text-[14px] font-semibold ">{value.username}</p>
                    </div>
                  </Link>
                  <button onClick={()=>{Follow(value.id)}} className="bg-socialBlue hover:bg-blue-400 px-2 rounded-md text-white text-[12px] font-semibold">Follow</button>
                </div>
                )
              }
            }
          })
        }
      </Card>
    </div>
  )
}

export default AddFriendCard

