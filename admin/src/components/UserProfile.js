function UserProfile({toggle}){
    return(
        <div className={`flex gap-5 items-center ${ toggle ? "bg-none transition-all duration-300 delay-200 p-1" : " bg-white rounded-xl p-1"}`}>
            <div className="min-w-[3.5rem] h-[3.5rem]">
                <img className="w-[57px] h-[57px] rounded-full object-cover" src="https://images.unsplash.com/photo-1484863137850-59afcfe05386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"/>
            </div>
            <div className={toggle ? "opacity-0 delay-200" : ""}>
                <h3 className="text-xl font-bold">Admin Sir</h3>
                <span className="text-[0.75rem] opacity-60">admin@plonk.com</span>
            </div>
        </div>
    )
}

export default UserProfile