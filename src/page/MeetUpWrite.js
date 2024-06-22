import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap';
import "../style/meetUpWrite.style.css";
import "../style/common.style.css";
import CloudinaryUploadWidget from '../utils/CloudinaryUploadWidget';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const initialFormData = {
  title: '',
  description: '',
  date: '',
  category: '',
  image: '',
  maxParticipants: 1,
  location: ''
};

const MeetUpWrite = () => {
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ ...initialFormData });
  const [imageUrl, setImageUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isOffline, setIsOffline] = useState(false);
  const open = useDaumPostcodePopup();

  const addMeeting = (event) => {
    event.preventDefault();

    if (address === "online") {
      setFormData({ ...formData, location: "online" });
    }
    else {
      setFormData({ ...formData, location: address + ", " + detailAddress });
    }
    console.log(format(selectedDate, "yyyy-MM-dd'T'"));
    console.log(format(selectedTime, 'HH:mm:ss'));
    console.log("formData", formData);
    console.log("모임 등록!");
  }

  const uploadedimage = (url) => {
    setFormData({ ...formData, image: url });
  }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
    let newDate = format(selectedDate, "yyyy-MM-dd'T'") + format(selectedTime, 'HH:mm:ss');
    setFormData({
      ...formData,
      date: newDate,
    });
  }

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    let newDate = format(selectedDate, "yyyy-MM-dd'T'") + format(selectedTime, 'HH:mm:ss');
    setFormData({
      ...formData,
      date: newDate,
    });
  }

  const handleComplete = (data) => {
    setIsOffline(true);

    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    // console.log(data); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    setZipCode(data.zonecode);
    setAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const clickOnline = () => {
    setIsOffline(false);
    setAddress("online");
    setDetailAddress("");
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
            id="title"
            className="form-input"
            type="text"
            placeholder="모임 이름을 입력해주세요"
            onChange={(event) => handleChange(event)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetContent">
          <Form.Label className="form-label">내용</Form.Label>
          <Form.Control
            id='description'
            className="form-input"
            as="textarea"
            type="text"
            rows={3}
            placeholder="모임 내용을 입력해주세요
            ex)1주일 1번 노드JS 스터디 함께 해요!"
            onChange={(event) => handleChange(event)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetImage">
          <Form.Label className="form-label">대표 이미지 업로드</Form.Label>
          <div className='meetup-thumbnail'>
            <img id="uploadedimage" src={imageUrl || "https://cdn-icons-png.flaticon.com/128/1829/1829586.png"} alt="uploadedimage" />
            {" "}<CloudinaryUploadWidget uploadImage={uploadedimage} />
          </div>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetCategory">
          <Form.Label className="form-label">카테고리</Form.Label>
          <Form.Select
            id="category"
            value={formData?.category || ""}
            onChange={(event) => handleChange(event)}
            required
          >
            <option value="" disabled selected hidden>카테고리 선택</option>
            <option value="독서">독서</option>
            <option value="강의">강의</option>
            <option value="프로젝트">프로젝트</option>
            <option value="기타 스터디">기타 스터디</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetDate">
          <Form.Label className="form-label">날짜</Form.Label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            placeholderText='날짜를 선택해주세요'
            required
          />
          {selectedDate &&
            (<div>선택된 날짜 : {selectedDate.toLocaleDateString()}</div>)}
          <div></div>
          <Form.Label className="form-label">시간</Form.Label>
          <DatePicker
            selected={selectedTime}
            onChange={handleTimeChange}
            dateFormat="HH:mm"
            showTimeSelect
            showTimeSelectOnly
            placeholderText='시간을 선택해주세요'
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetCity">
          <Form.Label className="form-label">위치</Form.Label>
          <div>
            <Button className='white-btn' onClick={handleClick}>오프라인</Button>
            <Button className='white-btn' onClick={clickOnline}>온라인</Button>
            <div>내 선택 : {isOffline ? (<span>오프라인</span>) : (<span>온라인</span>)}</div>
          </div>
          {
            isOffline &&
            (
              <>
                <Form.Control
                  className="form-input-disabled"
                  type="text"
                  placeholder="우편번호"
                  value={zipcode}
                  disabled
                />
                <Form.Control
                  className="form-input-disabled"
                  type="text"
                  placeholder="기본 주소"
                  value={address}
                  disabled
                />
                <Form.Control
                  value={detailAddress}
                  className="form-input"
                  type="text"
                  placeholder="상세 주소"
                  onChange={(event) => setDetailAddress(event.target.value)}
                  required
                />
              </>
            )
          }
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMeetMaxNum">
          <Form.Label className="form-label">모집 인원</Form.Label>
          <Form.Control
            id="maxParticipants"
            type="number"
            placeholder="인원 수"
            className="form-input"
            min={1}
            max={10}
            onChange={(event) => handleChange(event)}
          />
        </Form.Group>

        <Button className="green-btn" type="submit">등록</Button>
      </Form>
    </Container >
  )
}

export default MeetUpWrite