function Avatar({size,urls}) {

    let width = 'w-12'
    let hight = 'h-12'

    if (size === 'large'){
        width = 'w-36'
        hight = 'h-36'
    }

    if (size === 'small'){
        width = 'w-5'
        hight = 'h-5'
    }
    console.log("urls",urls)

    return (
        <div className={`${width} ${hight} rounded-full overflow-hidden`}>
            {urls ? <img className="object-cover" src={'http://127.0.0.1:8000/'+urls} alt=""></img> : <img className="object-cover" src="/images/profile.jpg" alt=""></img>}
        </div>
    )
}

export default Avatar