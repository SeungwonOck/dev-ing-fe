import React, { useEffect, useState } from 'react';
import "../style/meetUpDetail.style.css";
import { Row, Col, Accordion, Modal, Button } from 'react-bootstrap';
import MeetUpMemberProfile from '../component/MeetUpMemberProfile';
import Map from '../component/Map';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { meetUpActions } from '../action/meetUpAction';
import ClipLoader from 'react-spinners/ClipLoader';

const MeetUpDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { selectedMeetUp, loading } = useSelector((state) => state.meetUp);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    dispatch(meetUpActions.getMeetUpDetail(id));
  }, [id, dispatch]);

  const joinMeetUp = () => {
    if (window.confirm("참여하시겠습니까?")) {
      dispatch(meetUpActions.joinMeetUp(id, navigate));
      console.log("스터디 참여!");
    }
  }

  const updateMeetUp = () => {
    navigate(`/meetUp/write?type=edit&id=${id}`);
  }

  const deleteMeetUp = () => {
    dispatch(meetUpActions.deleteMeetUp(id, navigate));
  }

  if (loading) {
    return (
      <div className='loading' >
        <ClipLoader color="#28A745" loading={loading} size={100} />
      </div>);
  }

  return (
    <>
      <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)} dialogClassName='modal-dialog-centered' size='sm'>
        <Modal.Header closeButton>
          <h5 className="modal-title">모임 삭제</h5>
        </Modal.Header>
        <Modal.Body>
          정말 삭제하시겠습니까?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setIsDeleteModalOpen(false)}>
            취소
          </Button>
          <Button variant="danger" onClick={deleteMeetUp}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        {
          (user?.nickName === selectedMeetUp?.organizer.nickName) ?
            (
              <div className='meetup-my-detail-container'>
                <div onClick={updateMeetUp}>수정</div>
                <div onClick={() => { setIsDeleteModalOpen(true) }}>삭제</div>
              </div>
            )
            :
            (<></>)
        }

        <div className='meetup-detail-container'>
          <div className='title'>{selectedMeetUp?.title}</div>
          <div className='meetup-user'>
            <div className='date'>{selectedMeetUp?.createAt.date}</div>
            <div className='author'>
              <span className='img'><img src={selectedMeetUp?.organizer.profileImage} alt='' /></span>
              <span className='user-name'>{selectedMeetUp?.organizer.nickName}</span>
            </div>
          </div>

          <div className='content'>
            <div className='content-title'>소개</div>
            {selectedMeetUp?.description}
          </div>

          <div className='meetup-info'>
            <div><span className='meetup-info-title'>카테고리 : </span>{selectedMeetUp?.category}</div>
            <Row>
              <Col md={2}>
                <span className='meetup-info-title'>모집 인원 : </span>{selectedMeetUp?.currentParticipants}/{selectedMeetUp?.maxParticipants}</Col>
              <Col md={3}>
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>멤버 보기({selectedMeetUp?.currentParticipants})</Accordion.Header>
                    <Accordion.Body>
                      {selectedMeetUp?.participants.map((participant, index) => (
                        <MeetUpMemberProfile key={index} participant={participant} />
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
            <div><span className='meetup-info-title'>시작 예정 : </span>{selectedMeetUp?.date.date} {selectedMeetUp?.date.time}</div>
            <div><span className='meetup-info-title'>장소 : </span>{selectedMeetUp?.location === "online" ? (<span>온라인</span>) : selectedMeetUp?.location}</div>
            <div>{selectedMeetUp?.location === "online" ? (<></>) : (<Map location={selectedMeetUp?.location} />)}</div>
            <div style={{ marginTop: "30px" }}></div>
            <div className='meetup-info-title'>관련 이미지</div>
            <img className="meetup-img" src={selectedMeetUp?.image} />
          </div>

          {user._id === selectedMeetUp?.organizer._id ?
            (<></>)
            :
            (
              <div className='meetup-btn-container'>
                <button className='white-btn' onClick={joinMeetUp}>참여하기</button>
              </div>
            )
          }


        </div>
      </div>

    </>
  )
}

export default MeetUpDetail