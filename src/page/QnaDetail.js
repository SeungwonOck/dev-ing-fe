import React from 'react'
import MarkdownEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import "../style/qnaDetail.style.css";
import PostComment from '../component/PostComment';
import CommentInput from '../component/CommentInput';

const QnaDetail = () => {
  const [markDown, setMarkdown] = useState(
    `123123123123
# 1
ㅎㅎㅎ

####

![image](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fHww)

`
  );

  return (
    <div className='qna-detail-container'>QnaDetail
      <div className='question'>
        <MarkdownEditor.Markdown style={{ padding: 10 }}
          source={markDown} />
      </div>
      <div className='answer'>
        <PostComment />
        <CommentInput />
      </div>
    </div>
  )
}

export default QnaDetail