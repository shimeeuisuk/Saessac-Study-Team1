import React, { useEffect, useState } from "react"
import axios from 'axios';
import '../../css/MyPage.css';
import {getLoginCookie } from '../../lib/cookie';

import MyProfileImage from "../../components/MyProfileImage";
import MyActivityArea from "../../components/MyActivityArea";
import MyInfo from "../../components/MyInfo";
import DeleteAccount from "../../components/DeleteAccount";
import ChangePassword from "../../components/ChangePassword";

function MyPage() {
  const [user, setUser] = useState({});
  // 아이디, 닉네임, 자기소개
  const [userID, setUserID] =useState();
  const [nickname, setNickname] = useState();
  const [introduce, setIntroduce] = useState();
  // 주활동지역
  const [locations, setLocations] = useState([]);
  const [locationList, setLocationList] =useState([]);
  // 로딩
  const [isLoading, setIsLoading] = useState(true);

  // 회원정보 조회
  useEffect( () => {
    axios.get((`http://34.168.215.145/user/`), {headers: {Authorization: getLoginCookie()}})
    .then((res) => {
      setIsLoading(true);
      console.log(res.data.data);
      setUser(res.data.data);
      setUserID(res.data.data.userID);
      setNickname(res.data.data.nickName);
      setIntroduce(res.data.data.info);
      setLocations(res.data.data.favoritLocation);
      setIsLoading(false);
    })
  }, [])

  // 지역리스트 조회
  useEffect( () => {
    axios.get((`http://34.168.215.145/location/list`), {headers: {Authorization: getLoginCookie()}})
    .then((res) => {
      const data = res.data;
      setLocationList(data);
    })
  }, [])

  return (
    <div className="mypage-container">
      <section className="mypage-container__top">
        { isLoading ? <div>로딩중 ...</div> :< MyProfileImage user={user} />}
        <MyInfo userID={userID} nickname={nickname} introduce={introduce} setNickname={setNickname} setIntroduce={setIntroduce}/>
      </section>
      <section className="mypage-container__bottom">
        <MyActivityArea locations={locations} setLocations={setLocations} locationList={locationList}/>
        {/* 2. 내가 쓴 글 & 댓글 보기 */}
        <div className="mypage-bottom__wrapper">
            <div className="mypage-bottomleft__title">
              <h3>내가 쓴 글</h3>
            </div>
            <div className="mypage-bottomright__content">
            </div>
        </div>   
        <ChangePassword />
        <DeleteAccount />
      </section>
    </div>
  )
}
export default MyPage;