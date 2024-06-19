import React from 'react';
import { useParams } from 'react-router-dom';
import '../style/postComment.style.css';
import thumbnail from '../asset/img/post-img-01.jpg'


const PostComment = () => {
    const { id } = useParams();
    return (
        <div className='post-comment'>
            <div className='img'><img src={thumbnail} alt=''/></div>
            <div className='header'>
                <div className='left'>
                    <div>배수정</div>
                    <div className='small-text'>|</div>
                    <div className='small-text'>2024.06.19 14:34</div>
                </div>

                {/* 유저 본인의 댓글일 경우에만 수정/삭제 가능하게 */}
                {/* <div className='right small-text'>
                    <div>수정</div>
                    <div>삭제</div>
                </div> */}
            </div>
            <div className='body'>
                친절하게 잘 설명해주셔서 감사합니다!! 팔로우하고 갈게요.
            </div>
        </div>
    )
}

export default PostComment