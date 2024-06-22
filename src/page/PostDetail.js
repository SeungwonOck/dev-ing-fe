import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import '../style/postDetail.style.css';
import PostComment from '../component/PostComment';
import CommnetInput from '../component/CommentInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../action/postAction';
import ClipLoader from 'react-spinners/ClipLoader';
import WriteBtn from '../component/WriteBtn';
import { Button, Modal } from 'react-bootstrap';
import MarkdownEditor from '@uiw/react-md-editor';

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedPost, loading } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.user);
    const [ showEditBtns, setShowEditBtns ] = useState(false);
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

    useEffect(()=>{
        dispatch(postActions.getPostDetail(id))
    },[id, dispatch])

    useEffect(()=>{
        if(selectedPost && user && selectedPost.author._id === user._id) {
            setShowEditBtns(true)
        } else {
            setShowEditBtns(false)
        }
    },[selectedPost, user])

    const deletePost = () => {
        dispatch(postActions.deletePost(id, navigate))
    }

    if(loading) 
        return (
            <div className='loading'>
                <ClipLoader color="#28A745" loading={loading} size={100} />
            </div>
        )
    
    return (
        <>
            <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)} dialogClassName='modal-dialog-centered' size='sm'>
                <Modal.Header closeButton>
                  <h5 className="modal-title">포스트 삭제</h5>
                </Modal.Header>
                <Modal.Body>
                  정말 삭제하시겠습니까?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="light" onClick={() => setIsDeleteModalOpen(false)}>
                    취소
                  </Button>
                  <Button variant="danger" onClick={deletePost}>
                    삭제
                  </Button>
                </Modal.Footer>
            </Modal>
            <div className='contents-header-btns'>
                <WriteBtn type='post'/>
            </div>
            <div className="post-detail-card">
                <div className='title'>{selectedPost?.title}</div>
                <div className='author'>
                    <span className='img'><img src={selectedPost?.author.profileImage} alt=''/></span>
                    <span className='user-page-name'>페이지이름</span>
                    <span className='user-name'>by {selectedPost?.author.userName}</span>
                </div>
                <div className='contents' data-color-mode='light'>
                    <MarkdownEditor.Markdown style={{ padding: 10 }} source={selectedPost?.content} />
                </div>
            </div>

            <div className='tags'>
                {selectedPost?.tags.map((tag, index) => <span key={index} className='tag' onClick={() => navigate(`/post?tag=${tag}`)}>#{tag}</span>)}
            </div>

            <div className='contents-footer'>
                <div className='like-comment-num'>
                    <div><FontAwesomeIcon icon={faHeart} className='coral'/> 좋아요 <span className='coral'>{selectedPost?.likes}</span></div>
                    <div><FontAwesomeIcon icon={faComments} className='green'/> 댓글 <span className='green'>1</span></div>
                </div>
                <div className='edit-delete-btns'>
                    {showEditBtns ? <>
                        <div className='white-btn small-btn' onClick={() => navigate(`/post/write?type=edit&id=${id}`)}>수정</div>
                        <div className='coral-btn small-btn ml-1' onClick={() => setIsDeleteModalOpen(true)}>삭제</div>
                    </> :''}
                </div>
            </div>
            <PostComment/>
            <CommnetInput/>
        </>
    )
}

export default PostDetail