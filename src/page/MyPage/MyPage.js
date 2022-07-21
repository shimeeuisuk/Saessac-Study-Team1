import React, { useEffect, useState } from "react"
import axios from 'axios';
import '../../css/MyPage.css';
import { getLoginCookie } from '../../lib/cookie';

import MyProfileImg from "../../components/MyProfileImg";
import MyActivityArea from "../../components/MyActivityArea";
import MyInfo from "../../components/MyInfo";
import DeleteAccount from "../../components/DeleteAccount";
import ChangePassword from "../../components/ChangePassword";
import MyPosts from "../../components/MyPosts";
import MyProfileImgLoading from "../../components/MyProfileImgLoading";

function MyPage() {
  const [user, setUser] = useState({});
  // 아이디, 닉네임, 자기소개
  const [userID, setUserID] =useState();
  const [nickname, setNickname] = useState();
  const [introduce, setIntroduce] = useState();
  // 주활동지역
  const [locations, setLocations] = useState([]);
  const [locationList, setLocationList] =useState([]);
  // 내가 쓴 글
  const [myPosts, setMyPosts] = useState([])
  // 로딩
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    // 회원정보 조회
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
    // 지역리스트 조회
    axios.get((`http://34.168.215.145/location/list`), {headers: {Authorization: getLoginCookie()}})
    .then((res) => {
      const data = res.data;
      setLocationList(data);
    })
    // 내가 쓴 글보기
    axios.get((`http://34.168.215.145/user/topic/`), {headers: {Authorization: getLoginCookie()}})
    .then((res) => {
      setIsLoading(true);
      setMyPosts(res.data);
      console.log(res.data);
      setIsLoading(false);
    })
  }, [])

  return (
    <div className="mypage-container">
      <section className="mypage-container__top">
        { isLoading ? <MyProfileImgLoading/> :< MyProfileImg user={user} />}
        <MyInfo userID={userID} nickname={nickname} introduce={introduce} setNickname={setNickname} setIntroduce={setIntroduce}/>
      </section>
      <section className="mypage-container__bottom">
        <MyActivityArea locations={locations} setLocations={setLocations} locationList={locationList}/>
        <MyPosts myPosts={myPosts}/> 
        <ChangePassword />
        <DeleteAccount />
      </section>
    </div>
  )
}
export default MyPage;