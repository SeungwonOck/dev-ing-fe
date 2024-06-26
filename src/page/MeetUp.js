import React, { useEffect, useState } from 'react'
import WriteBtn from '../component/WriteBtn'
import MeetUpCard from '../component/MeetUpCard'
import '../style/meetUp.style.css'
import '../style/switch.style.css';
import { useDispatch, useSelector } from 'react-redux'
import { meetUpActions } from '../action/meetUpAction'
import ErrorCard from "../component/ErrorCard"
import { Dropdown } from 'react-bootstrap';

const MeetUp = () => {
  const dispatch = useDispatch();
  const { meetUpList, loading, error } = useSelector((state) => state.meetUp);
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    dispatch(meetUpActions.getMeetUpList());
  }, [])

  if (meetUpList.length === 0) {
    return (
      <ErrorCard errorMessage={"현재 모집 중인 모임이 없습니다."} />
    );
  }

  return (
    <div className='meetup-all-container'>
      <div className='contents-header-btns'>
        <input
          type='text'
          placeholder='검색어를 입력하세요'
          className='form-control search-input'
        // value={keywordValue}
        // onKeyUp={(e) => onCheckEnter(e)}
        // onChange={(e) => setKeywordValue(e.target.value)}
        />

        <Dropdown>
          <Dropdown.Toggle className="green-btn">
            정렬
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>최신 순</Dropdown.Item>
            <Dropdown.Item>마감임박 순</Dropdown.Item>
            {/* <Dropdown.Item onClick={() => getPostListByType('popularity')}>좋아요 순</Dropdown.Item>
            <Dropdown.Item onClick={() => getPostListByType('comments')}>댓글 순</Dropdown.Item>
            <Dropdown.Item onClick={() => getPostListByType('scrap')}>스크랩 순</Dropdown.Item>
            <Dropdown.Item onClick={() => getPostListByType('latest')}>최신 순</Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
        <WriteBtn type='meetUp' />
      </div>

      <div className='following-toggle display-center-center'>
        <div className='small-text'>모집중</div>
        <input
          className="react-switch-checkbox"
          id={`view-following`}
          type="checkbox"
          checked={showFinish}
          onChange={() => setShowFinish(prev => !prev)}
        />
        <label
          className="react-switch-label"
          htmlFor={`view-following`}
        >
          <span className={`react-switch-button`} />
        </label>
      </div>

      <div className='meet-up-container'>
        {meetUpList &&
          meetUpList.map((meetUp) => <MeetUpCard key={meetUp._id} meetUp={meetUp} />)}
      </div>
    </div>
  )
}

export default MeetUp