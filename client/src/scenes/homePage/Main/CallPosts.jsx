import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../../redux/store";
import { useEffect } from "react";
import Post from "./Post";


const refreshPosts = async (dispatch, token) => {

    const response = await fetch(`http://localhost:8080/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    const posts = await response.json()

    dispatch(setPosts({ posts }))
}

const CallPosts = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const posts = useSelector(state => state.posts);

    useEffect(() => {
        refreshPosts(dispatch, token)
    }, [dispatch, token])

    const allPost = posts.map(post => {

        return (
            <Post
                key={post._id}
                fullName={`${post.lastName} ${post.firstName}`}
                userPicturePath={post.userPicturePath}
                createdAt={post.createdAt}
                description={post.description}
                imagePath={post.picturePath}
                likes={post.likes}
                postId={post._id}
            />
        )
    })

    return(
        <div>
            {allPost}
        </div>
    )
}

export default CallPosts