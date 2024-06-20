import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import '../style/postDetail.style.css';
import thumbnail from '../asset/img/post-img-01.jpg'
import PostComment from '../component/PostComment';
import CommnetInput from '../component/CommentInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../action/postAction';
import ClipLoader from 'react-spinners/ClipLoader';

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedPost, loading } = useSelector((state) => state.post);

    useEffect(()=>{
        dispatch(postActions.getPostDetail(id))
    },[id])

    if(loading && !selectedPost) 
        return (
            <div className='loading'>
                <ClipLoader color="#28A745" loading={loading} size={100} />
            </div>
        )
    

    return (
        <>
            <div className="post-detail-card">
                <div className='title'>{selectedPost?.title}</div>
                <div className='author'>
                    <span className='img'><img src={selectedPost?.author.profileImage} alt=''/></span>
                    <span className='user-page-name'>코딩 스토리</span>
                    <span className='user-name'>by {selectedPost?.author.userName}</span>
                </div>
                <div className='contents'>
                    <p>{selectedPost?.content}</p>
                </div>
            </div>

            <div className='tags'>
                {selectedPost?.tags.map((tag, index) => <span key={index} className='tag'>#{tag}</span>)}
            </div>

            <div className='like-comment-num'>
                <div><FontAwesomeIcon icon={faHeart} className='coral'/> 좋아요 <span className='coral'>{selectedPost?.likes}</span></div>
                <div><FontAwesomeIcon icon={faComments} className='green'/> 댓글 <span className='green'>1</span></div>
            </div>
            <PostComment/>
            <CommnetInput/>
        </>
    )
}

export default PostDetail