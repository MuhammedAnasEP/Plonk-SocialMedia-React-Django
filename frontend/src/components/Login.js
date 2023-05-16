import { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContex'



function Login() {
    let {loginUser} = useContext(AuthContext)
    let {user, errors} = useContext(AuthContext)
    return (
        <div>
            <section className="bg-gray-75 min-h-screen flex items-center justify-center">
                <div className="bg-[#E3EBF8] rounded-2xl p-5 items-center flex max-w-3xl p-5 shadow-xl">
                    <div className="px-8 md:px-16 md:w-1/2">
                        <h2 className="font-bold text-2xl text-[#5B6484]">Login</h2>
                        <p className="text-xs mt-4 text-[#5B6484]">If you are already a memeber, easy log in</p>

                        <form onSubmit={loginUser} className="flex flex-col gap-4">
                            <input type="text" placeholder="Email Or Username" className="border p-2 mt-8 rounded-xl text-sm" name='username' />
                            <span className='text-[12px] text-red-500 ml-3 -mt-4'>{errors.username}</span>
                            <input type="password" placeholder="Password" className="border p-2 rounded-xl text-sm" name='password' />
                            <span className='text-[12px] text-red-500 ml-3 -mt-4'>{errors.password}</span>
                            <button className="bg-[#44517b] text-white rounded-xl py-2 hover:scale-105 duration-300">Log in</button>
                        </form>
    
                        {/* <div className="mt-6 grid grid-cols-3 items-center ">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm text-gray-400">OR</p>
                            <hr className="border-gray-400" />
                        </div> */}
                        {/* <button className="border bg-white text-[#44517b] rounded-xl w-full mt-5 py-2 text-sm flex justify-center items-center hover:scale-105 duration-300">
                            <img src="images/googleIcon.png" className="w-5 mr-3" />
                            Login with Google
                        </button> */}
                        <div className="flex justify-center text-xs mt-3 border-b border-[#5B6484] py-4 text-[#5B6484]">
                            <a>Forgot your password ?</a>
                        </div>
                        <div className="mt-3 text-xs flex justify-between items-center text-[#5B6484]">
                            <p>Don't have an account ?</p>
                            <Link to='/signup'><button className="bg-white border rounded-xl py-2 px-5 hover:scale-105 duration-300">Register</button></Link>
                        </div>
                    </div>
                    <div className="md:block hidden bg-[#E3EBF8]" >
                        <img src="images/login.jpg" alt='' className="rounded-3xl" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login