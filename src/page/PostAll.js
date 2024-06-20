import React, { useEffect } from 'react';
import PostCard from '../component/PostCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import '../style/postAll.style.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../action/postAction';

const PostAll = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postList } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(postActions.getPostList())
  },[])
  
  return (
    <div>
      <div className='post-btns'>
        <div className='new-post-btn white-btn' onClick={() => navigate('/post/write')}><FontAwesomeIcon icon={faPencil}/> 글쓰기</div>
      </div>
      {postList && postList.map((post) => <PostCard key={post._id} post={post}/>)}
    </div>
  )
}

export default PostAll