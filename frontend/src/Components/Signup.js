import {Link} from 'react-router-dom'

function Signup() {
    return (
        <div>
            <section className="bg-gray-75 min-h-screen flex items-center justify-center">
                <div className="bg-[#E3EBF8] rounded-2xl p-5 items-center flex max-w-5xl p-5 shadow-xl">
                    <div className="lg:px-16 lg:w-3/4">
                        <h2 className="font-bold text-2xl text-[#5B6484]">Signup</h2>
                        <p className="text-xs mt-4 text-[#5B6484]">Welcome to Sociogram</p>
                        <form action="" className="md:visible md:flex md:flex-col md:gap-4 hidden" >
                            <div className="mt-8 flex">
                                <input type="text" placeholder="First Name" className="border p-2 rounded-xl text-sm"/>
                                <input type="text" placeholder="Last Name" className="border p-2 rounded-xl text-sm ml-2"/>
                            </div>
                            <input type="text" placeholder="username" className="border p-2 rounded-xl"/>
                            <input type="text" placeholder="Email" className="border p-2 rounded-xl text-sm" />
                            <input type="password" placeholder="Password" className="border p-2 rounded-xl text-sm" />
                            <input type="password" placeholder="Confirm Password" className="border p-2 rounded-xl text-sm" />
                            <button className="bg-[#44517b] text-white rounded-xl py-2 hover:scale-105 duration-300">Log in</button>
                        </form>
                        <form action="" className="flex flex-col gap-4 md:hidden">
                            
                            <input type="text" placeholder="First Name" className="border p-2 rounded-xl text-sm mt-8"/>
                            <input type="text" placeholder="Last Name" className="border p-2 rounded-xl text-sm"/>
                            
                            <input type="text" placeholder="username" className="border p-2 rounded-xl"/>
                            <input type="text" placeholder="Email" className="border p-2 rounded-xl text-sm" />
                            <input type="password" placeholder="Password" className="border p-2 rounded-xl text-sm" />
                            <input type="password" placeholder="Confirm Password" className="border p-2 rounded-xl text-sm" />
                            <button className="bg-[#44517b] text-white rounded-xl py-2 hover:scale-105 duration-300">Log in</button>
                        </form>
                        <div className="mt-6 grid grid-cols-3 items-center ">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm text-gray-400">OR</p>
                            <hr className="border-gray-400" />
                        </div>
                        <button className="border bg-white text-[#44517b] rounded-xl w-full mt-5 py-2 text-sm flex justify-center items-center hover:scale-105 duration-300">
                            <img src="images/googleIcon.png" className="w-5 mr-3" />
                            Signup with Google
                        </button>
                        <div className="mt-3 text-xs flex justify-between items-center text-[#5B6484] border-t  border-[#5B6484] py-4 mt-7">
                            <p>Already have account ?</p>
                            <Link to='/login'><button className="bg-white border rounded-xl py-2 px-5 hover:scale-105 duration-300">Login</button></Link>
                        </div>
                    </div>
                    <div className="lg:block hidden bg-[#E3EBF8]" >
                        <img src="images/login.jpg" className="rounded-3xl" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup