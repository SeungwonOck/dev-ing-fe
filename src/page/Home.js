import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeMeetUpCard from '../component/home/HomeMeetUpCard';
import HomePostCard from '../component/home/HomePostCard';
import HomeQnaCard from '../component/home/HomeQnaCard';
import '../style/home.style.css';
import { postActions } from '../action/postAction';

const Home = () => {
  const dispatch = useDispatch();
  const { postList } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(postActions.getPostList())
  },[])
  return (
    <div className='home'>
        <div className='main-title'>
            <div>Our</div>
            <div className='italic'>Creative, Passionate, Inquisitive</div>
            <div>Coding Story.</div>
        </div>
        <h5 className='sub-title'>데빙에서 개발자들의 다양한 이야기들을 만나보세요.</h5>
        <div className='post-container'>{postList && postList.map((post)=><HomePostCard key={post._id} post={post}/>)}</div>
        <div className='meet-up-container'><HomeMeetUpCard/><HomeMeetUpCard/><HomeMeetUpCard/><HomeMeetUpCard/></div>
        <div className='qna-container'><HomeQnaCard/><HomeQnaCard/><HomeQnaCard/></div>
    </div>
  )
}

export default Home