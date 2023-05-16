import Layout from "../../components/Layout"
import PostFormCard from "../../components/PostFormCard"
import PostCard from "../../components/PostCard"

function Home() {
    return (
        <Layout>
            <PostFormCard />
            <PostCard/>
        </Layout>
    )
}

export default Home