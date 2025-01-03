import { useEffect, useState } from 'react'
import './App.css'
import Post from './post';
import NewPost from './new-post';

export const BASE_URL = 'http://localhost:8000/';

export type PostType = {
  id?: number
  image_url?: string;
  title?: string;
  content?: string;
  creator?: string;
  timestamp?: string;
}

function App() {

  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    fetch(BASE_URL + "post/all")
    .then(response => {
      const json = response.json()
      console.log(json);
      if (response.ok) {
        return json
      }
      throw response
    })
    .then(data => {
      return data.reverse()
    })
    .then(data => {
      setPosts(data)
    })
    .catch(error => {
      console.log(error);
      alert(error);
    })
  }, [])

  return (
    <div className="app">
      <h1 className='app-title'>Open city blog</h1>

      <div className="blog-content">
        {posts.map(post => (
          <Post post={post} />
        ))}
      </div>

      <div className="new-post">
        <NewPost />
      </div>
    </div>
  )
}

export default App
