import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import blogService from "../../appwrite/blogService";
import CreatePost from "./CreatePost";

export default function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            const data = await blogService.getPost(id);
            setPost(data);
        };

        loadPost();
    }, [id]);

    if (!post) {
        return <p>Loading...</p>;
    }

    return <CreatePost post={post} />;
}