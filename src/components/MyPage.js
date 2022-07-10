import React, { useEffect, useState, useRef } from "react"
import axios from 'axios';
import '../css/MyPage.css';
import {getLoginCookie } from '../lib/cookie';

function MyPage() {
  const [user, setUser] = useState({});
  // 아이디
  const [userID, setUserID] =useState();
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
  // 주활동지역
  // const [locations, setLocations] =useState('');

  // 회원정보 조회
  useEffect( () => {
    axios.get((`http://34.168.215.145/user/`), {headers: {Authorization: getLoginCookie()}})
    .then((res) => {
      console.log(res.data.data);
      setUser(res.data.data);
      setUserID(res.data.data.userID);
      setNickname(res.data.data.nickName);
      setIntroduce(res.data.data.info);
      // setLocation(res.data.data.group_concat(locationName));
      console.log(res.data.data.group_concat);
      // setImgFile(`{http://34.168.215.145/${res.data.data.userPicture}}`);
      // console.log(res.data.data.group_concat);
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
    axios.put(`http://34.168.215.145/user/`, data, {headers: {Authorization: getLoginCookie()}} )
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
      setRePwMsg(<p>현재 비밀번호와 같아 비밀번호가 변경되지 않습니다</p>)
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
      return;
    }
    if(currentPw !== newPw && newPw === newPwCheck) {
    axios.put(`http://34.168.215.145/user/password/`, password, {headers: {Authorization: getLoginCookie()}})
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
  axios.delete((`http://34.168.215.145/user/`), {headers: {Authorization: getLoginCookie()}})
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
        < ImageUpload user={user} />
        {/* 2. 닉네임, 자기소개*/}
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
      </section>
      
{/* section2 */}
      <section className="myInfo-2">
      {/* 1.주활동지역 */}
      <FavoriteLocation />
      {/* 2. 내가 쓴 글 & 댓글 보기 */}
      <div className="myInfo-2-wrapper">
          <div className="title-wrapper">
            <h3>내가 쓴 글</h3>
          </div>
          <div className="contents-wrapper">

          </div>
      </div>   

      {/* 3. 비밀번호 변경 */}
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
      {/* 4. 회원정보 삭제 */}
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



// -----------------
// 주활동지역
// -----------------
function FavoriteLocation({user}) {
  // locations ='강남구,강동구,강북구'
  // setLocations(locatons.split(','));   //['강남구', '강동구', '강북구']
  // li(태그) 에 뿌려주기
  const example = [{
    "lid": 5,
  "locationName": "강남구"
  },
  {
    "lid": 7,
    "locationName": "강동구"
  },
  {
    "lid": 8,
    "locationName": "강북구"
  }];

  // --------------------------
  // 아래에 tags 를 locations 로 대체
  // --------------------------

  const initialTags = ['마포구', '서대문구'];
  const [input, setInput] = useState('');
  const [tags, setTags] = useState(initialTags);
  // 장소삭제
  const removeLocation = (indexToremove) => {
    let restTags = tags.filter((el, index) => {
      return index !== indexToremove
    })
    setTags(restTags);

    let loc = tags.filter((el, index) => {
      return index === indexToremove;
    })

    let data = {
      uid:50,
      lid:loc[0].lid
    }
    axios.delete(`http://34.168.215.145/favoritlocation`, data, {headers: {Authorization: getLoginCookie()}})
  } 

  // 장소추가
  const inputLocationChange = (e) => {
    setInput(e.target.value);
  }
  const addLocations = (e) => {
  if(!input) { return;}

  for( let el of tags) {
    if(el === input) { return; }
  }

  if(e.key === "Enter") {
    setTags((prevState) => {
      return [...prevState, input];
    });

    let loc = example.filter((el) => {
      return el.locationName === input
    })

    let data = {
      userid:50,
      locationid:loc[0].lid
    }
    
    axios.post(`http://34.168.215.145/favoritlocation/insert`, data, {headers: {Authorization: getLoginCookie()}} )
    .then((res) => {
      
      console.log('지역등록');
      
    })
    .catch((err) =>{
      console.log(err);
    })
    setInput('');
  }
  
  }

  return (
    <div className="favoriteLocations-container">
      <div className="favoriteLocations-title-wrapper">
        <h3 className="favoriteLocations-title">나의 활동지역</h3>
      </div>
      <div className="favoriteLocations-contents">
        <ul className="favoriteLocations">
          {tags.map((tag, index) => (
            <li key={index} className="favoriteLocation">
              <span className="loc-title">{tag}</span>
              <span className="loc-close-icon" onClick={()=>removeLocation(index)}>✕</span>
            </li>
          ))}
        </ul>
        <input
          className="favoriteLocation-input"
          type="text"
          onKeyUp={(e)=>{addLocations(e)}}
          onChange={inputLocationChange}
          value={input}
          placeholder="Press Enter to add tags"
        />
      </div>
    </div>
  )
}


//------------------
// 이미지 수정
//------------------
function ImageUpload({user}) {
  const [preview, setPreview] = useState(undefined);
  const imgInput = useRef(null);

  // 이미지 수정 input 과 button 연결
  const onImgInputBtnClick = (e) => {
    e.preventDefault();
    imgInput.current.click();
  }
  
  // 이미지 수정 및 서버에 저장
  const SaveImgFile = (e) => {
    e.preventDefault();
    URL.revokeObjectURL(URL.revokeObjectURL(preview));  // 기존 preview 폐기
    setPreview(URL.createObjectURL(e.target.files[0]));  // 프리뷰 설정
    
    // 서버로 전송
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const config ={
      headers : {
        Authorization: getLoginCookie(),
        'content-type': 'multipart/form-data'
      }
    };
    axios.post('http://34.168.215.145/user/picture', formData, config)
    .then((res) => {
      console.log('서버에 이미지 등록완료');
    })
    .catch((err) => {
      console.log('이미지등록에러');
      })
    
  }  

  // 이미지 삭제
  const deleteImgFile = () => {
    axios.put(`http://34.168.215.145/user/picture`, {}, {headers: {Authorization: getLoginCookie()}} )
    .then((res) => {
      console.log('이미지 삭제 완료');
    })
    .catch((err) =>{
      console.log(err);
    })

    // console.log("deletebtn clicked");
    setPreview(URL.revokeObjectURL(preview));   // preview 폐기
    console.log(preview);

  }
    //axios 서버에 이미지 제거 요청(userPicture가 디폴트이미지로)
  
  return (
      <div className="thumbnail-area">
        {/* preview가 빈 문자열이라면 디폴트이미지를, 빈문자열이 아니라면 preview이미지를 */}
        <img src={preview !== undefined ? preview : `http://34.168.215.145/${user.userPicture}`}
        width="50px" alt="profile" />
        <input 
              ref={imgInput} 
              className="myInfo-btn greenbtn"
              type="file" 
              accept="image/*"
              onChange={(e)=>SaveImgFile(e)}
              style={{display:"none"}}
              ></input>
        <button className="myInfo-btn greenbtn"  onClick={(e)=>onImgInputBtnClick(e)}>이미지 변경</button>        
        <button className="myInfo-btn" onClick={()=>deleteImgFile()}>이미지 제거</button>
      </div>
    );
  
}

