import { Link } from "react-router-dom"
import Card from "./Card"

function PhotosCard(){
    return(
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <div className="rounded-md overflow-hidden h-50">
                        <img src="https://images.unsplash.com/photo-1683582411325-b87240c5b530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>                    
                    </div>
                </Card>                
                <Card>
                    <div className="rounded-md overflow-hidden h-50">
                        <img src="https://images.unsplash.com/photo-1683582411325-b87240c5b530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>                    
                    </div>
                </Card>    
                <Card>
                    <div className="rounded-md overflow-hidden h-50">
                        <img src="https://images.unsplash.com/photo-1683582411325-b87240c5b530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>                    
                    </div>
                </Card>
                <Card>
                    <div className="rounded-md overflow-hidden h-50">
                        <img src="https://images.unsplash.com/photo-1683582411325-b87240c5b530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>                    
                    </div>
                </Card>
                <Card>
                    <div className="rounded-md overflow-hidden h-50">
                        <img src="https://images.unsplash.com/photo-1683582411325-b87240c5b530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>                    
                    </div>
                </Card>
                <Card>
                    <div className="rounded-md overflow-hidden h-50">
                        <img src="https://images.unsplash.com/photo-1683582411325-b87240c5b530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>                    
                    </div>
                </Card>               
            </div>
    )
}

export default PhotosCard