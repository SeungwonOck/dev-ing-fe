import React from 'react';
import "../style/meetUpDetail.style.css";
import { Row, Col, Accordion } from 'react-bootstrap';
import MeetUpMemberProfile from '../component/MeetUpMemberProfile';
import Map from '../component/Map';

const MeetUpDetail = () => {

  const joinMeetUp = () => {
    if (window.confirm("참여하시겠습니까?"))
      console.log("스터디 참여!");
  }

  return (
    <div>
      <div className='meetup-detail-container'>
        <div className='title'>노드 js 스터디 모집</div>
        <div className='meetup-user'>
          <div className='date'>2024.06.21</div>
          <div className='author'>
            <span className='img'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKPLmUQUTiNrAPO2BP9eLjv_iX3T8XAhNRw&usqp=CAU" alt='' /></span>
            <span className='user-name'>홍길동</span>
          </div>
        </div>

        <div className='meetup-info'>
          <Row>
            <Col md={4}>
              <img className="meetup-img" src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </Col>
            <Col md={4}>
              <div><span className='meetup-info-title'>카테고리 : </span>기타 스터디</div>
              <div><span className='meetup-info-title'>모집 인원 : </span>2/4</div>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>멤버 보기(2)</Accordion.Header>
                  <Accordion.Body>
                    <MeetUpMemberProfile />
                    <MeetUpMemberProfile />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

            </Col>
            <Col md={4}>
              <div><span className='meetup-info-title'>시작 예정 : </span>2024/06/22 10:00</div>
              <div><span className='meetup-info-title'>장소 : </span>경기도 성남시 분당구 판교역로 166</div>
              <Map />
            </Col>
          </Row>
        </div>

        <div className='content'>
          <div className='content-title'>모임 소개</div>
          저희 스터디는 1주일에 1번씩 만나서 공부해요!
        </div>

        <div className='meetup-btn-container'>
          <button className='white-btn' onClick={joinMeetUp}>참여하기</button>
        </div>

      </div>
    </div>
  )
}

export default MeetUpDetail