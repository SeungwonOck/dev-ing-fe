import React, { useEffect } from 'react';
import PostCard from '../component/PostCard';
import '../style/postAll.style.css';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../action/postAction';
import { useSearchParams } from "react-router-dom";
import WriteBtn from '../component/WriteBtn';

const PostAll = () => {
  const dispatch = useDispatch();
  const [ query, setQuery ] = useSearchParams();
  const { postList } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(postActions.getPostList({ tag: query.get("tag")}))
  },[query])
  
  return (
    <div>
      
      <div className='contents-header-btns'>
        <WriteBtn type='post'/>
      </div>
      
      {postList && postList.map((post) => <PostCard key={post._id} post={post}/>)}
    </div>
  )
}

export default PostAll