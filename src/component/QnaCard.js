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
        await dispatch(qnaActions.getQnaDetail(id));
        navigate("/qna/write?type=update");
    };

    const removeImages = (content) => {
        // 이미지 마크다운 구문을 매칭하는 정규 표현식
        const regex = /!\[.*?\]\(.*?\)/g;
        // 이미지 마크다운 구문을 빈 문자열로 대체하여 이미지를 제거한 순수 텍스트를 반환
        const plainTextContent = content.replace(regex, "");
        return plainTextContent;
    };

    return (
        <div className="qna-card-container" onClick={() => showQnaDetail()}>
            <Row>
                <Col md={2}>
                    <div className="qna-card-answer-num no-drag">{`답변 : ${answerCount}`}</div>
                </Col>
                <Col md={10}>
                    <div className="qna-card-title">{title}</div>
                    <div className="qna-card-content">
                        {removeImages(content)}
                    </div>
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
