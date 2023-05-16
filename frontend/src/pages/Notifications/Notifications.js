import Layout from "../../components/Layout"
import Card from "../../components/Card"
import Avatar from "../../components/Avatar"

function Notifications() {
  return (
    <div>
        <Layout>
            <Card className="p-4 mb-2">
                <h2 className="font-bold text-2xl text-gray-500">Notifications</h2>
            </Card>
            <Card noPadding={true}>
                <div className="">
                    <div className="flex gap-2 items-center border-b p-4">
                        <Avatar/>
                        <div>Jhone Doe liked your photo</div>
                    </div>
                    <div className="flex gap-2 items-center border-b p-4">
                        <Avatar/>
                        <div>Jhone Doe liked your photo</div>
                    </div>
                    <div className="flex gap-2 items-center border-b p-4">
                        <Avatar/>
                        <div>Jhone Doe liked your photo</div>
                    </div>
                    <div className="flex gap-2 items-center border-b p-4">
                        <Avatar/>
                        <div>Jhone Doe liked your photo</div>
                    </div>
                    <div className="flex gap-2 items-center border-b p-4">
                        <Avatar/>
                        <div>Jhone Doe liked your photo</div>
                    </div>
                </div>
            </Card>
        </Layout>
    </div>
  )
}

export default Notifications
