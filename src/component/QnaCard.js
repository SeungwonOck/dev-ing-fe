import React from 'react'
import "../style/qna.style.css";
import { Row, Col } from 'react-bootstrap';

const QnaCard = () => {

    return (
        <div className='qna-card-container'>
            <Row>
                <Col md={10}>
                    <div className='qna-card-title'>ㅇㅇ 에러 관련 질문!</div>
                    <div className='qna-card-content'>질문 있어요! 저는 왜 이런 오류가 생길까요? 혹시 저와 같은 문제를 겪으신 분들은 어떻게 해결하셨나요?</div>
                </Col>
                <Col md={2}>
                    <img className="qng-card-img" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nfGVufDB8fDB8fHww" /></Col>
            </Row>
            <div className='author'>
                <img src="https://cdn-icons-png.flaticon.com/128/847/847969.png" />
                <span>홍길동</span>
            </div>

        </div>
    )
}

export default QnaCard
