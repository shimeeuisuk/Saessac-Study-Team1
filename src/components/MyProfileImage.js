import React, { useState, useRef }from 'react';
import '../css/MyPage.css';
import axios from 'axios';
import {getLoginCookie } from '../lib/cookie';

export default function MyProfileImage({user}) {
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
  
  return (
      <div className="mypage-container__topleft">
        {/* preview가 빈 문자열이라면 디폴트이미지를, 빈문자열이 아니라면 preview이미지를 */}
        <img src={preview !== undefined ? preview : `http://34.168.215.145/${user.userPicture}`}
        width="50px" alt="profile-image" />
        <input 
              ref={imgInput} 
              className="mypage-btn greenbtn"
              type="file" 
              accept="image/*"
              onChange={(e)=>SaveImgFile(e)}
              style={{display:"none"}}
              ></input>
        <button className="mypage-btn greenbtn"  onClick={(e)=>onImgInputBtnClick(e)}>이미지 변경</button>        
        <button className="mypage-btn" onClick={()=>deleteImgFile()}>이미지 제거</button>
      </div>
    );
  
}

