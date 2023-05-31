import Card from "../Card";
import axios from '../../Axios'
import { getuser } from "../../Constants/Constants";
import { useState, useEffect } from "react";

function About(id){
    const [about, setAbout] = useState()
    const [friend, setFriend] = useState(id)
    console.log(friend);
    useEffect(()=>{
        getUser()
    },[])
    function getUser() {
        axios.post(getuser, JSON.stringify({ "user_id": id }), { headers: { 'Content-Type': 'application/json' } }).then((respone) => {
            setAbout(respone.data.about)
        })
    }

    return (
        <Card>
            <h2 className="text-3xl mb-4 font-bold">About</h2>
            {about !== 'null' ? (<p className="mb-2 text-2">{about}</p>) : (<p className="mb-2 text-2 ml-5"> <span className="text-xl mb-4 font-bold"></span> <br/> <br/> Here’s where you can share more about yourself: your history, work experience, accomplishments, interests, dreams, and more.</p>)}
        </Card>
    )
}

export default About