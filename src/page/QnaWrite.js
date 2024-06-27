import React, { useEffect, useState } from "react";
import MarkdownEditor from "@uiw/react-md-editor";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import CloudinaryUploadWidgetForWrite from "../utils/CloudinaryUploadWidgetForWrite";
import { qnaActions } from "../action/qnaAction";

const initialFormData = {
    title: "",
    content: "",
};

const QnaWrite = ({ mode }) => {
    const [markDown, setMarkdown] = useState("");
    const [formData, setFormData] = useState({ ...initialFormData });
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");
    const { user } = useSelector((state) => state.user);
    const { newQnaId, selectedQna } = useSelector((state) => state.qna);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get("type");

    useEffect(() => {
        if (type === "update" && selectedQna) {
            setFormData({
                title: selectedQna.title,
                content: selectedQna.content,
            });
            setMarkdown(selectedQna.content);
        } else {
            setFormData({ ...initialFormData });
            setMarkdown("");
        }
    }, [type, selectedQna]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    const createQuestion = () => {
        if (formData.title === "") {
            setTitleError("📌 제목을 입력해주세요");
            return;
        } else {
            setTitleError("");
        }

        const newFormData = { ...formData, content: markDown };

        if (type === "new") {
            dispatch(qnaActions.createQna(newFormData));
        } else {
            dispatch(qnaActions.updateQna(newFormData, selectedQna._id));
        }

        // navigate(`/qna/${newQnaId}`);
        navigate("/qna");
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };

    const uploadContentImage = (url) => {
        setMarkdown(markDown + `![image](${url})`);
    };

    return (
        <div className="write-form-container">
            <div className="write-form">
                <div className="top">
                    <div className="text">
                        <FontAwesomeIcon icon={faPencil} /> 질문하기
                    </div>
                    <button className="green-btn" onClick={createQuestion}>
                        {type === "new" ? "등록" : "수정"}
                    </button>
                </div>
                <div className="qna-write-title">
                    <input
                        id="title"
                        type="text"
                        placeholder="제목을 입력해주세요"
                        required
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <span className="error">{titleError}</span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <strong className="small-btn">본문에 사진 추가 </strong>
                    <CloudinaryUploadWidgetForWrite
                        uploadContentImage={uploadContentImage}
                    />
                </div>
                <div id="content" className="qna-write-content">
                    <div data-color-mode="light">
                        <span className="error">{contentError}</span>
                        <MarkdownEditor
                            height={600}
                            value={markDown}
                            highlightEnable={false}
                            onChange={setMarkdown}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QnaWrite;
