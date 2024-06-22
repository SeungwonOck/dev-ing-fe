import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import "../style/meetUpWrite.style.css";

const MeetUpWrite = () => {
  const { user } = useSelector((state) => state.user);

  const addMeeting = (event) => {
    event.preventDefault();

    console.log("모임 등록!");
  }

  return (
    <Container className='meetup-container'>
      <div className='title'>모임 등록</div>
      <Form className="meetup-form" onSubmit={addMeeting}>
        <Row className="user-info">
          <Col className="user-info-img" md={2} xs={2}>
            <img src={user.profileImage} />
          </Col>
          <Col md={10} xs={10}>
            <div className="user-info-name">{user.userName}</div>
            <div className="user-info-des">{user.description}</div>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formMeetTitle">
          <Form.Label className="form-label">모임 이름</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="모임 이름을 입력해주세요"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetContent">
          <Form.Label className="form-label">내용</Form.Label>
          <Form.Control
            className="form-input"
            as="textarea"
            type="text"
            rows={3}
            placeholder="모임 내용을 입력해주세요
            ex)1주일 1번 노드JS 스터디 함께 해요!"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetImage">
          <Form.Label className="form-label">이미지 업로드</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="이미지 업로드"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetCategory">
          <Form.Label className="form-label">카테고리</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="이메일을 입력해주세요"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetDate">
          <Form.Label className="form-label">날짜</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="날짜 입력해주세요"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetCity">
          <Form.Label className="form-label">위치</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            placeholder="위치를 입력해주세요"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetMaxNum">
          <Form.Label className="form-label">모집 인원</Form.Label>
          <Form.Control
            className="form-input-maxnum"
            type="text"
            placeholder="모집 인원 수를 입력해주세요"
            required
          />
        </Form.Group>

        <Button className="ok-button" type="submit">등록</Button>
      </Form>
    </Container>
  )
}

export default MeetUpWrite