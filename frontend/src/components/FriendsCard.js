import Card from "./Card"
import Avatar from "./Avatar"

function FriendsCard(){
    return (
        <Card>
            <h2 className="text-3xl mb-4 font-bold">Friends</h2>           
            <div className="flex gap-2 border-b p-4 -mx-4">
                <Avatar/>
                <div>
                    <h3 className="font-bold text-lg">Jane Doe</h3> 
                    <div className="text-sm leading-3">5 mutual friends</div>
                </div>
            </div>
            <div className="flex gap-2 border-b p-4 -mx-4">
                <Avatar/>
                <div>
                    <h3 className="font-bold text-lg">Jane Doe</h3> 
                    <div className="text-sm leading-3">5 mutual friends</div>
                </div>
            </div>
            <div className="flex gap-2 border-b p-4 -mx-4">
                <Avatar/>
                <div>
                    <h3 className="font-bold text-lg">Jane Doe</h3> 
                    <div className="text-sm leading-3">5 mutual friends</div>
                </div>
            </div>
            <div className="flex gap-2 border-b p-4 -mx-4">
                <Avatar/>
                <div>
                    <h3 className="font-bold text-lg">Jane Doe</h3> 
                    <div className="text-sm leading-3">5 mutual friends</div>
                </div>
            </div>
            <div className="flex gap-2 border-b p-4 -mx-4">
                <Avatar/>
                <div>
                    <h3 className="font-bold text-lg">Jane Doe</h3> 
                    <div className="text-sm leading-3">5 mutual friends</div>
                </div>
            </div>           
        </Card>
    )
}

export default FriendsCard