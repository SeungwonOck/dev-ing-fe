import React from 'react'
import { Card, Badge } from 'react-bootstrap'
import "../style/adminPostCard.style.css"
import noImage from "../asset/img/no-image.png"
import { useNavigate } from 'react-router-dom'

const AdminPostCard = ({ post }) => {
    const navigate = useNavigate();
    const truncatedContent = post.content.length > 10 ? `${post.content.slice(0, 10)}...` : post.content;
    const postImage = post.image || noImage;

  return (
      <Card className="admin-post-card shadow-sm" onClick={() => { navigate(`/post/${post._id}`) }}>
      <Card.Img variant="top" src={postImage} alt={post.title} className="card-thumbnail" />
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">by {post.author.userName}</Card.Subtitle>
        <Card.Text>{truncatedContent}</Card.Text>
        <div className="tags">
          {post.tags.map((tag, index) => (
            <Badge key={index} bg="secondary" className="me-1">#{tag}</Badge>
          ))}
        </div>
        <div className="user-likes mt-2">
          <span>
            {post.likes} 명이 좋아함
          </span>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        생성 날짜: {post.createAt.date} {post.createAt.time}
      </Card.Footer>
    </Card>
  )
}

export default AdminPostCard
