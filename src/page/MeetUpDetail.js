import React, { useEffect } from 'react';
import "../style/meetUpDetail.style.css";
import { Row, Col, Accordion } from 'react-bootstrap';
import MeetUpMemberProfile from '../component/MeetUpMemberProfile';
import Map from '../component/Map';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { meetUpActions } from '../action/meetUpAction';
import ClipLoader from 'react-spinners/ClipLoader';

const MeetUpDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedMeetUp, loading } = useSelector((state) => state.meetUp);

  useEffect(() => {
    dispatch(meetUpActions.getMeetUpDetail(id));
  }, [id, dispatch]);

  const joinMeetUp = () => {
    if (window.confirm("참여하시겠습니까?"))
      console.log("스터디 참여!");

    if (loading) {
      return (
        <div className='loading' >
          <ClipLoader color="#28A745" loading={loading} size={100} />
        </div>);
    }
  }

  return (
    <div>
      <div className='meetup-detail-container'>
        <div className='title'>{selectedMeetUp?.title}</div>
        <div className='meetup-user'>
          <div className='date'>{selectedMeetUp?.createAt.date}</div>
          <div className='author'>
            <span className='img'><img src={selectedMeetUp?.organizer.profileImage} alt='' /></span>
            <span className='user-name'>{selectedMeetUp?.organizer.nickName}</span>
          </div>
        </div>

        <div className='meetup-info'>
          <Row>
            <Col md={4}>
              <img className="meetup-img" src={selectedMeetUp?.image} />
            </Col>
            <Col md={4}>
              <div><span className='meetup-info-title'>카테고리 : </span>{selectedMeetUp?.category}</div>
              <div><span className='meetup-info-title'>모집 인원 : </span>{selectedMeetUp?.currentParticipants}/{selectedMeetUp?.maxParticipants}</div>
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
              <div><span className='meetup-info-title'>시작 예정 : </span>{selectedMeetUp?.date.date} {selectedMeetUp?.date.time}</div>
              <div><span className='meetup-info-title'>장소 : </span>{selectedMeetUp?.location === "online" ? (<span>온라인</span>) : selectedMeetUp?.location}</div>
              {selectedMeetUp?.location === "online" ? (<></>) : (<Map location={selectedMeetUp?.location} />)}
            </Col>
          </Row>
        </div>

        <div className='content'>
          <div className='content-title'>모임 소개</div>
          {selectedMeetUp?.description}
        </div>

        <div className='meetup-btn-container'>
          <button className='white-btn' onClick={joinMeetUp}>참여하기</button>
        </div>

      </div>
    </div>

  )
}

export default MeetUpDetail