import React from 'react';
import PostCard from '../component/PostCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import '../style/postAll.style.css';
import { useNavigate } from 'react-router-dom';

const PostAll = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className='post-btns'>
        <div className='new-post-btn white-btn' onClick={() => navigate('/post/write')}><FontAwesomeIcon icon={faPencil}/> 글쓰기</div>
      </div>
      <PostCard/>
      <PostCard/>
      <PostCard/>
    </div>
  )
}

export default PostAll