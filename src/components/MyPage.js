import React, { useEffect, useState } from "react"
import axios from 'axios';
import '../css/MyPage.css';

function MyPage() {
  const [user, setUser] = useState({});
  // 닉네임, 자기소개
  const [editPopup, setEditPopup] = useState(false);
  const [nickname, setNickname] = useState();
  const [introduce, setIntroduce] = useState();
  // 비밀번호 변경
  const [pwPopup, setPwPopup] = useState(false);
  const [currentPw, setCurrentPw] = useState();
  const [newPw, setNewPw] = useState();
  const [newPwCheck, setNewPwCheck] = useState();
  const [currentPwMsg, setCurrentPwMsg] = useState();
  const [pwMsg, setPwMsg] = useState();
  const [rePwMsg, setRePwMsg] = useState();
  // 회원정보 삭제
  const [modal, setModal] = useState(false);
  // 좋아하는 장소 추가
  // const initialTags = ['마포구', '서대문구'];
  // const [favoriteLocation, setFavoriteLocation] = useState('');
  // const [tags, setTags] = useState(initialTags);

  
  // 회원정보 조회
  useEffect( () => {
    axios.get(`http://34.168.215.145/user/1`).then((res) => {
      setUser(...res.data);
      setNickname(res.data[0].nickName);
      setIntroduce(res.data[0].info);
      console.log(res.data);
    })
  }, [])

  // 닉네임 수정 & 저장 버튼 클릭시
  const toggleEiditPopup = () => {
    setEditPopup(!editPopup);
  };
 // 자기소개 수정 & 저장 버튼 클릭시
  const togglePwPopup = () => {
    setPwPopup(!pwPopup);
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
    axios.put(`http://34.168.215.145/user/${user.uid}?uid=${user.uid}`, data)
    .then((res) => {
      console.log('put작동');
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  // 비밀번호 유효성검사
  const isValidPassword = (str) => {
    let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    return regExp.test(str)
  }

  //현재 비밀번호
  const inputCurrentPw = (e) => {
    setCurrentPw(e.target.value);
    isValidPassword(e.target.value) ? setCurrentPwMsg(<p>비밀번호가 조건에 만족해요</p>) : setCurrentPwMsg(<p>8 ~ 16자 사이의 영문, 숫자, 특수문자를 최소 한가지씩 조합하세요</p>)
  }
  // 새 비밀번호
  const inputNewPw = (e) => {
    setNewPw(e.target.value);
    if( currentPw === e.target.value) {
      setPwMsg(<p>현재 비밀번호와 같습니다</p>);
    } else if( currentPw !== e.target.value && isValidPassword(e.target.value) ) {
      setPwMsg(<p>비밀번호가 조건에 만족해요</p>) 
    } else if (currentPw !== e.target.value && !isValidPassword(e.target.value)) {
      setPwMsg(<p>8 ~ 16자 사이의 영문, 숫자, 특수문자를 최소 한가지씩 조합하세요</p>)
    }
  }

  // 새 비밀번호 확인
  const inputNewPwCheck = (e) => {
    setNewPwCheck(e.target.value);
    if(currentPw === e.target.value && newPw === e.target.value) {
      setRePwMsg(<p>현재 비밀번호와 같습니다</p>)
    } else if ( newPw === e.target.value) {
      setRePwMsg(<p>비밀번호가 일치합니다</p>)
    } else {
      setRePwMsg(<p>비밀번호가 일치하지 않습니다</p>)
    }
  } 

  // 비밀번호 변경
  let password = {
    "currentuserpassword":currentPw,
    "userpassword":newPw
    }
  const submitChangedPw = () => {
    if(currentPw === newPw && newPw === newPwCheck) {
      prompt('현재비밀번호와같습니다'); //좀더 이쁘게 만들기(modal창)
      return;
    }
    if(currentPw !== newPw && newPw === newPwCheck) {
    axios.put(`http://34.168.215.145/user/password/${user.uid}?uid=${user.uid}`, password)
    .then((res) => {
      console.log('비번변경');
    })
    .catch((err) => { 
      console.log(err);
    })
    }
}

// 회원 탈퇴
const modalHandler = () => {
  setModal(!modal);
}
const deleteAccountHandler = () => {
  axios.delete(`http://34.168.215.145/user/${user.uid}?uid=${user.uid}`)
  .then((res) => {
    console.log('계정삭제완료');
  })
  .catch((err) => {
    console.log(err);
  })
}

  return (
    <div className="myInfo-container">
{/* section1 */}
      <section className="myInfo-1">
        {/* 1.이미지 수정 & 제거 */}
        <div className="thumbnail-area">
          <img src={`http://34.168.215.145/${user.userPicture}`} width="50px" alt="profile" />
          <button className="myInfo-btn greenbtn">이미지 수정</button>
          <button className="myInfo-btn">이미지 제거</button>
        </div>
        {/* 2. 닉네임 수정, 자기소개, 주활동지역 */}
        <div className="contents-area">
          {/* 마이페이지 첫 렌더링 시 --> (수정버튼만 떠야함)*/}
          {/* 수정버튼 클릭시 --> (저장버튼이 떠야함) */}
          {editPopup ? (
            <div className="contents-area-2">
              <form className="myInfo-1-inputForm">
              <input 
              type="text"
              placeholder="바꿀 닉네임을 작성해주세요"
              className="myInfo-inputNickname"
              defaultValue={nickname}
              onChange={handleNicknameChange}></input>
              <input
              type="text"
              placeholder="자기 소개를 작성해주세요"
              className="myInfo-inputIntroduce"
              defaultValue={introduce}
              onChange={handleIntroChange}
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
                <span>{user.userID}</span>
              </div>
              <p className="introduce">{introduce}</p>
              <button className="myInfo-btnUnderline" onClick={toggleEiditPopup}>수정</button>
            </div>
          )}
                  {/* <div className="favoriteLocations-container">
                    <ul className="favoriteLocations">
                      {Locations.map((location, index) => (
                        <li key={index} className="favoriteLocation">
                          <span className="loc-title">{location}</span>
                          <span className="loc-close-icon" onClick={()=>removeLocation(index)}>✕</span>
                        </li>
                      ))}
                    </ul>
                    <input
                      className="favoriteLocation-input"
                      type="text"
                      onKeyUp={(e)=>{addLocations(e)}}
                      onChange={InputLocationhandler}
                      value={location}
                      placeholder="Press Enter to add tags"
                    />
                  </div> */}
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
            { pwPopup ? (
              <form className="passwordForm">
                <ul className="passwordForm-container">
                  <li className="passwordForm-wrapper">
                    <div className="description">현재 비밀번호</div>
                    <input
                    type="password"
                    className="passwordInput" 
                    value={currentPw} 
                    onChange={inputCurrentPw}></input>
                    {currentPwMsg}
                  </li>
                  <li className="passwordForm-wrapper">
                    <div className="description">새 비밀번호</div>
                    <input
                    type="password"
                    className="passwordInput" 
                    value={newPw}
                    onChange={inputNewPw}
                    ></input>
                    {pwMsg}
                  </li>
                  <li className="passwordForm-wrapper">
                    <div className="description">새 비밀번호 확인</div>
                    <input
                    type="password"
                    className="passwordInput"
                    value={newPwCheck}
                    onChange={inputNewPwCheck}
                    ></input>
                    {rePwMsg}
                  </li>
                </ul>
                <div className="button-wrapper">
                  <button color="teal" className="myInfo-btn greenbtn" onClick={() => {
                    togglePwPopup();
                    submitChangedPw();
                    }}
                    >저장</button>
                </div>
              </form>
            ) : (
              <div className="button-wrapper">
                <button className="myInfo-btnUnderline" onClick={togglePwPopup}>변경</button>
              </div>
            )}
          </div>
        </div>
      {/* 2. 회원정보 삭제 */}
        <div className="myInfo-2-wrapper">
          <div className="title-wrapper">
            <h3>회원정보 삭제</h3>
          </div>
          <div className="contents-wrapper">
          <div className="deleteAcount-container">
            <div className="redbutton-area">
              <button className="myInfo-btn redbtn" onClick={modalHandler}>회원정보 삭제</button>
            </div>
            
            { modal ? (
                <div className="deleteAcount-background" onClick={modalHandler}>
                  <div className="modalView">
                      <h3>회원정보 삭제</h3>
                      <div className="deleteAccount-msg">정말로 회원정보를 삭제하시겠습니까?</div>
                      <div className="button-area">
                        <button className="myInfo-btn" onClick={modalHandler}>취소</button>
                        <button className="myInfo-btn greenbtn" onClick={deleteAccountHandler}>확인</button>
                      </div>
                  </div>
                </div>
              ) : (
                null
              )}
            </div>
          </div>
        </div>
        <div className="description-area">
          <div className="description">회원정보 삭제시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.</div>    
        </div>
      </section>
    </div>
  )
}
export default MyPage;