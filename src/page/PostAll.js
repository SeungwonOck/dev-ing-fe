import '../style/postAll.style.css';
import '../style/switch.style.css';
import React, { useEffect, useState } from 'react';
import PostCard from '../component/PostCard';
import WriteBtn from '../component/WriteBtn';
import ErrorCard from '../component/ErrorCard';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../action/postAction';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';

const PostAll = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ query, setQuery ] = useSearchParams();
  const [ keywordValue, setKeywordValue ] = useState('');
  const { user } = useSelector((state) => state.user);
  const { postList, error } = useSelector((state) => state.post);
  const [ isFollowing, setIsFollowing ] = useState(false);
  
  const [ searchQuery, setSearchQuery ] = useState({
    tag: query.get("tag") || '',
    type: query.get("type") || '',
    keyword: query.get("keyword") || '',
    isFollowing: isFollowing,
  });

  const updateQueryParams = () => {
    const { tag, keyword, type } = searchQuery;
    const queryParams = new URLSearchParams();
    
    if (tag) queryParams.set('tag', tag);
    if (keyword) queryParams.set('keyword', keyword);
    if (type) queryParams.set('type', type);

    navigate(`/post?${queryParams.toString()}`);
  };

  useEffect(() => {
    dispatch(postActions.getPostList({ ...searchQuery, isFollowing: isFollowing }));
    updateQueryParams();
  }, [isFollowing, searchQuery.tag, searchQuery.type, searchQuery.keyword]);

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(prevState => ({
        ...prevState,
        keyword: e.target.value || ''
      }));
      updateQueryParams();
    }
  };

  const getPostListByType = (type) => {
    setSearchQuery(prevState => ({
      ...prevState,
      type: type
    }));
    updateQueryParams();
  };

  return (
    <div className='post-all-container'> 
      
      <div className='following-toggle display-center-center'>
        <div className='small-text'>팔로잉</div>
        <input
          className="react-switch-checkbox"
          id={`view-following`}
          type="checkbox"
          checked={isFollowing}
          onChange={() => setIsFollowing(prev => !prev)}
        />
        <label
          className="react-switch-label"
          htmlFor={`view-following`}
        >
          <span className={`react-switch-button`} />
        </label>
      </div>

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
            <Dropdown.Item onClick={() => getPostListByType('scrap')}>스크랩 순</Dropdown.Item>
            <Dropdown.Item onClick={() => getPostListByType('latest')}>최신 순</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <WriteBtn type='post'/>
      </div>
      {error ? <ErrorCard errorMessage={error}/> : postList?.map((post) => <PostCard key={post._id} post={post}/>)}
    </div>
  )
}

export default PostAll