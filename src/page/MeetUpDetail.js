import React from 'react';
import "../style/meetUpDetail.style.css";
import "../style/common.style.css";
import { Row, Col, Button } from 'react-bootstrap';

const MeetUpDetail = () => {
  return (
    <div>
      <div className='meetup-detail-container'>
        <div className='title'>노드 js 스터디 모집</div>
        <div className='meetup-info'>
          <div className='date'>2024.06.21</div>
          <div className='author'>
            <span className='img'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKPLmUQUTiNrAPO2BP9eLjv_iX3T8XAhNRw&usqp=CAU" alt='' /></span>
            <span className='user-name'>홍길동</span>
          </div>
        </div>
        <Row>
          <Col md={6}>
            <div>카테고리 : 기타 스터디</div>
            <div>모집인원 : 1/4</div>
          </Col>
          <Col md={6}>
            <div>시작 예정 : 2024/06/22 10:00</div>
            <div>장소 : 우주시 화성구 지구로 한국리</div>
          </Col>
        </Row>

        <div className='content'>
          저희 스터디는 1주일에 1번씩 만나서 공부해요!
        </div>

        <button className='white-btn'>참여하기</button>
      </div>
    </div>
  )
}

export default MeetUpDetail