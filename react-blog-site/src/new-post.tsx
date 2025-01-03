import React, { useState } from "react";
import { BASE_URL } from "./App";

const NewPost: React.FC = () => {

    const [image, setImage] = useState<File | null>(null);
    const [creator, setCreator] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault()

        if (!image) {
            alert("Please upload an image before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        const requestOptions = {
            method: 'POST',
            body: formData
        }

        fetch(BASE_URL + 'post/image', requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data => {
            createPost(data.filename)
        })
        .catch(error => {
            console.log(error)
        })
        .finally(() => {
            setImage(null);
            (document.getElementById('file-input') as HTMLInputElement).value = '';
        })
    }

    const createPost = (imageUrl: string) => {
        const json_string = JSON.stringify({
            'image_url': imageUrl,
            'title': title,
            'creator': creator,
            'content': text
        })

        const requestOption = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: json_string
        }

        fetch(BASE_URL + 'post', requestOption)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(() => {
            window.location.reload()
            window.scrollTo(0, 0)
        })
        .catch(error => {
            console.log(error)
        })
    }
    

    return (
        <div className="new-post-container">
           <div className="new-post-image">
                <input type="file" id="file-input" onChange={handleImageUpload} />
           </div>
           <div className="new-post-creator">
                <input className="new-post-creator" type="text" id="creator-input" placeholder="Creator..." onChange={(event) => setCreator(event.target.value)} value={creator} />
           </div>
           <div className="new-post-title">
                <input className="new-post-title" type="text" id="title-input" placeholder="Title..." onChange={(event) => setTitle(event.target.value)} value={title} />
           </div>
           <div className="new-post-text">
                <textarea className="new-post-text" rows={10} id="text-input" placeholder="Text..." onChange={(event) => setText(event.target.value)} value={text} />
           </div>
           <div className="">
                <button className="btn" onClick={handleCreate}>Create</button>
           </div>
        </div>
    );
}


export default NewPost;