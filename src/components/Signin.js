import { useState } from 'react';
import { Link } from 'react-router-dom';

const axios = require('axios')

function Signin() {
  const [datas, setData] = useState({})

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

      console.log(data.uid)
    } catch(err){
      console.log(err)
    }
  }

  const pushEnter = (e) => {
    if(e.keyCode === 13) trySignin()
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