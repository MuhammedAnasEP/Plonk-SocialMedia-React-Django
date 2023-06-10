import { Card } from "@material-ui/core";
import Layout from "../../components/Layout";
import SavedPostCard from "../../components/SavedPostCard";

function Saved(){
    return(
        <Layout>
            <div className="">
                <Card className="p-4 mb-2">
                    <h2 className="font-bold text-2xl text-gray-500 text-center">Saved Posts</h2>
                </Card>
                <SavedPostCard/>
            </div>
        </Layout>
    )
}

export default Saved