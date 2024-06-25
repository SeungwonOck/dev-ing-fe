import React from "react";
import "../style/answer.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";

const Answer = ({ answer }) => {
    const { user } = useSelector((state) => state.user);
    // const {selectedQnA}

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

                <div className="right small-text">
                    <div>수정</div>
                    <div>삭제</div>
                </div>
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
