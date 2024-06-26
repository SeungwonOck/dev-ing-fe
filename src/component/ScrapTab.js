import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postActions } from '../action/postAction';
import meetingImg from "../asset/img/meeting-img-01.jpg"

const ScrapTab = ({uniqueUser}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postList } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.user)
    const [scrapedPost, setScrapedPost] = useState([]);
    const isCurrentUser = user && user._id === uniqueUser._id;


    useEffect(() => {
        dispatch(postActions.getPostList())
    }, [])

    useEffect(() => {
        if (postList && uniqueUser.scrap) {
            const filteredScrap = postList.filter((post) => 
                uniqueUser.scrap.some((scrapItem) => 
                scrapItem.post === post._id && 
                (isCurrentUser || !scrapItem.isPrivate)
                )
            );
            setScrapedPost(filteredScrap);
            }
    }, [postList, uniqueUser.scrap, isCurrentUser]);


  return (
    <div className="myPage-tab-container">
      {scrapedPost.map((post) => (
        <div className="myPage-tab cur-point" key={post._id} onClick={() => { navigate(`/post/${post._id}`) }}>
          <img src={post.image || meetingImg} alt="postImg" className="myPage-image" />
        </div>
      ))}
    </div>
  )
}

export default ScrapTab
