import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import thumbnail from '../asset/img/post-img-01.jpg'
import { useParams } from 'react-router-dom';

const CommentInput = () => {
    const { id } = useParams();
    const [ newComment, setNewComment ] = useState('');

    // 댓글 보내기 기능
    const createComment = (e) => {
        e.preventDefault();
        console.log(id, newComment)
    }

    return (
        <div className='comment-input'>
            <div className='header'>
                <div className='img'><img src={thumbnail} alt=''/></div>
                <div>로그인한 유저 본인</div>
            </div>
            <Form className='body' onSubmit={createComment}>
                <Form.Group controlId="comment">
                    <Form.Control
                        as="textarea"
                        type="text"
                        rows={3}
                        placeholder='댓글을 작성해주세요.'
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                </Form.Group>
                <button type='submit' className='green-btn'>등록</button>
            </Form>
        </div>
    )
}

export default CommentInput