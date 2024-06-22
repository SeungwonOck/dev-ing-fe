import React, { useEffect, useState } from 'react'
import { Nav } from 'react-bootstrap'
import PostTab from '../component/PostTab';
import MeetUpTab from '../component/MeetUpTab';
import QnaTab from '../component/QnaTab';
import "../style/myPage.style.css"

const MyPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="post">
        <Nav.Item>
          <Nav.Link onClick={() => {setTab(0)}} eventKey="post">Post</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {setTab(1)}} eventKey="meetUp">MeetUp</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => {setTab(2)}} eventKey="qna">Q&A</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}/>
    </div>
  )
}

const TabContent = ({ tab }) => {
  
  return (
    [<PostTab />, <MeetUpTab />, <QnaTab />][tab]
  )

}

export default MyPage