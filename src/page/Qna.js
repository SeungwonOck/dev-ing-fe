import React, { useEffect } from "react";
import QnaCard from "../component/QnaCard";
import "../style/qna.style.css";
import WriteBtn from "../component/WriteBtn";
import { useDispatch, useSelector } from "react-redux";
import { qnaActions } from "../action/qnaAction";

const Qna = () => {
    const dispatch = useDispatch();
    const { loading, qnaList, error } = useSelector((state) => state.qna);

    const getQnaList = () => {
        dispatch(qnaActions.getQnaList());
    };

    useEffect(() => {
        getQnaList();
    }, []);

    useEffect(() => {
        console.log(qnaList);
    }, [qnaList]);

    return (
        <div>
            <div className="qna-container">
                <div className="contents-header-btns">
                    {/* 이후 키워드에 따라 필터링하는 버튼이나 여타 다른 버튼 추가하게 될 때, 버튼들을 오른쪽 정렬로 모아두기 위함. */}
                    {/* contents-header-btns 위치는 common.style.css */}
                    <WriteBtn type="qna" />
                </div>
                <div className="qna-title">Q & A</div>
                {qnaList.map((item) => (
                    <QnaCard
                        key={item._id}
                        author={item.author}
                        title={item.title}
                        content={item.content}
                        answerCount={item.answerCount}
                        id={item._id}
                        getQnaList={getQnaList}
                    />
                ))}
            </div>
        </div>
    );
};

export default Qna;
