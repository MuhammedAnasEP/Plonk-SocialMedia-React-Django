import Layout from "../../components/Layout"
import PostFormCard from "../../components/PostFormCard"
import PostCard from "../../components/PostCard"
import AddFriendCard from "../../components/AddFriendCard"

function Home() {
    return (
        <Layout page='home'>
            <div className="flex">
                <div className="w-[70%]">
                    <PostFormCard />
                    <PostCard/>
                </div>
                <div className="w-[30%]">
                    <AddFriendCard/>
                </div>
            </div>
        </Layout>
    )
}

export default Home