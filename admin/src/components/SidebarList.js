import {RxDashboard} from "react-icons/rx"
import {AiOutlineLogout} from "react-icons/ai"
import {FiUsers} from "react-icons/fi"

function SideBarList({toggle}){
    return(
        <div className="">
            <div className="sidebar">
                <div className="flex">
                    <RxDashboard className="mr-8 text-[1.7rem]"/>
                    <h2 className={`${toggle ? "opacity-0 delay-200" : ""} text-[1rem]  whitespace-pre`}>Dashboard</h2>
                </div>      
            </div>
            <div className="sidebar">
                <div className="flex">
                    <FiUsers className="mr-8 text-[1.7rem]"/>
                    <h2 className={`${toggle ? "opacity-0 delay-200" : ""} text-[1rem] whitespace-pre`}>Users</h2>
                </div>      
            </div>
            <div className={`${toggle ? "" : "w-[17rem]"} flex p-4 rounded-lg cursor-pointer text-white hover:bg-white hover:text-black transition-all absolute bottom-4  duration-300`}>
                <div className="flex">
                    <AiOutlineLogout className="mr-8 text-[1.7rem] "/>
                    <h2 className={`${toggle ? "opacity-0 delay-200" : ""} text-[1rem] whitespace-pre`}>Logout</h2>
                </div>
            </div>
        </div>
    )
}

export default SideBarList