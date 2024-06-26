import React from "react";
import "../style/qna.style.css";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { qnaActions } from "../action/qnaAction";

const QnaCard = ({ id, author, title, content, answerCount, getQnaList }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const showQnaDetail = () => {
        //Q&A 디테일 페이지로 가기
        navigate(`/qna/${id}`);
    };

    const handleDelete = async (event) => {
        event.stopPropagation();
        if (window.confirm("정말로 이 QnA를 삭제하시겠습니까?")) {
            try {
                await dispatch(qnaActions.deleteQna(id));
                getQnaList();
            } catch (error) {
                console.error("QnA 삭제 오류:", error.message);
            }
        }
    };

    const handleUpdate = async (event) => {
        event.stopPropagation();
    };

    return (
        <div className="qna-card-container" onClick={() => showQnaDetail()}>
            <Row>
                <Col md={2}>
                    <div className="qna-card-answer-num no-drag">{`답변 : ${answerCount}`}</div>
                </Col>
                <Col md={10}>
                    <div className="qna-card-title">{title}</div>
                    <div className="qna-card-content">{content}</div>
                </Col>
            </Row>
            {user._id.toString() === author._id && (
                <div className="right small-text no-drag">
                    <p
                        className="update-button"
                        onClick={(event) => handleUpdate(event)}
                    >
                        수정
                    </p>
                    <p
                        className="delete-button"
                        onClick={(event) => handleDelete(event)}
                    >
                        삭제
                    </p>
                </div>
            )}
            <div className="author no-drag cur-point">
                <span className="img">
                    <img src={author.profileImage} />
                </span>
                <span className="name">{author.userName}</span>
            </div>
        </div>
    );
};

export default QnaCard;
