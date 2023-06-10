import Card from "../Card";
import Avatar from "../Avatar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContex";
import axios from '../../Axios';
import { getfollownglist, unfollow } from "../../Constants/Constants";
import { Link } from "react-router-dom";

function Followers() {
    const { user } = useContext(AuthContext)

    const [followingList, setFollowingList] = useState()

    useEffect(() => {
        getFollowngList()
    }, [])

    function getFollowngList() {
        axios.get(getfollownglist).then((respone) => {
            setFollowingList(respone.data)
        })
    }


    const RemoveFollower = (id, follow) => {
        axios.put(unfollow + id + '/' + follow).then((respone) => {
            getFollowngList()
        })
    }


    return (
        <Card>
            <h2 className="text-3xl mb-4 font-bold">Friends</h2>
            {
            followingList?.map((data, index) => (
                user.user_id === data.follow_user.id && (
                <div key={index} className="flex border-b p-4 -mx-4 items-center justify-between">
                    <Link to={`/friendprofile/${data.follow_user.id}`}>
                        <div className="flex items-center gap-2">
                            <Avatar size='medium' urls={data.user.image} />
                            <div>
                                <h3 className="font-bold text-lg">{data.user.username}</h3>
                            </div>
                        </div>
                    </Link>
                    <div>
                        <button onClick={() => { RemoveFollower(data.user.id, data.follow_user.id) }} className="text-blue-500 hover:text-blue-600 px-3 rounded-md font-bold">Remove</button>
                    </div>
                </div>)
                ))
            }
        </Card>
    )
}

export default Followers