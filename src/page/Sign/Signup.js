import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignContainer, SignupBox } from '../../components/Sign'

const axios = require('axios')

function Signup() {
  const [datas, setData] = useState({
    userid: "",
    userpassword: ""
  })
  const [checkidmsg, setIdMsg] = useState(<p>6 ~ 12자 사이의 영문과 숫자를 입력하세요</p>)
  const [checkpasswordmsg, setPasswordMsg] = useState(<p>8 ~ 16자 사이의 영문, 숫자, 특수문자를 조합하세요</p>)
  const [checkrepasswordmsg, setRePasswordMsg] = useState(<p> </p>)
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
      if(isValidId(datas.userid) && datas.userid !== ""){
        const res = await axios.get(`https://saessac.kro.kr:80/user/checkid?userid=${datas.userid}`)
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

    isValidPassword(datas.userpassword) ? setPasswordMsg(<p>비밀번호가 조건에 만족해요</p>) : setPasswordMsg(<p>8 ~ 16자 사이의 영문, 숫자, 특수문자를 조합하세요</p>)
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
      axios.post('https://saessac.kro.kr:80/user/insert', {
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
    <SignContainer>
      <SignupBox>
        <div className='signupTitle'>
          러너스 멤버 가입
        </div>
        <div className='signupSubTitle'>
          <p>멤버가 되어 러너스와</p>
          <p>당신의 시간을 채워보세요.</p>
        </div>
        <div className='signupInputContainer'>
          <div>
            <input placeholder='사용하실 ID를 입력해주세요.' onChange={getUserID} />
            <button onClick={checkUserID}>중복확인</button>
          </div>
          {checkidmsg}
          <div>
            <input placeholder='비밀번호를 입력하세요.' type="password" onChange={getUserPassword} />
          </div>
          {checkpasswordmsg}
          <div>
            <input placeholder='비밀번호를 다시 입력해주세요.' type="password" onChange={getUserRePassword} />
          </div>
          {checkrepasswordmsg}
        </div>
        <button onClick={trySignup}>회원가입</button>
        <p>이미 아이디가 있다면? <Link to="/signin"><span>로그인</span></Link></p>
      </SignupBox>
    </SignContainer>
  );
}

export default Signup;