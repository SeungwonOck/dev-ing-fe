import React, { useEffect, useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postActions } from '../action/postAction';
import '../style/write.style.css';
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";

const initialFormData = {
  title: '',
  content: '',
  image: '',
  tags: ''
};


const PostWrite = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [ formData, setFormData ] = useState({...initialFormData });
  
  useEffect(()=>{
    if(!user) {
      navigate('/login')
    } 
  },[user])

  const createPost = async (e) => {
    e.preventDefault();
    dispatch(postActions.createPost(formData, navigate));
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const uploadedimage = (url) => {
    setFormData({ ...formData, image: url })
  }


  return (
    <div>

        <Form onSubmit={createPost} className='write-form'>
          <Form.Group controlId="title" className='write-title'>
            <Form.Control
              type="text"
              placeholder="제목을 입력해주세요"
              required
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="content" className='write-content'>
            <Form.Control
              as="textarea"
              style={{ height: '500px' }}
              placeholder="내용을 입력해주세요"
              required
              value={formData.content}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="tags" className='write-tag'>
            <Form.Control
              type="text"
              placeholder="태그를 입력해주세요"
              required
              value={formData.tags}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-3 profile-img display-center-center gap-10" controlId="profileImage">
              <div className='img'>
                <img id="uploadedimage" src={formData.image} alt="uploadedimage"/>
              </div>
              <CloudinaryUploadWidget uploadImage={uploadedimage} />
          </Form.Group>

          <div className="submit">
            <button className='green-btn' type="submit">
              등록
            </button>
          </div>
        </Form>

    </div>
  )
}

export default PostWrite