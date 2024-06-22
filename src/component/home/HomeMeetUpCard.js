import React from 'react';
import meetUpImg from '../../asset/img/meeting-img-01.jpg';
import { useNavigate } from 'react-router-dom';

const HomeMeetUpCard = ({ meetUp }) => {
  const navigate = useNavigate();
  const showMeetUpDetail = () => {
    //포스트 디테일 페이지로 가기
    navigate(`/meetUp/${'meetUp._id'}`);
  }

  return (
    <div className='home-meet-up-card' onClick={() => showMeetUpDetail('meetUp._id')}>
      <div className='img'><img src={meetUpImg} alt='' /></div>
      <div className='contents'>
        <div className='title'>Nodejs 스터디 함께 해요</div>
        <div className='schedule green'>서초구 · 오늘 오후 8:00</div>
        <div className='small-text'>홍길동 · 선착순 8/10</div>
      </div>
    </div>
  )
}

export default HomeMeetUpCard