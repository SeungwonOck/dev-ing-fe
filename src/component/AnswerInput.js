import React, { useEffect, useState } from "react";
import "../style/answer.style.css";
import { Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CloudinaryUploadWidget from "../utils/CloudinaryUploadWidget";
import { qnaActions } from "../action/qnaAction";

const AnswerInput = ({ getQnaDetail }) => {
    const { id } = useParams();
    const [content, setContent] = useState("");
    const { user } = useSelector((state) => state.user);
    const [imageUrl, setImageUrl] = useState("");
    const dispatch = useDispatch();

    const fetchCreateAnswer = async (e) => {
        e.preventDefault();
        const newAnswer = {
            content: content,
            image: imageUrl,
        };
        await dispatch(qnaActions.createAnswer(newAnswer, id));
        getQnaDetail();
        setContent("");
        setImageUrl("");
    };

    const uploadedimage = (url) => {
        setImageUrl(url);
    };

    return (
        <div>
            {user ? (
                <div className="answer-input no-drag">
                    <div className="header">
                        <div className="img">
                            <img src={user.profileImage} alt="" />
                        </div>
                        <div>{user.userName}</div>
                    </div>
                    <Form className="body" onSubmit={fetchCreateAnswer}>
                        <Form.Group controlId="comment">
                            <Form.Control
                                as="textarea"
                                type="text"
                                rows={3}
                                placeholder="댓글을 작성해주세요."
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                            />
                        </Form.Group>
                        <div className="img-container">
                            <div className="img">
                                <img
                                    id="uploadedimage"
                                    src={
                                        imageUrl ||
                                        "https://cdn-icons-png.flaticon.com/128/1829/1829586.png"
                                    }
                                    alt="uploadedimage"
                                />
                                <CloudinaryUploadWidget
                                    uploadImage={uploadedimage}
                                />
                            </div>{" "}
                        </div>
                        <button type="submit" className="green-btn">
                            등록
                        </button>
                    </Form>
                </div>
            ) : (
                <div>로그인 후 이용 가능합니다.</div>
            )}
        </div>
    );
};

export default AnswerInput;
