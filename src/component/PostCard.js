import React from 'react';
import '../style/postCard.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const showPostDetail = () => {
    //포스트 디테일 페이지로 가기
    navigate(`/post/${post._id}`);
  }
  return (
    <div className='post-card' onClick={() => showPostDetail(post._id)}>
      <div className='like'>
        <span><FontAwesomeIcon icon={faHeart} className='coral'/></span>
        <span>좋아요 <span className='coral'>{post.likes}</span></span>
      </div>
      <div className='info'>
        <div className='title'>
          <p>{post.title}</p>
        </div>
        <div className='contents'>
          <p>{post.content}</p>
        </div>
        <div className='author'>
          <span className='img'><img src={post.author.profileImage} alt=''/></span>
          <span className='user-page-name'>코딩 스토리</span>
          <span className='user-name'>by {post.author.userName}</span>
        </div>
      </div>
      <div className='thumbnail'>
        <img src={post.image} alt=''/>
      </div>
    </div>
  )
}

export default PostCard