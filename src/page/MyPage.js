import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import PostTab from '../component/PostTab';
import MeetUpTab from '../component/MeetUpTab';
import QnaTab from '../component/QnaTab';
import "../style/myPage.style.css"
import { useSelector } from 'react-redux';

const MyPage = () => {
  const [tab, setTab] = useState(0);
  const { user } = useSelector((state) => state.user);
  const isCurrentUser = true;

  return (
    <div className="my-page-container">
      <div className="profile-section">
        <img src={user.profileImage} alt="Profile" className="profile-image" />
        <div className="profile-info">
          <div className="user-info">
            <h2 className="user-name">
              {user.userName} <span className="user-rank">{user.rank}</span>
              {!isCurrentUser && <button className="follow-button">Follow</button>}
            </h2>
            <p className="stacks">{user.stacks.join(', ')}</p>
          </div>
          <div className="follow-info">
            <div className="follow-item">
              <p className="follow-label">Following</p>
              <p className="follow-count">{user.following ? user.following.length : 0}</p>
            </div>
            <div className="follow-item">
              <p className="follow-label">Followers</p>
              <p className="follow-count">{user.followers ? user.followers.length : 0}</p>
            </div>
          </div>
        </div>
        <p className="description">{user.description}</p>
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
      </Nav>
      <TabContent tab={tab} />
    </div>
  )
}

const TabContent = ({ tab }) => {
  if (tab === 0) {
    return <div className="post-tab-container">
      <PostTab />
      <PostTab />
      <PostTab />
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