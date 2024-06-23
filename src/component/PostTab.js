import React from 'react'

const PostTab = ({post}) => {
  return (
    <div className="post-tab">
      <img src={post.image} alt="Random" className="post-image" />
    </div>
  )
}

export default PostTab
