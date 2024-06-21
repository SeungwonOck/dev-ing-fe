import React from 'react'
import WriteBtn from '../component/WriteBtn'
import MarkdownEditor from '@uiw/react-md-editor';
import { useState } from 'react';
import "../style/qnaDetail.style.css";
import Answer from '../component/Answer';
import AnswerInput from '../component/AnswerInput';

const QnaDetail = () => {
  const [markDown, setMarkdown] = useState(
    `
# 1
이렇게 사진처럼 에러가 생겼어요!

![image](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fHww)

`
  );

  return (
    <div>
      <div className='contents-header-btns'>
        <WriteBtn type='qna'/>
      </div>

      <div className='qna-detail-container'>
        <div className='qna-detail-q-container'>
          <div className='title'>ㅇㅇ 에러 관련 질문!</div>
          <div className='qna-info'>
            <div className='date'>2024.06.21</div>
            <div className='author'>
              <span className='img'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXKPLmUQUTiNrAPO2BP9eLjv_iX3T8XAhNRw&usqp=CAU" alt='' /></span>
              <span className='user-name'>홍길동</span>
            </div>
          </div>
          <div className='question'>
            <MarkdownEditor.Markdown style={{ padding: 10 }}
              source={markDown} />
          </div>
        </div>
        <div className='answer'>
          <Answer />
        </div>
        <div className='answer'>
          <Answer />
        </div>
        <div className='qna-detail-q-container'>
          <AnswerInput />
        </div>
      </div>
    </div>
  )
}

export default QnaDetail