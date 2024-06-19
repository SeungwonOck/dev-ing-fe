import React from 'react';
import '../style/postCard.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import thumbnail from '../asset/img/post-img-01.jpg'
import { useNavigate } from 'react-router-dom';

const PostCard = () => {
  const navigate = useNavigate();
  const showPostDetail = () => {
    //포스트 디테일 페이지로 가기
    navigate(`/post/${1}`);
  }
  return (
    <div className='post-card' onClick={() => showPostDetail()}>
      <div className='like'>
        <span><FontAwesomeIcon icon={faHeart} className='coral'/></span>
        <span>좋아요 <span className='coral'>6</span></span>
      </div>
      <div className='info'>
        <div className='title'>
          <p>깃 프로젝트 업데이트 하는 법 총정리</p>
        </div>
        <div className='contents'>
          <p>
            지난번 생성했던 프로젝트를 Github 에 연동시켜보겠습니다. 깃허브 공식 홈페이지를 통해 먼저 가입한뒤 로그인 Repositories 탭을 눌러보면 아래와 같이 오른쪽 위에 초록색 New 버튼이 나옵니다.
            소스코드가 있는 terminal을 통해서
            1. git init (*맨 처음에 프로젝트를 올릴 때!)
            2. git add . (.은 모든 것을 의미): 모든 파일을 올리겠다
            3. git commit -m "commit name": 히스토리를 만들어줌
            4. git remote add origin "레퍼지토리 주소": 프로젝트와 레퍼지토리의 연결고리 만들어줌
            5. git push origin master: master 브랜치로 코드를 보냄
          </p>
        </div>
        <div className='author'>
          <span className='img'><img src={thumbnail} alt=''/></span>
          <span className='user-page-name'>코딩 스토리</span>
          <span className='user-name'>by 홍길동</span>
        </div>
      </div>
      <div className='thumbnail'>
        <img src={thumbnail} alt=''/>
      </div>
    </div>
  )
}

export default PostCard