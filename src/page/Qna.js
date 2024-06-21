import React from 'react';
import QnaCard from '../component/QnaCard';
import "../style/qna.style.css";
import WriteBtn from '../component/WriteBtn';

const Qna = () => {

  return (
    <div>
      <div className='qna-container'>


        <div className='contents-header-btns'>
          {/* 이후 키워드에 따라 필터링하는 버튼이나 여타 다른 버튼 추가하게 될 때, 버튼들을 오른쪽 정렬로 모아두기 위함. */}
          {/* contents-header-btns 위치는 common.style.css */}
          <WriteBtn type='qna'/>
        </div>


        <div className='qna-title'>Q & A</div>
        <QnaCard />
        <QnaCard />
        <QnaCard />
      </div>
    </div>
  )
}

export default Qna