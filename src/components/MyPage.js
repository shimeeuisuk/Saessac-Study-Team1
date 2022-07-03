import React, { useEffect, useState } from "react"
import axios from 'axios';

function MyPage() {
  const [user, setUser] = useState({});
  const [nickname, setNickname] = useState();
  const [editPopup, setEditPopup] = useState(false);

  //닉네임 수정 & 저장 버튼 클릭시
  const toggleEiditPopup = () => {
    setEditPopup(!editPopup);
  };

  // 회원정보 조회
  useEffect( () => {
    axios.get('http://34.168.215.145/user/1').then((res) => {
      setUser(...res.data);
      setNickname(res.data[0].nickName);
      console.log(res.data);
    })
  }, [])

  // 회원정보 수정(닉네임)
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }

  const submitNickname = () => {
    axios.put(`http://34.168.215.145/user/1?uid=${user.uid}`, {nickname})
    .then((res) => {
      console.log('put작동');
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  

  // 비밀번호 수정
  // useEffect( () => {
  //   axios.put(`http://34.168.215.145/user/1/password/?uid=${user.uid}`, {
  //   "currentuserpassword":,
  //   "userpassword":
  //   })
  // })


  return (
    <>
{/* section1 */}
      <section className="myInfo-1">
        {/* 1.이미지 수정 & 제거 */}
        <div className="thumbnail-area">
          <img src={`http://34.168.215.145/${user.userPicture}`} width="50px" alt="profile" />
          <button className="myInfo-btn">이미지 수정</button>
          <button className="myInfo-btn">이미지 제거</button>
        </div>
        {/* 2. 닉네임 수정 */}
        <div className="info-area">
            {/* 마이페이지 첫 렌더링 시 --> (수정버튼만 떠야함)*/}
            {/* 수정버튼 클릭시 --> (저장버튼이 떠야함) */}
            {editPopup ? (
              <form className="myInfo-nickNameInputForm">
              <input 
              type="text"
              placeholder="your nickname"
              className="myInfo-newNickName"
              defaultValue={nickname}
              onChange={handleNicknameChange}></input>
              <div className="button-wrapper">
                <button className="myInfo-btn" onClick={() => {
                  toggleEiditPopup();
                  submitNickname();
                  }}>저장</button>
              </div>
            </form>
            ) : (
              <div>
                <p>{user.userID}</p>
                <h2>{nickname}</h2>
                <button className="myInfo-btnUnderline" onClick={toggleEiditPopup}>수정</button>
              </div>
            )}
        </div>
      </section>

{/* section2 */}
      <section className="myInfo-2">
      {/* 1. 비밀번호 변경 */}
        <div className="myInfo-2-wrapper">
          <div className="title-wrapper">
            <h3>비밀번호 변경</h3>
          </div>
          <div className="contents-wrapper">
            {/* 첫 렌더링 시 */}
            <ul className="myInfo-password"></ul>
            <button className="myInfo-btnUnderline">변경</button>
            {/* 변경 클릭시 */}
            <form className="myInfo-passwordForm">
              <ul>
                <li>
                  <div className="description">현재 비밀번호</div>
                  <input placeholder="현재 비밀번호 입력" className="myInfo-presentPassword" value></input>
                </li>
                <li>
                  <div className="description">새 비밀번호</div>
                  <div className="error-description" color="red">8자리 이상 입력해주세요.</div>
                  <div className="error-description" color="red">영문, 숫자, 특수문자를 모두 포함해주세요.</div>
                  <input placeholder="영문, 숫자, 특수문자 포함 8자 이상" className="myInfo-newPassword" value></input>
                </li>
                <li>
                  <div className="description">새 비밀번호 확인</div>
                  <div className="error-description" color="red">비밀번호가 일치하지 않습니다.</div>
                  <input placeholder="영문, 숫자, 특수문자 포함 8자 이상" className="myInfo-newPassword" value></input>
                </li>
              </ul>
              <div className="button-wrapper">
                <button color="teal" className="myInfo-btn">저장</button>
              </div>
            </form>
          </div>
        </div>

      {/* 2. 회원정보 삭제 */}
        <div className="myInfo-2-wrapper">
          <div className="title-wrapper">
            <h3>회원정보 삭제</h3>
          </div>
          <div className="contents-wrapper">
            {/* 첫 렌더링 시 */}
            <button color="red" className="myInfo-btn">회원정보 삭제</button>
          </div>
          <div className="description">회원정보 삭제시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</div>
        </div>
        {/* 삭제 클릭시 */}
        <div className="myInfo-withdrawl-background1"></div>
        <div className="myInfo-withdrawl-background2">
          <div className="myInfo-withdrawl-container">
            <div className="myInfo-withdrawl-wrapper">
              <h3>회원정보 삭제</h3>
              <div className="myInfo-withdrawl-message">정말로 회원정보를 삭제하시겠습니까?</div>
              <div className="button-area">
                <button color="transparent" className="myInfo-btn">취소</button>
                <button color="teal" className="myInfo-btn">확인</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default MyPage;