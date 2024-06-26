import React, { useState } from "react";
import "../style/answer.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { qnaActions } from "../action/qnaAction";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FormLabel } from "react-bootstrap";

const Answer = ({ answer, getQnaDetail }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();
    const questionId = id;
    const answerId = answer._id;
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(answer.content);
    const team = team;

    const handleClose = () => {
        if (updatedContent) {
            setShow(false);
        }
        handleUpdate();
    };
    const handleShow = () => setShow(true);

    const handleUpdate = async () => {
        await dispatch(
            qnaActions.updateAnswer(questionId, answerId, updatedContent)
        );
        getQnaDetail();
    };

    const handleDelete = async () => {
        if (window.confirm("답변을 삭제하시겠습니까?")) {
            try {
                await dispatch(qnaActions.deleteAnswer(questionId, answerId));
                getQnaDetail();
            } catch (error) {
                console.error("댓글 삭제 오류:", error.message);
            }
        }
    };

    const handleHeartClick = async () => {
        setLoading(true);
        try {
            await dispatch(qnaActions.addLikeAnswer(questionId, answerId));
            getQnaDetail(); // 하트 상태 업데이트 후 전체 QnA 디테일을 다시 가져옵니다.
        } catch (error) {
            console.error("하트 상태 업데이트 오류:", error.message);
        }
        setLoading(false);
    };

    return (
        <div className="answer">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>답변 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>답변 내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={updatedContent}
                                onChange={(e) =>
                                    setUpdatedContent(e.target.value)
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        저장
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="img no-drag">
                <img src={answer.author.profileImage} alt="" />
            </div>
            <div className="header no-drag">
                <div className="left">
                    <div>{answer.author.userName}</div>
                    <div className="small-text">|</div>
                    <div className="small-text">
                        {`${
                            answer.createAt.date
                        } ${answer.createAt.time.substring(0, 5)}`}
                    </div>
                    {answer.isUpdated && (
                        <div className="small-text">수정됨</div>
                    )}
                </div>

                {user._id === answer.author._id && (
                    <div className="right small-text no-drag cur-point">
                        <div className="update-button" onClick={handleShow}>
                            수정
                        </div>
                        <div className="delete-button" onClick={handleDelete}>
                            삭제
                        </div>
                    </div>
                )}
            </div>
            {answer.image && (
                <div className="upload-img">
                    <img src={answer.image} alt="answer" />
                </div>
            )}
            <div className="body">{answer.content}</div>
            <div className="likes no-drag" onClick={handleHeartClick}>
                <FontAwesomeIcon
                    icon={
                        answer.userLikes.includes(user._id)
                            ? fullHeart
                            : emptyHeart
                    }
                    className="coral"
                />{" "}
                <span className="coral">{answer.likes}</span>
            </div>
        </div>
    );
};

export default Answer;
