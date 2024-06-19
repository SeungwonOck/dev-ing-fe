import React, { useState } from "react";
import "../style/login.style.css";
import { Link } from "react-router-dom";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginWithEmail = (event) => {
    event.preventDefault();

    // 로그인 버튼 작동 확인용
    if (window.confirm("로그인 하시겠습니까?")) {
      console.log("로그인 성공!");
    }
  }

  return (
    <div>
      <div className='login-title'>LOGIN</div>
      <div className="login-line" />
      <Container className="login-container">
        {/* {error && (
          <div>
            <Alert className="error-message" variant="danger">{error}</Alert>
          </div>
        )} */}

        <Form className="login-form" onSubmit={loginWithEmail}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Row>
              <Col md={4}>
                <Form.Label className="login-form-label">이메일 아이디</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  className="login-form-input"
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Row>
              <Col md={4}>
                <Form.Label className="login-form-label">비밀번호</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  className="login-form-input"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  required
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>

          <div className="login-button-container">
            <Button className='login-button' type="submit">
              로그인
            </Button>
          </div>

          <div className="login-button-container">
            <Button className="signup-button">
              <Link to="/register">이메일로 가입하기</Link>
            </Button>

          </div>


        </Form>
      </Container >
    </div>
  )
}

export default Login