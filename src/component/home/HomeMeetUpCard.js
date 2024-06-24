import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../style/home.style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const HomeMeetUpCard = ({ meetUp }) => {
    const navigate = useNavigate();

    const goToMeetUpDetail = () => {
        navigate(`/meetUp/${meetUp._id}`);
    }

    return (
        <div className='home-meet-up-card' onClick={() => goToMeetUpDetail(meetUp._id)}>
            <div className='img'><img src={meetUp.image} alt='' /></div>
            <div className='contents'>
                <div className='title'>{meetUp.title}</div>
                <div className='schedule green'><FontAwesomeIcon icon={faLocationDot} style={{ color: "#28A745", }} /> {meetUp.location === "online" ? (<span>온라인</span>) : (<span>{meetUp?.location.split(' ')[1]}</span>)} · {meetUp.date.date}</div>
                <div className='small-text'>{meetUp.organizer.nickName} · 선착순 {meetUp.currentParticipants}/{meetUp.maxParticipants}</div>
            </div>
        </div>
    )
}

export default HomeMeetUpCard
