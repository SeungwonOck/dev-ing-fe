import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import meetingImg from "../asset/img/meeting-img-01.jpg"
import { Col, Row, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';

const ScrapTab = ({uniqueUser, uniqueUserScrap}) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user)
    const [scrapedPost, setScrapedPost] = useState([]);
    const isCurrentUser = user && user._id === uniqueUser._id;

    useEffect(() => {
        if (uniqueUserScrap) {
            const filteredScrap = uniqueUserScrap.filter((post) => 
                isCurrentUser || !post.isPrivate
            );
            setScrapedPost(filteredScrap);
        }
    }, [uniqueUserScrap, isCurrentUser]);

    const handleCardClick = (post) => {
        if (post.isDelete) {
            alert("삭제된 포스트입니다");
        } else {
            navigate(`/post/${post._id}`);
        }
    }


  return (
      <Row>
      {scrapedPost.map((post) => (
          <Col key={post._id} xs={12} sm={6} md={4} lg={4}>
                <Card className="mypagetab-card shadow-sm" onClick={() => handleCardClick(post)}>
                <Card.Img variant="top" src={post.image || meetingImg} alt={post.title} className="card-thumbnail" />
                <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <div className="tags">
                    {post.tags.map((tag, index) => (
                    <Badge key={index} bg="secondary" className="me-1">#{tag}</Badge>
                    ))}
                </div>
                <div className="user-likes mt-2">
                    <span className="me-3">
                        <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} /> {post.likes}
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faComment} /> {post.comments.filter(comment => !comment.isDelete).length}
                    </span>
                </div>
                </Card.Body>
                <Card.Footer className="text-muted">
                생성 날짜: {post.createAt.date} {post.createAt.time}
                </Card.Footer>
            </Card>
          </Col>
      ))}
    </Row>
  )
}

export default ScrapTab
