import React from 'react'
import { useNavigate } from 'react-router-dom';

import meetingImg from "../asset/img/meeting-img-02.jpg"

const MeetUpTab = ({meetUp}) => {
    const navigate = useNavigate();
    const image = meetUp.image || meetingImg

    return (
        <div className="myPage-tab" onClick={() => { navigate(`/meetup/${meetUp._id}`) }}>
      <img src={image} alt="meetUpImage" className="myPage-image" />
    </div>
  )
}

export default MeetUpTab
