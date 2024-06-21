import React, { useEffect } from 'react';
import MarkdownEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import CloudinaryUploadWidgetForWrite from '../utils/CloudinaryUploadWidgetForWrite';
import noImg from '../asset/img/no-image.png';

const initialFormData = {
    title: '',
    content: '',
    image: '',
};

const QnaWrite = () => {
    const [markDown, setMarkdown] = useState("");
    const [formData, setFormData] = useState({ ...initialFormData });
    const [titleError, setTitleError] = useState("");
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])

    const creatQuestion = () => {
        if (formData.title === '') {
            setTitleError("📌 제목을 입력해주세요");
            return;
        }
        else {
            setTitleError("");
        }
        setFormData({ ...formData, content: markDown });
        console.log("formData", formData);
        console.log("markDown", markDown);
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    }

    const uploadContentImage = (url) => {
        setMarkdown(markDown + `![image](${url})`);
    }

    return (
        <div className='write-form-container'>
            <div className='write-form'>
                <div className='top'>
                    <div className='text'><FontAwesomeIcon icon={faPencil} /> 질문하기</div>
                    <button className='green-btn' onClick={creatQuestion}>등록</button>
                </div>
                <div className='qna-write-title'>
                    <input
                        id="title"
                        type="text"
                        placeholder="제목을 입력해주세요"
                        required
                        value={formData.title}
                        onChange={(event) => handleChange(event)}
                    />
                    <span className='error'>{titleError}</span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                    <strong className='small-btn'>본문에 사진 추가 </strong>
                    <CloudinaryUploadWidgetForWrite uploadContentImage={uploadContentImage} />
                </div>
                <div id="content" className='qna-write-content'>
                    <div data-color-mode="light">
                        <MarkdownEditor height={865} value={markDown} highlightEnable={false} onChange={(value, viewUpdate) => {
                            setMarkdown(value)
                        }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QnaWrite
