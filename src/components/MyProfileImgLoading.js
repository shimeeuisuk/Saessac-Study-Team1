import React from 'react';
import '../css/MyPage.css';

export default function MyProfileImgLoading (){
  return (
    <div className="mypage-topleft__skeletonContainer">
      <div className="mypage-topleft__skeletonWrapper">
        <span className='mypage-topleft__skeletonImg'></span>
      </div>
      <button className="mypage-btn graybtn" >Loading...</button>        
      <button className="mypage-btn">이미지 제거</button>
    </div>
  )
}