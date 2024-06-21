import React, { useState } from 'react';
import '../style/answer.style.css';
import { Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CloudinaryUploadWidget from '../utils/CloudinaryUploadWidget';

const AnswerInput = () => {
    const { id } = useParams();
    const [newAnswer, setNewAnswer] = useState('');
    const { user } = useSelector((state) => state.user);
    const [imageUrl, setImageUrl] = useState('');

    const createAnswer = (e) => {
        e.preventDefault();
        console.log(id, newAnswer)
    }

    const uploadedimage = (url) => {
        setImageUrl(url);
    }

    return (
        <div>
            {user ?
                (
                    <div className='answer-input'>
                        <div className='header'>
                            <div className='img'><img src={user.profileImage} alt='' /></div>
                            <div>{user.userName}</div>
                        </div>
                        <Form className='body' onSubmit={createAnswer}>
                            <Form.Group controlId="comment">
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    rows={3}
                                    placeholder='댓글을 작성해주세요.'
                                    onChange={(e) => setNewAnswer(e.target.value)}
                                />
                            </Form.Group>
                            <div>
                                <div className='img'>
                                    <img id="uploadedimage" src={imageUrl} alt="uploadedimage" />
                                </div>
                                <CloudinaryUploadWidget uploadImage={uploadedimage} />
                                {" "}📌 이미지는 1장만 첨부 가능합니다
                            </div>
                            <button type='submit' className='green-btn'>등록</button>
                        </Form>
                    </div>
                )
                :
                (
                    <div>로그인 후 이용 가능합니다.</div>
                )}

        </div>
    )
}

export default AnswerInput
