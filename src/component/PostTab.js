import React from 'react'
import { useNavigate } from 'react-router-dom'

const PostTab = ({ post }) => {
    const navigate = useNavigate();
  return (
    <div className="post-tab" onClick={() => { navigate(`/post/${post._id}`) }}>
      <img src={post.image} alt="Random" className="post-image" />
    </div>
  )
}

export default PostTab
