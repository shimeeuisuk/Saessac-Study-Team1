import { useState } from 'react';

const axios = require('axios')

function Signup() {
  const [datas, setData] = useState({})
  const [checkidmsg, setIdMsg] = useState(<p></p>)
  const [checkpasswordmsg, setPasswordMsg] = useState(<p></p>)
  const [checkrepasswordmsg, setRePasswordMsg] = useState(<p></p>)
  const [isvalidreq, setValidReq] = useState([false, false])

  const isValidId = (str) => {
    let regExp = /^[A-Za-z0-9]{6,12}$/;
    return regExp.test(str)
  }

  const isValidPassword = (str) => {
    let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    return regExp.test(str)
  }

  const getUserID = (e) => {
    setData({...datas, userid: e.target.value})
    setValidReq([false, isvalidreq[1]])

    isValidId(datas.userid) ? setIdMsg(<p>체크버튼을 눌러주세요</p>) : setIdMsg(<p>6 ~ 12자 사이의 영문과 숫자를 입력하세요</p>)
  }

  const checkUserID = async () => {
    try{
      if(isValidId(datas.userid)){
        const res = await axios.get(`http://34.168.215.145/user/checkid?userid=${datas.userid}`)
        const data = res.data
        
        if(data.msg){
          setIdMsg(<p>사용 가능한 아이디에요</p>)
          setValidReq([true, isvalidreq[1]])
        }
        else {
          setIdMsg(<p>중복된 아이디에요</p>)
          setValidReq([false, isvalidreq[1]])
        }
      }else{
        setIdMsg(<p>아이디 조건을 만족해주세요</p>)
        setValidReq([false, isvalidreq[1]])
      }
    } catch(err){
      console.log(err)
    }
  }

  const getUserPassword = (e) => {
    setData({...datas, userpassword: e.target.value})
    setValidReq([isvalidreq[0], false])

    isValidPassword(datas.userpassword) ? setPasswordMsg(<p>비밀번호가 조건에 만족해요</p>) : setPasswordMsg(<p>8 ~ 16자 사이의 영문, 숫자, 특수문자를 최소 한가지씩 조합하세요</p>)
  }

  const getUserRePassword = (e) => {
    setData({...datas, userrepassword: e.target.value})
    setValidReq([isvalidreq[0], false])

    if(datas.userpassword === e.target.value){
      setRePasswordMsg(<p>비밀번호 일치해요</p>)
      setValidReq([isvalidreq[0], true])
    } else{
      setRePasswordMsg(<p>비밀번호 일치하지 않아요</p>)
      setValidReq([isvalidreq[0], false])
    }
  }

  const trySignup = () =>{
    if(isvalidreq.includes(false))console.log('만족못함')
    else{
      axios.post('http://34.168.215.145/user/insert', {
        userid: datas.userid,
        userpassword: datas.userpassword
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  return (
    <div>
      <p>회원가입</p>
      <div>
        <p>id</p><input onChange={getUserID} />
        <button onClick={checkUserID}>check ID</button>
        {checkidmsg}
        <p>password</p><input type="password" onChange={getUserPassword} />
        {checkpasswordmsg}
        <p>password</p><input type="password" onChange={getUserRePassword} />
        {checkrepasswordmsg}
        <div onClick={trySignup}>Login</div>
      </div>
    </div>
  );
}

export default Signup;