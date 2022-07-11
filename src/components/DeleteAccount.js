import React, { useState }from 'react';
import '../css/MyPage.css';
import axios from 'axios';
import {getLoginCookie } from '../lib/cookie';

export default function DeleteAccount(){
  const [modal, setModal] = useState(false);
  
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
  <div>
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
  </div>

  );
}