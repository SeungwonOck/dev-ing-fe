import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import '../style/forgetPassword.style.css'
import { commonUiActions } from '../action/commonUiAction';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../action/userAction';

const ForgetPassword = () => {
    const dispatch = useDispatch();
    const { findUser } = useSelector((state) => state.user);
    const [ nickName, setNickName ] = useState(null);
    const [ email, setEmail ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ activeTab, setActiveTab ] = useState('name');

    console.log(findUser)
    
    const findPassword = () => {
        if(activeTab === 'name') {
            if(!nickName) {
                dispatch(commonUiActions.showToastMessage('닉네임을 입력하세요', 'error'))
            } else {
                dispatch(userActions.forgetPassword(nickName, email))
            }
        } else {
            if(!email) {
                dispatch(commonUiActions.showToastMessage('이메일을 입력하세요', 'error'))
            } else {
                dispatch(userActions.forgetPassword(nickName, email))
            }
        }
    }

    const setNewPassword = () => {
        if(!password) {
            dispatch(commonUiActions.showToastMessage('변경할 비밀번호를 입력하세요', 'error'))
        } else {
            console.log()
        }
    }

    useEffect(()=>{
        if(activeTab === 'name') {
            setEmail(null)
        } else {
            setNickName(null)
        }
    },[activeTab])
    
    return (
        <div className='forget-password-form'>
            <div className='title'>비밀번호 찾기</div>
            {findUser ? 
            <>
                <input type='text' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='변경할 비밀번호를 입력하세요'/>
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
                    <Tab eventKey="name" title="닉네임으로 찾기">
                        <input type='text' className='form-control' value={nickName} onChange={(e) => setNickName(e.target.value)} placeholder='이름을 입력하세요'/>
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