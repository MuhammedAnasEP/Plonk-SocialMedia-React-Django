import {useState ,useEffect} from 'react'
import axios from '../Axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function UsersTable(){

    const [user,setUser] = useState(null)
    const navigate = useNavigate()

    useEffect (()=>{
        loading()
    },[])

    function loading(){
            axios.get('getusers/').then((respons)=>{
            setUser(respons.data)
        })
    }

    function userBlock(id,username,active){

        console.log('id :',active)
        
        Swal.fire({
            title: active ? `Are you sure to block ${username}` : `Are you sure to unblock ${username}`,
            icon:'warning',
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
        }).then((result)=>{
            if(result.value){
                console.log('result',result)
                axios.put(`blockuser/${id}`).then((respone)=>{
                    loading()
                    { active ? Swal.fire("Blocked!", `${respone.data} has been blocked`, "success"):
                        Swal.fire("UnBlocked!", `${respone.data} has been Unblocked`, "success")
                    }
                    
                }
                )
            }
        })

    }

    return (
        <div style={{fontFamily:"sans-serif"}} className="flex min-h-[96%] grow mx-4">
                <div className="bg-[#fff5] backdrop-blur shadow-lg grow shadow-[#0005] rounded-xl overflow-hidden">
                    <section className="w-full h-[10%] bg-[#fff4] px-[1rem] py-[.8rem] font-bold text-2xl">
                        <h2 >Users</h2>
                    </section>
                    <section className="w-[90%] max-h-[calc(89%-.8rem)] bg-[#fffb] my-[.8rem] mx-auto overflow-auto rounded-xl">
                        <table className="p-4 w-full">
                            <thead>
                                <tr>
                                    <th className="p-4 sticky top-0 left-0 bg-[#d5d1defe]">id</th>
                                    <th className="p-4 sticky top-0 left-0 bg-[#d5d1defe]">username</th>
                                    <th className="p-4 sticky top-0 left-0 bg-[#d5d1defe]">email</th>
                                    <th className="p-4 sticky top-0 left-0 bg-[#d5d1defe]">Action</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {user?.map((user,index)=>(
                                <tr key={index} className="even:bg-[#0000000b] hover:bg-[#fff6]">
                                    <td className="p-4 text-center">{index+1}</td>
                                    <td className="flex justify-center items-center p-4 ">
                                        {/* <img className="w-[36px] h-[36px] rounded-full mr-[.5rem]" src="https://images.unsplash.com/photo-1627672360124-4ed09583e14c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"/> */}
                                        {user.username}
                                    </td>
                                    <td className="p-4 text-center">{user.email}</td>
                                    <td className="p-4 text-center">
                                        {user.is_active ? <button onClick={()=>userBlock(user.id,user.username,user.is_active)} className="bg-red-400 p-[.4rem] px-4 text-red-800 rounded-3xl">Block</button> :
                                            <button onClick={()=>userBlock(user.id,user.username,user.is_active)} className="bg-green-400 p-[.4rem] px-4 text-green-800 rounded-3xl">UnBlock</button>
                                        }
                                        
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>

    )
}

export default UsersTable