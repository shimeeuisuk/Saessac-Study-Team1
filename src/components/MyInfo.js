import React, { useState }from 'react';
import '../css/MyPage.css';
import axios from 'axios';
import {getLoginCookie } from '../lib/cookie';

export default function MyInfo({userID, nickname, introduce, setNickname, setIntroduce}){
  const [editPopup, setEditPopup] = useState(false);

  // 닉네임 수정 & 저장 버튼 클릭시
  const toggleEiditPopup = () => {
    setEditPopup(!editPopup);
  };

  // 닉네임 수정
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }
  // 자기소개 수정
  const handleIntroChange = (e) => {
    setIntroduce(e.target.value);
  }

  let data = {
    "nickname":nickname,
    "info":introduce
  }

  const submitNickname = () => {
    axios.put(`http://34.168.215.145/user/`, data, {headers: {Authorization: getLoginCookie()}} )
    .then((res) => {
      console.log('put작동');
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  return (
  <div className="contents-area">
    {editPopup ? (
      <div className="contents-area-2">
        <form className="myInfo-1-inputForm">
        <input 
        type="text"
        placeholder="바꿀 닉네임을 작성해주세요"
        className="myInfo-inputNickname"
        value={nickname}
        onChange={handleNicknameChange}></input>
        <input
        type="textarea"
        placeholder="자기 소개를 작성해주세요"
        className="myInfo-inputIntroduce"
        value={introduce}
        onChange={handleIntroChange}
        maxLength="70"
        ></input>
        <div className="button-wrapper">
          <button className="myInfo-btn greenbtn" onClick={() => {
            toggleEiditPopup();
            submitNickname();
            }} >저장</button>
        </div>
        </form>
      </div>
    ) : (
      <div className="contents-area-1">
        <div className="nameAndId-wrapper">
          <span>{nickname} </span>
          <span>{userID}</span>
        </div>
        <p className="introduce">{introduce}</p>
        <button className="myInfo-btnUnderline" onClick={toggleEiditPopup}>수정</button>
      </div>
    )}
  </div>
  );
}