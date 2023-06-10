import { useState, useEffect } from "react";
import Card from "../Card";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar";
import axios from '../../Axios';
import { getfollownglist, getuser } from "../../Constants/Constants";
import { Link } from "react-router-dom";

function Following(id){
    const params = useParams()
    const [followingList, setFollowingList] = useState()
    const [friend,setFriend] = useState()
  
    useEffect(()=>{
        getFollowngList()
        getUserp()
    },[])

    function getFollowngList(){
        axios.get(getfollownglist).then((respone)=>{
        setFollowingList(respone.data)
        })
    }

    function getUserp(){
        axios.post(getuser,JSON.stringify({"user_id":params.userId}),{headers:{'Content-Type' : 'application/json'}}).then((respone)=>{
            setFriend(respone.data.id)
        })
    }
    return (
        <Card>
            <h2 className="text-3xl mb-4 font-bold">Following</h2>   
            {
                followingList?.map((data)=>(
                    friend === data.user.id &&(
                <div className="flex border-b p-4 -mx-4 items-center justify-between">
                   <Link to={`/friendprofile/${data.follow_user.id}`}>
                        <div className="flex items-center gap-2">
                            <Avatar size='medium' urls={data.follow_user.image}/>
                            <div>
                                <h3 className="font-bold text-lg">{data.follow_user.username}</h3> 
                            </div>
                        </div>
                   </Link>
                    {/* <div>
                        <button className="bg-gray-300 hover:bg-gray-400 px-3 rounded-md font-bold">Unfollow</button>
                    </div> */}
                </div>)
                ))
            }        
        </Card>
    )
}

export default Following