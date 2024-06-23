import '../style/postAll.style.css';
import React, { useEffect, useState } from 'react';
import PostCard from '../component/PostCard';
import WriteBtn from '../component/WriteBtn';
import ErrorCard from '../component/ErrorCard';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../action/postAction';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
// import { useInView } from 'react-intersection-observer';

const PostAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ query, setQuery ] = useSearchParams();
  const [ keywordValue, setKeywordValue ] = useState('');
  const { postList, error } = useSelector((state) => state.post);
  const [ searchQuery, setSearchQuery ] = useState({
    tag: query.get("tag") || '',
    type: query.get("type") || '',
  });
  // const [ ref, inView ] = useInView();

  useEffect(() => {
    dispatch(postActions.getPostList({ ...searchQuery }))
  },[searchQuery])

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      if (e.target.value === '') {
        setSearchQuery({ ...searchQuery, keyword: '' })
        return navigate('/post');
      }
      setSearchQuery({ ...searchQuery, keyword: keywordValue })
      const { tag, keyword } = searchQuery;
      let queryParams = '';
      
      if (tag !== '') {
        queryParams += `tag=${tag}&`;
      }
      queryParams += `keyword=${e.target.value}`;

      navigate(`/post?${queryParams}`);
    }
  };

  const getPostListByType = (type) => {
    setSearchQuery({ ...searchQuery, type: type })
    const { tag, keyword } = searchQuery;
    let queryParams = '';
      
    if (tag !== '') {
      queryParams += `tag=${tag || ''}&`;
    }
    if (keyword !== '') {
      queryParams += `keyword=${keyword || ''}`;
    }

    navigate(`/post?${queryParams}&type=${type}`);
  }

  // useEffect(()=>{
  //   console.log(inView, '무한 스크롤 요청 🎃')
  // },[inView])

  return (
    <div> 
      
      <div className='contents-header-btns'>
        <input 
          type='text' 
          placeholder='검색어를 입력하세요' 
          className='form-control search-input'
          value={keywordValue}
          onKeyUp={(e) => onCheckEnter(e)}
          onChange={(e) => setKeywordValue(e.target.value)}
        />
        
        <Dropdown>
          <Dropdown.Toggle>
            정렬
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => getPostListByType('popularity')}>좋아요 순</Dropdown.Item>
            <Dropdown.Item onClick={() => getPostListByType('comments')}>댓글 순</Dropdown.Item>
            {/* <Dropdown.Item onClick={() => getPostListByType('views')}>조회순</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
        <WriteBtn type='post'/>
      </div>
      {error ? <ErrorCard errorMessage={error}/> : postList && postList.map((post) => <PostCard key={post._id} post={post}/>)}
      {/* <div ref={ref}>Hi</div> */}
    </div>
  )
}

export default PostAll