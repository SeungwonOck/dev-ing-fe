import React from 'react';
import QnaCard from '../component/QnaCard';
import "../style/qna.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Qna = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className='qna-container'>
        <div className='qna-add-btn'>
          <button className='white-btn' onClick={() => navigate('/qna/write')}><FontAwesomeIcon icon={faPencil} /> 질문 등록</button>
        </div>
        {/* <div className='qna-title'>Q & A</div> */}
        <QnaCard />
        <QnaCard />
        <QnaCard />
      </div>
    </div>
  )
}

export default Qna