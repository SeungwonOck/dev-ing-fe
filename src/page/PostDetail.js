import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/postDetail.style.css';
import PostComment from '../component/PostComment';
import CommnetInput from '../component/CommentInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../action/postAction';
import ClipLoader from 'react-spinners/ClipLoader';
import WriteBtn from '../component/WriteBtn';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import MarkdownEditor from '@uiw/react-md-editor';

const reasons = [ 
    '스팸홍보/도배글입니다.',
    '음란물입니다.',
    '불법정보를 포함하고 있습니다.',
    '청소년에게 유해한 내용입니다.',
    '욕설/생명경시/혐오/차별적 표현입니다.',
    '개인정보 노출 게시물입니다.',
    '불쾌한 표현이 있습니다.',
    '명예훼손 또는 저작권이 침해되었습니다.',
    '불법촬영물 등이 포함되어 있습니다.'
];

const initialCheckboxStates = reasons.reduce((acc, reason) => {
    acc[reason] = false;
    return acc;
}, {});

const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedPost, loading } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.user);
    const [ showEditBtns, setShowEditBtns ] = useState(false);
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
    const [ isUserLikedPost, setIsUserLikedPost ] = useState(false);
    const [ isReportModalOpen, setIsReportModalOpen ] = useState(false);
    const [ checkboxStates, setCheckboxStates ] = useState(initialCheckboxStates);

    useEffect(()=>{
        console.log(checkboxStates)
    },[checkboxStates])

    useEffect(()=>{
        if(selectedPost && selectedPost.userLikes.includes(user._id)) {
          setIsUserLikedPost(true)
        } else {
          setIsUserLikedPost(false)
        }
    },[selectedPost])

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

    const addLike = (id) => {
        dispatch(postActions.addLike(id))
    }
    
    const deleteLike = (id) => {
        console.log('좋아요 취소')
        // dispatch(postActions.deleteLike(id))
    }

    const scrapPost = (id) => {
        console.log(id)
    }
    const sendReport = () => {
        const id = selectedPost._id;
        const reasons = Object.keys(checkboxStates).filter(key => checkboxStates[key] === true);
        console.log(id, reasons)
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxStates(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    if(loading) 
        return (
            <div className='loading'>
                <ClipLoader color="#28A745" loading={loading} size={100} />
            </div>
        )
    
    return (
        <>
            {/* 신고모달 */}
            <Modal show={isReportModalOpen} onHide={() => setIsReportModalOpen(false)} dialogClassName='modal-dialog-centered' size='md'>
                <Modal.Header closeButton>
                  <h5 className="modal-title">신고하기</h5>
                </Modal.Header>
                <Modal.Body>
                  <div><strong>작성자</strong>: {selectedPost?.author.nickName}</div>
                  <div><strong>글 제목</strong>: {selectedPost?.title}</div>
                  <hr/>
                  <div>
                    <strong>사유선택</strong>
                    <Form>
                        {reasons && reasons.map((reason, index) => (
                            <Form.Check
                                key={`${index}`}
                                id={`reason-${index+1}`}
                                type={'checkbox'}
                                name={reason}
                                label={reason}
                                checked={checkboxStates[reason]}
                                onChange={handleCheckboxChange}
                            />
                        ))}
                    </Form>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="light" onClick={() => setIsReportModalOpen(false)}>
                    취소
                  </Button>
                  <Button variant="danger" onClick={sendReport}>
                    신고하기
                  </Button>
                </Modal.Footer>
            </Modal>

            {/* 삭제모달 */}
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
                <div>
                    <div className='author'>
                        <span className='img'><img src={selectedPost?.author.profileImage} alt=''/></span>
                        <span className='user-name'>{selectedPost?.author.userName}</span>
                    </div>
                    <Dropdown>
                        <Dropdown.Toggle variant='none'>
                            <FontAwesomeIcon icon={faEllipsisVertical}/> 
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => scrapPost(selectedPost._id)}>스크랩하기</Dropdown.Item>
                            <Dropdown.Item onClick={() => setIsReportModalOpen(true)}>신고하기</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
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

                    {isUserLikedPost ? 
                        <div className='like' onClick={() => deleteLike(selectedPost._id)}>
                            <FontAwesomeIcon icon={fullHeart} className='coral'/> 좋아요 <span className='coral'>{selectedPost?.likes}</span>
                        </div> :
                        <div className='like' onClick={() => addLike(selectedPost._id)}>
                            <FontAwesomeIcon icon={emptyHeart} className='coral'/> 좋아요 <span className='coral'>{selectedPost?.likes}</span>
                        </div>}

                    <div><FontAwesomeIcon icon={faComments} className='green'/> 댓글 <span className='green'>{selectedPost?.commentCount}</span></div>
                </div>
                <div className='edit-delete-btns'>
                    {showEditBtns ? <>
                        <div className='white-btn small-btn' onClick={() => navigate(`/post/write?type=edit&id=${id}`)}>수정</div>
                        <div className='coral-btn small-btn ml-1' onClick={() => setIsDeleteModalOpen(true)}>삭제</div>
                    </> :''}
                </div>
            </div>
            <PostComment commentList={selectedPost?.comments} user={user}/>
            <CommnetInput/>
        </>
    )
}

export default PostDetail