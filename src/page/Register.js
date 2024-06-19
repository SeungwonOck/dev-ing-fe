import React, { useEffect, useState } from "react";
import "../style/login.style.css";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { userActions } from "../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });
  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);
  const { error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    return () => {
      dispatch(userActions.clearError());
    };
  }, [dispatch]);

  const register = (event) => {
    event.preventDefault();
    const { userName, email, password, confirmPassword, policy } = formData;

    // 비번 중복확인 일치하는지 확인
    if (password !== confirmPassword) {
      setPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    }
    else {
      setPasswordError("");
    }

    // 이용약관에 체크했는지 확인
    if (!policy) {
      setPolicyError(true);
      return;
    }
    else {
      setPolicyError(false);
    }

    setPasswordError("");
    setPolicyError(false);
    console.log("e, n, p", email, userName, password);
    dispatch(userActions.register({ email, userName, password }, navigate));
  };

  const handleChange = (event) => {
    // 값을 읽어서 FormData에 넣어주기
    const { id, value, checked } = event.target;

    if (id == "policy") {
      setFormData({ ...formData, [id]: checked });
    }
    else {
      setFormData({ ...formData, [id]: value });
    }

  };


  return (
    <div>
      <div className='login-title'>JOIN MEMBER</div>
      <div className="login-line" />
      <Container className="register-container">
        {error && (
          <div>
            <Alert variant="danger" className="error-message">
              {error}
            </Alert>
          </div>
        )}
        <Form onSubmit={register}>
          <Form.Group className="mb-3">
            <Form.Label className="login-form-label">이메일 아이디<a style={{ color: "#28A745" }}>*</a></Form.Label>
            <Form.Control
              className="login-form-input"
              type="email"
              id="email"
              placeholder="이메일 아이디를 @까지 정확하게 입력하세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="login-form-label">이름<a style={{ color: "#28A745" }}>*</a></Form.Label>
            <Form.Control
              className="login-form-input"
              type="text"
              id="userName"
              placeholder="ex)홍길동"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="login-form-label">비밀번호<a style={{ color: "#28A745" }}>*</a></Form.Label>
            <Form.Control
              className="login-form-input"
              type="password"
              id="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="login-form-label">비밀번호 확인<a style={{ color: "#28A745" }}>*</a></Form.Label>
            <Form.Control
              className="login-form-input"
              type="password"
              id="confirmPassword"
              placeholder="비밀번호를 다시 입력해주세요"
              onChange={handleChange}
              required
              isInvalid={passwordError}
            />
            <Form.Control.Feedback type="invalid">
              {passwordError}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="이용 약관에 동의합니다"
              id="policy"
              onChange={handleChange}
              isInvalid={policyError}
              checked={formData.policy}
            />
          </Form.Group>
          <div className="login-button-container">
            <Button className="login-button" type="submit">
              회원가입
            </Button>
          </div>

        </Form>
      </Container>
    </div>
  )
}

export default Register