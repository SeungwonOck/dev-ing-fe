import React from 'react';
import QnaCard from '../component/QnaCard';
import "../style/qna.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const Qna = () => {
  return (
    <div>
      <div className='qna-container'>
        <div className='qna-add-btn'>
          <button className='white-btn'><FontAwesomeIcon icon={faPencil} /> 질문 등록</button>
        </div>
        <QnaCard />
        <QnaCard />
        <QnaCard />
      </div>
    </div>
  )
}

export default Qna