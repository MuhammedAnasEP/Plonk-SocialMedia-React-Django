import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import Card from "./Card"
import AuthContext from "../context/AuthContex";

function SideBar() {

    const location = useLocation()
    // console.log(location)
    const {pathname} = location

    const {logoutUser} = useContext(AuthContext)

    const activeElementClasses='flex gap-3 py-3 my-1 bg-socialBlue text-white -mx-10 px-10 rounded-md shadow-md shadow-gray-400';
    const nonActiveElementClasses='flex gap-3 my-2 py-2 hover:bg-socialBlue hover:bg-opacity-20 -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-400';
    return (
        <div className="fixed w-[18%]">
            <Card >
            <div className="px-4">
                <h2 className="text-gray-400 mb-3 ">Navigation</h2>
                <Link to="/" className={pathname === '/' ? activeElementClasses : nonActiveElementClasses}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                    Home
                </Link>
                <Link to='/saved' className={pathname === '/saved' ? activeElementClasses : nonActiveElementClasses}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                    Saved Post
                </Link>
                <Link to="/notifications" className={pathname === '/notifications' ? activeElementClasses : nonActiveElementClasses}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    Notifications
                </Link>
                <a onClick={logoutUser} className={`cursor-pointer ${nonActiveElementClasses}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Logout
                </a>
            </div>
        </Card>
        </div>
    )
}
export default SideBar