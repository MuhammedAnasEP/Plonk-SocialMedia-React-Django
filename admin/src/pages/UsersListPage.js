import SideBar from "../components/SideBar"
import UsersTable from "../components/UsersTable"

function UsersListPage(){
    return(
        <div className="w-full bg-gray-700 h-screen gap-5 object-cover flex items-center">
            <SideBar/>
            <UsersTable/>
        </div>
    )
}

export default UsersListPage