import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import meetingImg from "../asset/img/meeting-img-01.jpg"
import { postActions } from '../action/postAction';

const MyCommentsTab = ({ uniqueUser }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postList } = useSelector((state) => state.post)
    const [myComments, setMyComments] = useState([]);

    useEffect(() => {
        dispatch(postActions.getPostList());
    }, [])

    useEffect(() => {
        if (postList) {
            const commentWithPosts = postList
                .filter((post) => 
                post.comments && post.comments.some((comment) => comment.author === uniqueUser._id)
                )
                .map((post) => ({
                    ...post,
                    userComments: post.comments.filter((comment) => comment.author === uniqueUser._id),
                }))
            setMyComments(commentWithPosts)
        }
    }, [postList, uniqueUser])


  return (
    <div>
      {myComments.map((post) => (
        <div className="myPage-tab" key={post._id}>
          <div className="post-content" onClick={() => { navigate(`/post/${post._id}`) }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <img src={post.image || meetingImg} alt="postImg" className="post-image" />
          </div>
          <div className="comments-section">
            {post.userComments.map((comment) => (
              <div className="comment" key={comment._id}>
                <div className="comment-author">
                  <img src={uniqueUser.profileImage} alt="author" className="author-image" />
                  <span className="author-name">{uniqueUser.userName}</span>
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                        <span className="comment-date">{comment.createAt.date} {comment.createAt.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyCommentsTab
