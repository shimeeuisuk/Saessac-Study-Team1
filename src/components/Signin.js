import { setSignState, setUserData } from 'action/action';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginCookie } from '../lib/cookie'
import { SigninContainer, SigninBox } from './Sign'

const axios = require('axios')

function Signin({viewModal, setModal}) {
  const [datas, setData] = useState({
    userid: "",
    userpassword: ""
  })
  const [loginMsg, setLoginMsg] = useState(false)

  const dispatch = useDispatch()
  let navigate = useNavigate();

  const getUserID = (e) => {
    setData({...datas, userid: e.target.value})
  }

  const getUserPassword = (e) => {
    setData({...datas, userpassword: e.target.value})
  }

  const trySignin = async () => {
    try{
      const res = await axios.post('http://34.168.215.145/user/login', 
      {
        userid: datas.userid,
        userpassword: datas.userpassword
      })
      const data = res.data
      if(data.msg){
        setLoginCookie(data.token)
        delete data.token
        dispatch(setSignState(data.msg))
        delete data.msg
        dispatch(setUserData(data))
        navigate('/');
        setModal(false)
      } else {
        setLoginMsg(true)
      }
    } catch(err){
      console.log(err)
    }
  }

  const pushEnter = (e) => {
    if(e.key === 'Enter') trySignin()
  } 

  const closeModal = (event) => {
    if(event.target.className.includes('SigninContainer') && viewModal) setModal(false)
  }

  return(
    <SigninContainer className='SigninContainer' onClick={closeModal}>
      <SigninBox>
        <div className='logoBox'>
          RUNNERS
        </div>
        <div className='signinTitle'>
          러너스 로그인
        </div>
        <input placeholder='아이디' value={datas.userid} onChange={getUserID} onKeyUp={pushEnter} />
        <input placeholder='비밀번호' type='password' value={datas.userpassword} onChange={getUserPassword} onKeyUp={pushEnter} />
        <div className='loginBox' onClick={trySignin}>
          로그인
        </div>
        {
          loginMsg ? 
          <div className='loginMsg'>ID와 비밀번호를 확인해주세요</div> :
          <div className='loginMsg'></div>
        }
        <div className='registerInfo'>
          회원이 아니신가요? <div onClick={() => setModal(false)}><Link to="/signup">회원가입</Link></div>
        </div>
      </SigninBox>
    </SigninContainer>
  )
}

export default Signin;