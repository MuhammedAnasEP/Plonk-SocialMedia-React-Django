import SideBar from "./SideBar"

function Layout({children,page}){
    let maxWidth = 'max-w-4xl'
    let width1 = 'w-3/12'
    let width2 = 'w-9/12'
    if (page === 'home'){
        maxWidth = 'max-w-5xl'
        width1 = 'w-[20%]'
        width2 = 'w-[80%]'
    }
    return(
        <div className={`flex mt-4 ${maxWidth} mx-auto gap-6`}>
            <div className={width1}>
                <SideBar />
            </div>
            <div className={width2}>
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout