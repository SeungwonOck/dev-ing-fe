import React from 'react';
import thumbnail from '../../asset/img/post-img-01.jpg'

const HomePostCard = () => {
  return (
    <div className='home-post-card'>
        <div className='img'><img src={thumbnail} alt=''/></div>
        <div className='contents'>
          <div className='small-text'>
            <span className='like'>좋아요 <span className='coral'>220</span></span>
            <span className='scrap'>스크랩 <span className='coral'>246</span></span>
          </div>
          <div className='title'>
            <p>리액트 useState, useEffect란 무엇일까?</p>
          </div>
          <div className='author'>
            <div>코딩 스토리</div>
            <div className='small-text'>by 홍길동</div>
          </div>
        </div>
    </div>
  )
}

export default HomePostCard