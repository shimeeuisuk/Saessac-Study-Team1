import React, { useState }from 'react';
import '../css/MyPage.css';
import axios from 'axios';
import {getLoginCookie } from '../lib/cookie';

export default function MyActivityArea({locations, setLocations, locationList}){
  const [input, setInput] = useState('');
  // 장소삭제
  const deleteLocation = (indexToremove, lid) => {
  let restTags = [];
  let deletedTag = [];
  let deletedLid = 0;
  deletedTag = locations.filter((el, index) => {
    return el[0] === lid;
  })
  deletedLid = parseInt(deletedTag[0]);

  restTags = locations.filter((el, index) => {
    return index !== indexToremove
  })
  setLocations(restTags);

  axios.delete(`http://34.168.215.145/favoritlocation?lid=${deletedLid}`, {headers: {Authorization: getLoginCookie()}})
  .then((res) => {
    console.log('주활동지역 삭제완료');
  })
} 

// 장소추가
const inputLocationChange = (e) => {
  setInput(e.target.value);
}
const addLocations = (e) => {
  const list = locationList.slice();
  // console.log(list);
  // 빈 문자열 입력시
  if( !input ) {return;}

  // 기존 태그와 중복되는 태그 추가 막기
  for( let j=0; j<locations.length; j++) {
    if( locations[j][1] === input ) {return console.log('중복된태그');}
  }
  // "지역구"인 문자만 입력받기 (그외는 return;) 
  if( e.key === "Enter"){
    for( let i=0; i<list.length; i++) {
      if( list[i].locationName === input ) {
        setLocations((prevState) => {return [...prevState, [list[i].lid, input]]; })
      }
      // if( list[i].locationName !== input ) {
      //   return setInput('');
      // } 
    }
  }

  //서버에 추가된 장소전송
  if(e.key === "Enter"){
    let addedLocation = locationList.filter((el) => {
      return el.locationName === input
    })

    let data = {
      locationid:addedLocation[0].lid
    }
    axios.post(`http://34.168.215.145/favoritlocation/insert`, data, {headers: {Authorization: getLoginCookie()}} )
    .then((res) => {
      console.log('주활동지역 등록완료');
    })
    .catch((err) =>{
      console.log(err);
    })
    setInput('');
  }
}

  return (
  <div className="mypage-bottom__wrapper">
    <div className="mypage-bottomleft__title">
      <h3>나의 활동지역</h3>
    </div>
    <div className="mypage-bottomright__content-activityArea">
      <ul className="mypage-bottomright__activityAreas">
        {locations.map((tag, index) => {
          return (
          <li key={index} className="mypage-bottomright__activityArea">
            <span className="mypage-bottomright__activityArea-name">{tag[1]}</span>
            <span className="mypage-bottomright__activityArea-closeicon" onClick={()=>deleteLocation(index, tag[0])}>✕</span>
          </li>
          );
        }
      )}
      </ul>
      <input
        className="mypage-bottomright__activityAreaInput"
        type="text"
        onKeyUp={(e)=>{addLocations(e)}}
        onChange={inputLocationChange}
        value={input}
        placeholder="Press Enter to add tag"
        size='10'
      />
    </div>
  </div>
  );
}