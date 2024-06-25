import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postActions } from '../action/postAction';
import meetingImg from "../asset/img/meeting-img-03.jpg"
import { useNavigate } from 'react-router-dom';

const MyLikesTab = ({uniqueUser}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postList } = useSelector((state) => state.post);
    const [likedPosts, setLikedPosts] = useState([]);
    

    useEffect(() => {
        dispatch(postActions.getPostList())
    }, [])

    useEffect(() => {
    if (postList) {
      const filteredPosts = postList.filter((post) => 
        post.userLikes && post.userLikes.includes(uniqueUser._id)
      );
      setLikedPosts(filteredPosts);
    }
  }, [postList, uniqueUser]);

  return (
      <div className="myPage-tab-container">
      {likedPosts.map((post) => (
        <div className="myPage-tab" key={post._id} onClick={() => { navigate(`/post/${post._id}`) }}>
          <img src={post.image || meetingImg} alt="postImg" className="myPage-image" />
        </div>
      ))}
    </div>
  )
}

export default MyLikesTab
