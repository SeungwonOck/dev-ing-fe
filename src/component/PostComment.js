import React from 'react';
import '../style/postComment.style.css';

const PostComment = ({ commentList, user }) => {

    return (
        <>
            {commentList && commentList.map((comment)=>(
                <div className='post-comment' key={comment._id}>
                    <div className='img'><img src={comment.author.profileImage} alt=''/></div>
                    <div className='header'>
                        <div className='left'>
                            <div>{comment.author.userName}</div>
                            <div className='small-text'>|</div>
                            <div className='small-text'>{comment.createAt.date} {comment.createAt.time}</div>
                        </div>

                        {/* 유저 본인의 댓글일 경우에만 수정/삭제 가능하게 */}
                        {user._id === comment.author._id ? 
                            <div className='right small-text'>
                                <div>수정</div>
                                <div>삭제</div>
                            </div> : ''}
                    </div>
                    <div className='body'>
                        {comment.content}
                    </div>
                </div>
            ))}
        </>
    )
}

export default PostComment