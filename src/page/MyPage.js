import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import PostTab from '../component/PostTab';
import MeetUpTab from '../component/MeetUpTab';
import QnaTab from '../component/QnaTab';
import "../style/myPage.style.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { userActions } from '../action/userAction';
import ClipLoader from 'react-spinners/ClipLoader';

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { nickName } = useParams();
  const [tab, setTab] = useState(0);
  const { user, loading, uniqueUser, followSuccess, unfollowSuccess, uniqueUserPost } = useSelector((state) => state.user);
  const isCurrentUser = user && user.nickName === nickName;

  useEffect(() => {
    dispatch(userActions.getUserByNickName(nickName))
  }, [nickName, dispatch])

  useEffect(() => {
    if (followSuccess || unfollowSuccess) {
      dispatch(userActions.getUserByNickName(nickName));
    }
  }, [followSuccess, unfollowSuccess, nickName, dispatch]);

  const handleFollow = () => {
    if (!user) {
      navigate("/login")
    } else {
      dispatch(userActions.followUser(nickName))
    }
  };

  const handleUnfollow = () => {
    dispatch(userActions.unfollowUser(nickName))
  }

  if (loading) {
    return <div className='loading'><ClipLoader color="#28A745" loading={loading} size={100} /></div>
  }

  if (!uniqueUser) {
    return <div>User not found</div>;
  }

  let isFollowing = user && user.following && user.following.includes(uniqueUser._id)
  
  return (
    <div className="my-page-container">
      <div className="profile-section">
        <img src={uniqueUser.profileImage} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <div className="user-info">
            <h2 className="user-name">
              {uniqueUser.userName} <span className="user-rank">{uniqueUser.rank}</span>
              {!isCurrentUser &&(
                <button className="follow-button" onClick={isFollowing ? handleUnfollow : handleFollow }>
                  {isFollowing ? "언팔로우" : "팔로우"}
                </button>
              )}
            </h2>
            <p className="stacks">{uniqueUser.stacks.join(', ')}</p>
          </div>
          <div className="follow-info">
            <div className="follow-item">
              <p className="follow-label">Following</p>
              <p className="follow-count">{uniqueUser.following ? uniqueUser.following.length : 0}</p>
            </div>
            <div className="follow-item">
              <p className="follow-label">Followers</p>
              <p className="follow-count">{uniqueUser.followers ? uniqueUser.followers.length : 0}</p>
            </div>
          </div>
        </div>
        <p className="description">{uniqueUser.description}</p>
      </div>

      <Nav variant="tabs" defaultActiveKey="post" className="custom-nav">
        <Nav.Item>
          <Nav.Link onClick={() => setTab(0)} eventKey="post">Post</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(1)} eventKey="meetUp">MeetUp</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(2)} eventKey="qna">Q&A</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(3)} eventKey="scrap">Scrap</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(4)} eventKey="myLikes">My Likes</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(5)} eventKey="myComments">My Comments</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} uniqueUserPost={uniqueUserPost} />
    </div>
  )
}

const TabContent = ({ tab, uniqueUserPost }) => {
  if (tab === 0) {
    return <div className="post-tab-container">
      {uniqueUserPost && uniqueUserPost.map((post) => (
        <PostTab post={post} key={post._id}/>
      ))}
    </div>
  }

  if (tab === 1) {
    return <MeetUpTab />
  }

  if (tab === 2) {
    return <QnaTab />
  }

}

export default MyPage