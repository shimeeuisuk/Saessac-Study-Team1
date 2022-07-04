import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setLoginCookie } from '../lib/cookie'

const axios = require('axios')

function Signin() {
  const [datas, setData] = useState({})
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

      setLoginCookie(data.token)
      navigate('/');
    } catch(err){
      console.log(err)
    }
  }

  const pushEnter = (e) => {
    if(e.key === 'Enter') trySignin()
  }

  return(
    <div>
      <p>로그인</p>
      <p>id</p><input onChange={getUserID} onKeyDown={pushEnter} />
      <p>password</p><input type="password" onChange={getUserPassword} onKeyDown={pushEnter} />
      <Link to="/signup"><p>회원가입</p></Link>
      <div onClick={trySignin}>Login</div>
    </div>
  )
}

export default Signin;