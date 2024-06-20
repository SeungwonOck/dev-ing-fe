import React, { useEffect, useState } from 'react';
import '../style/account.style.css';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../action/userAction';
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";

const initialFormData = {
  userName: '',
  email: '',
  originalPassword: '',
  newPassword: '',
  profileImage: '',
  specs: '',
};

const AccountPage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [ userFormData, setUserFormData ] = useState({...initialFormData });
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!user) {
      navigate('/login')
    } else {
      setUserFormData({ ...initialFormData, userName:user.userName, email:user.email, specs:user.specs, profileImage:user.profileImage })
    }
  },[user])

  const uploadedimage = (url) => {
      setUserFormData({ ...userFormData, profileImage: url })
  }

  useEffect(()=>{
    console.log(userFormData)
  },[userFormData])

  const updateUserInfo = async (e) => {
    e.preventDefault();
    dispatch(userActions.updateUser(userFormData));
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserFormData({ ...userFormData, [id]: value });
  }

  return (
    <div className='account-container'>
      <div className='title'>내 계정 정보</div>

      <Form onSubmit={updateUserInfo} encType='multipart/form-data' method='put'>
            <Form.Group className="mb-3 profile-img display-center-center gap-10" controlId="profileImage">
                <div className='img'>
                  <img id="uploadedimage" src={userFormData.profileImage} alt="uploadedimage"/>
                </div>
                {/* <Form.Label className='white-btn small-btn'>
                  프로필 사진 변경
                  <Form.Control
                    className='display-none'
                    type="file"
                    onChange={handleProfileImg}
                  />
                </Form.Label> */}
                <CloudinaryUploadWidget uploadImage={uploadedimage} />
            </Form.Group>

            <div className='fixed-info'>
              <div className='left'>
                <div><strong>가입일자: </strong>{user?.createAt.date}</div>
                <div><strong>성별: </strong>{user?.gender}</div>
                <div className='rank'><strong>Rank</strong><span></span></div>
              </div>
              <div className='right'>
                <strong>specs</strong>
                <div className='specs'>
                  <div>
                    <div className='white-btn small-btn'>React</div>
                    <div className='white-btn small-btn'>Nodejs</div>
                    <div className='white-btn small-btn'>Html</div>
                    <div className='white-btn small-btn'>Css</div>
                  </div>
                </div>
              </div>
            </div>

            <Form.Group controlId="userName">
              <Row>
                <Col md={2}>
                  <Form.Label>이름</Form.Label>
                </Col>
                <Col md={10}>
                  <Form.Control
                    type="text"
                    placeholder="이름을 입력해주세요"
                    required
                    value={userFormData.userName}
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="email">
              <Row>
                <Col md={2}>
                  <Form.Label>이메일</Form.Label>
                </Col>
                <Col md={10}>
                  <Form.Control
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    required
                    value={userFormData.email}
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId='originalPassword'>
              <Row>
                <Col md={2}>
                  <Form.Label>기존 비밀번호</Form.Label>
                </Col>
                <Col md={10}>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={userFormData.originalPassword}
                    required
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId='newPassword'>
              <Row>
                <Col md={2}>
                  <Form.Label>새 비밀번호</Form.Label>
                </Col>
                <Col md={10}>
                  <Form.Control
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    value={userFormData.newPassword}
                    onChange={(e) => handleChange(e)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <div className="submit">
              <button className='green-btn' type="submit">
                정보 수정
              </button>
            </div>
          </Form>
    </div>
  )
}

export default AccountPage