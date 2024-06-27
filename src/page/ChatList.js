// ChatList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/chatlist.style.css';

const chatRooms = [
  { id: 1, title: '이 문제 어케 풀어요', author: '민', replies: 11, lastMessage: '긴 문제' },
  { id: 2, title: '코드 리뷰 가능할까요??', author: 'admin', replies: 2, lastMessage: '안녕하세요...' },
  // 다른 채팅방 데이터 추가
];

const ChatList = () => {
  const navigate = useNavigate();

  return (
    <div className="chat-list-container">
      <h1>채팅방 리스트</h1>
      {chatRooms.map((room) => (
        <div key={room.id} className="chat-room-card" onClick={() => navigate(`/chat/${room.id}`)}>
          <div className="chat-room-details">
            <div className="chat-room-title">{room.title}</div>
            <div className="chat-room-author">{room.author}</div>
            <div className="chat-room-replies">답변: {room.replies}</div>
          </div>
          <div className="chat-room-last-message">{room.lastMessage}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
