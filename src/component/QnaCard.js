import React from "react";
import "../style/qna.style.css";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const QnaCard = ({ id, author, title, content, answerCount }) => {
    const navigate = useNavigate();

    const showQnaDetail = () => {
        //Q&A 디테일 페이지로 가기
        navigate(`/qna/${id}`);
    };

    return (
        <div className="qna-card-container" onClick={() => showQnaDetail()}>
            <Row>
                <Col md={2}>
                    <div className="qna-card-answer-num">{`답변 : ${answerCount}`}</div>
                </Col>
                <Col md={10}>
                    <div className="qna-card-title">{title}</div>
                    <div className="qna-card-content">{content}</div>
                </Col>
            </Row>
            <div className="author">
                <span className="img">
                    <img src={author.profileImage} />
                </span>
                <span className="name">{author.userName}</span>
            </div>
        </div>
    );
};

export default QnaCard;
