import React from 'react'
import { useNavigate } from 'react-router-dom'
import meetingImg from "../asset/img/meeting-img-03.jpg"

const PostTab = ({ post }) => {
    const navigate = useNavigate();
    const image = post.image || meetingImg
  return (
    <div className="post-tab" onClick={() => { navigate(`/post/${post._id}`) }}>
      <img src={image} alt="Random" className="post-image" />
    </div>
  )
}

export default PostTab
