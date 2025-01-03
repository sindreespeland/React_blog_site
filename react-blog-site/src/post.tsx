import React, { useState, useEffect } from "react";
import { BASE_URL, PostType } from "./App";

type PostProps = {
    post: PostType
}

const Post: React.FC<PostProps> = ({post}) => {

    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        setImageUrl(BASE_URL + post.image_url)
    }, [])

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault()

        const requestOptions = {
            method: 'DELETE'
        }

        fetch(BASE_URL + 'post/' + post.id, requestOptions)
        .then(response => {
            if (response.ok) {
                window.location.reload()
            }
            throw response
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="post-container">
            <img className="post-image" src={imageUrl} alt="city" />
            <div className="post-content">
                <p className="post-title">{post.title}</p>
                <p className="post-creator">by {post.creator}</p>
                <p className="post-text">{post.content}</p>
                <div className="post-delete">
                    <button onClick={handleDelete} className="">Delete post</button>
                </div>
            </div>
        </div>
    );
}


export default Post;