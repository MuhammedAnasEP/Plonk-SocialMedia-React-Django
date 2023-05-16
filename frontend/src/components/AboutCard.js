import Card from "./Card";
import { getuser } from "../Constants/Constants";
import { useContext, useEffect, useState } from "react";
import axios from '../Axios'
import AuthContext from "../context/AuthContex";

function AboutCard() {
    const {user} = useContext(AuthContext)
    const [about, setAbout] = useState()
    useEffect(()=>{
        getUser()
    },[])
    function getUser() {
        axios.post(getuser, JSON.stringify({ "user_id": user.user_id }), { headers: { 'Content-Type': 'application/json' } }).then((respone) => {
            setAbout(respone.data.about)
        })
    }

    return (
        <Card>
            <h2 className="text-3xl mb-4 font-bold">About</h2>
            {about !== 'null' ? <p className="mb-2 text-2">{about}</p> : <p className="mb-2 text-2 ml-5">Please provid information about your self.</p>}
        </Card>
    )
}

export default AboutCard