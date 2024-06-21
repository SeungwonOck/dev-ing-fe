import React from 'react';
import '../style/answer.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Answer = () => {
    return (
        <div className='answer'>
            <div className='img'><img src="https://i.pinimg.com/236x/5a/62/b3/5a62b3fed105b814b56b25ecbae1af42.jpg" alt='' /></div>
            <div className='header'>
                <div className='left'>
                    <div>멜로디</div>
                    <div className='small-text'>|</div>
                    <div className='small-text'>2024.06.19 14:34</div>
                </div>

                {/* 유저 본인의 댓글일 경우에만 수정/삭제 가능하게 */}
                {/* <div className='right small-text'>
                    <div>수정</div>
                    <div>삭제</div>
                </div> */}
            </div>
            <div className='upload-img'>
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fHww" />
            </div>
            <div className='body'>
                오 저는 저 4번째 줄에 적힌 코드를 console.log("a"); 하니까 나오더라구요
            </div>
            <div className='likes'>
                <FontAwesomeIcon icon={faHeart} className='coral' />{" "}
                <span className='coral'>10</span>
            </div>
        </div>
    )
}

export default Answer
