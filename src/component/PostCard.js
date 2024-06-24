import React, { useEffect, useState } from 'react';
import '../style/postCard.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from 'react-router-dom';
import noImg from '../asset/img/no-image.png';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../action/postAction';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ isUserLikedPost, setIsUserLikedPost ] = useState(false);
  const { user } = useSelector((state) => state.user);
  
  useEffect(()=>{
    if(post.userLikes.includes(user._id)) {
      setIsUserLikedPost(true)
    } else {
      setIsUserLikedPost(false)
    }
  },[post, user])

  const addLike = (id) => {
    dispatch(postActions.addLike(id))
  }

  const deleteLike = (id) => {
    console.log('좋아요 취소')
    // dispatch(postActions.deleteLike(id))
  }

  const showPostDetail = () => {
    //포스트 디테일 페이지로 가기
    navigate(`/post/${post._id}`);
  }
  return (
    <div className='post-card'>
      <div className='like'>
        <span>{isUserLikedPost ? 
              <FontAwesomeIcon icon={fullHeart} className='coral' onClick={() => deleteLike(post._id)}/> : 
              <FontAwesomeIcon icon={emptyHeart} className='coral' onClick={() => addLike(post._id)}/>}
        </span>
        <span>좋아요 <span className='coral'>{post.likes}</span></span>
        <span>댓글 <span className='green'>{post.commentCount}</span></span>
        <span>스크랩 <span className='blue'>{post.scrapCount}</span></span>
      </div>
      <div className='contents' onClick={() => showPostDetail(post._id)}>
        <div className='info'>
          <div className='title'>
            <p>{post.title}</p>
          </div>
          <div className='content'>
            <p>{post.content}</p>
          </div>
          <div className='author'>
            <span className='img'><img src={post.author.profileImage} alt=''/></span>
            <span className='user-name'>{post.author.nickName}</span>
            <span className='date small-text'>{post.createAt}</span>
          </div>
        </div>
        <div className='thumbnail'>
          <img src={post.image || noImg} alt=''/>
        </div>
      </div>
    </div>
  )
}

export default PostCard