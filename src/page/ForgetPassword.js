import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import '../style/forgetPassword.style.css'
import { commonUiActions } from '../action/commonUiAction';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { findUser } = useSelector((state) => state.user);
    const [ nickName, setNickName ] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ activeTab, setActiveTab ] = useState('name');
    
    const findPassword = () => {
        if(activeTab === 'name') {
            if(nickName === '') {
                dispatch(commonUiActions.showToastMessage('닉네임을 입력하세요', 'error'))
            } else if(name === '') {
                dispatch(commonUiActions.showToastMessage('이름을 입력하세요', 'error'))
            } else {
                dispatch(userActions.forgetPassword(nickName, name, email))
            }
        } else {
            if(email === '') {
                dispatch(commonUiActions.showToastMessage('이메일을 입력하세요', 'error'))
            } else {
                dispatch(userActions.forgetPassword(nickName, name, email))
            }
        }
    }

    const setNewPassword = () => {
        if(password === '') {
            dispatch(commonUiActions.showToastMessage('변경할 비밀번호를 입력하세요', 'error'))
            return;
        } 
        if(confirmPassword === '') {
            dispatch(commonUiActions.showToastMessage('비밀번호를 한번 더 입력해주세요', 'error'))
            return;
        } 
        if(password !== confirmPassword) {
            dispatch(commonUiActions.showToastMessage('비밀번호가 일치하지 않습니다', 'error'))
            return;
        }
        dispatch(userActions.setNewPassword(findUser[0]._id, password, navigate))
    }

    useEffect(()=>{
        if(activeTab === 'name') {
            setEmail('')
        } else {
            setName('')
            setNickName('')
        }
    },[activeTab])
    
    return (
        <div className='forget-password-form'>
            <div className='title'>비밀번호 찾기</div>
            {findUser ? 
            <>
                <input type='text' className='form-control mb-1' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='변경할 비밀번호를 입력하세요'/>
                <input type='text' className='form-control' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='비밀번호를 다시 입력해주세요'/>
                <div className='send-btn' onClick={() => setNewPassword()}>비밀번호 변경하기</div>
            </>
            :
            <>
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-1"
                    activeKey={activeTab}
                    onSelect={(key) => setActiveTab(key)}
                    fill
                >
                    <Tab eventKey="name" title="닉네임/이름으로 찾기">
                        <input type='text' className='form-control mb-1' value={nickName} onChange={(e) => setNickName(e.target.value)} placeholder='닉네임을 입력하세요'/>
                        <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} placeholder='이름을 입력하세요'/>
                    </Tab>
                    <Tab eventKey="email" title="이메일로 찾기">
                        <input type='text' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='이메일을 입력하세요'/>
                    </Tab>
                </Tabs>
                <div className='send-btn' onClick={() => findPassword()}>찾기</div>
            </>
            }
        </div>
    )
}

export default ForgetPassword