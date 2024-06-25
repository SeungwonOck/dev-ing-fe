import React from "react";
import "../style/answer.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { qnaActions } from "../action/qnaAction";
import { useParams } from "react-router-dom";

const Answer = ({ answer, getQnaDetail }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();

    const handleUpdate = () => {};

    const handleDelete = async () => {
        if (window.confirm("답변을 삭제하시겠습니까?")) {
            try {
                const questionId = id;
                const answerId = answer._id;
                await dispatch(qnaActions.deleteAnswer(questionId, answerId));
                getQnaDetail();
            } catch (error) {
                console.error("댓글 삭제 오류:", error.message);
            }
        }
    };

    return (
        <div className="answer">
            <div className="img">
                <img src={answer.author.profileImage} alt="" />
            </div>
            <div className="header">
                <div className="left">
                    <div>{answer.author.userName}</div>
                    <div className="small-text">|</div>
                    <div className="small-text">{`${
                        answer.createAt.date
                    } ${answer.createAt.time.substring(0, 5)}`}</div>
                    {answer.isUpdated && (
                        <div className="small-text">수정됨</div>
                    )}
                </div>

                {user._id === answer.author._id && (
                    <div className="right small-text">
                        <div className="update-button" onClick={handleUpdate}>
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
                    <img src={answer.image} />
                </div>
            )}
            <div className="body">{answer.content}</div>
            <div className="likes">
                <FontAwesomeIcon icon={faHeart} className="coral" />{" "}
                <span className="coral">{answer.likes}</span>
            </div>
        </div>
    );
};

export default Answer;
