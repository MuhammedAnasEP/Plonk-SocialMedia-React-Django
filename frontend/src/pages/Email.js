import { useContext, useState } from 'react'
import Card from '../components/Card'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../Axios'
import { changeemail } from '../Constants/Constants'
import AuthContext from '../context/AuthContex'
import Swal from 'sweetalert2'

export default function Email() {
  const navigate = useNavigate()
  const params = useParams()
  const [email, setEmail] = useState(params.newEmail)
  const {user} = useContext(AuthContext)

  const ChangeEmail=()=>{
    axios.put(changeemail+user.user_id,JSON.stringify({'email':email}),{
      headers: { "Content-Type": "application/json" },
  }).then((respone)=>{
    navigate('/profile/edit')
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your email is changed successfully",
      showConfirmButton: false,
      timer: 1000,

  });
  })
  }

  return (
    <div className='py-[12%] px-20'>
      <Card>
        <div className='flex-col items-center'>
            <h2 className='font-bold text-center p-10 text-lg'>Email Confirmation</h2>
            <p className='text-center'>Your email is confirmed please click the button to change the email address.</p>
            <div className='flex justify-center mt-3'>
              <button onClick={ChangeEmail} className='bg-blue-400 p-3 border-radious-5 rounded-md font-bold text-white'>Change Email</button>
            </div>
        </div>
      </Card>
    </div>
  )
}
