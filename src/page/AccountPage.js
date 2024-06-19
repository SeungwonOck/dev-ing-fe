import React from 'react';
import '../style/account.style.css';
import thumbnail from '../asset/img/post-img-01.jpg'
import { Button } from 'react-bootstrap';

const AccountPage = () => {
  
  return (
    <div className='account-container'>
      <div className='title'>내 계정 정보</div>
      <div className='main-info'>
        <div className='left'>
          <div className='img'><img src={thumbnail} alt=''/></div>
        </div>
        <div className='right'>
          <div><strong>이름: </strong>홍길동</div>
          <div><strong>성별: </strong>남자</div>
          <div><strong>ID: </strong>honggildong</div>
          <div><strong>E-mail: </strong>gildong@gmail.com</div>
          <div><strong>비밀번호: </strong>******</div>
        </div>
      </div>
      <div className='other-info'>
        <div className='rank'>
          <strong>Rank</strong>
          <span></span>
        </div>
        <div className='specs'>
          <strong>specs</strong>
          <div>
            <Button>React</Button>
            <Button>Nodejs</Button>
            <Button>Html</Button>
            <Button>Css</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountPage