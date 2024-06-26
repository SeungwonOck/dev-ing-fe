import React, { useEffect } from "react";
import WriteBtn from "../component/WriteBtn";
import MarkdownEditor from "@uiw/react-md-editor";
import { useState } from "react";
import "../style/qnaDetail.style.css";
import Answer from "../component/Answer";
import AnswerInput from "../component/AnswerInput";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { qnaActions } from "../action/qnaAction";
import ClipLoader from "react-spinners/ClipLoader";

const QnaDetail = () => {
    const dispatch = useDispatch();
    const { selectedQna, error, loading } = useSelector((state) => state.qna);
    const { id } = useParams();
    const [markDown, setMarkdown] = useState("");

    const getQnaDetail = () => {
        dispatch(qnaActions.getQnaDetail(id));
    };

    useEffect(() => {
        getQnaDetail();
    }, [id]);

    useEffect(() => {
        selectedQna && setMarkdown(selectedQna.content);
    }, [selectedQna]);

    return (
        <div>
            <div className="contents-header-btns">
                <WriteBtn type="qna" />
            </div>

            <div className="qna-detail-container">
                <div className="qna-detail-q-container">
                    <div className="title">{selectedQna?.title}</div>
                    <div className="qna-info">
                        <div className="date no-drag">
                            {selectedQna?.createAt.date}
                        </div>
                        <div className="author no-drag">
                            <span className="img">
                                <img
                                    src={selectedQna?.author.profileImage}
                                    alt=""
                                />
                            </span>
                            <span className="user-name">
                                {selectedQna?.author.userName}
                            </span>
                        </div>
                    </div>
                    <div className="question">
                        <MarkdownEditor.Markdown
                            style={{ padding: 10 }}
                            source={markDown}
                        />
                    </div>
                </div>
                <div className="qna-detail-q-container">
                    <AnswerInput getQnaDetail={getQnaDetail} />
                </div>
                <div className="question-num no-drag">{`${selectedQna?.answerCount}개의 답변`}</div>
                {selectedQna?.answers.map((answer) => (
                    <div className="answer">
                        <Answer
                            key={answer._id}
                            answer={answer}
                            getQnaDetail={getQnaDetail}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QnaDetail;
