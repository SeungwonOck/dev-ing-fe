import React, { useEffect } from 'react';
import MarkdownEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const initialFormData = {
    title: '',
    content: '',
    image: '',
};

const QnaWrite = () => {
    const [markDown, setMarkdown] = useState("");
    const [formData, setFormData] = useState({ ...initialFormData });
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])

    const creatQuestion = () => {
        setFormData({ ...formData, content: markDown });
        console.log("formData", formData);
        console.log("markDown", markDown);
    }

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    }

    return (
        <div>
            질문 쓰기
            <div className='write-form'>
                <div>
                    <button className='green-btn' onClick={creatQuestion}>등록</button>
                </div>
                <div className='qna-write-title'>
                    <span>제목 : </span>
                    <input
                        id="title"
                        type="text"
                        placeholder="제목을 입력해주세요"
                        required
                        value={formData.title}
                        onChange={(event) => handleChange(event)}
                    />
                </div>
                <div id="content" className='qna-write-title'>
                    <div data-color-mode="light">
                        <MarkdownEditor height={865} value={markDown} onChange={(value, viewUpdate) => {
                            setMarkdown(value)
                        }} />
                    </div>
                </div>
                <MarkdownEditor.Markdown style={{ padding: 10 }}
                    source={markDown} />
            </div>
        </div>
    )
}

export default QnaWrite
