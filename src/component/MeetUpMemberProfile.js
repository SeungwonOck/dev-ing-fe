import React, { useEffect } from 'react';
import "../style/meetUpMemberProfile.style.css";

const MeetUpMemberProfile = ({ participant }) => {
    return (
        <div className='meetup-member'>
            <img src={participant?.profileImage} alt='' />
            <span>{participant?.nickName}</span>
        </div>
    )
}

export default MeetUpMemberProfile
