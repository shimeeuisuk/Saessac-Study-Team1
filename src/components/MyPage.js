import React, { useEffect, useState } from "react"
import PostDetail from "./PostDetail";
import axios from 'axios';



function MyPage() {
  const [user, setUser] = useState({})
  useEffect( () => {
    axios.get('http://34.168.215.145/user/1').then((res) => {
      setUser(...res.data);  
      console.log(res.data);
    })
  }, [])
  return (
    <section className="myInfo">
      <div className="myInfo-container">
        <div className="myInfo-title">
          <h1>내 정보</h1>
        </div>
        <div className="myInfo-profile">
          <img src={`http://34.168.215.145/${user.userPicture}`} width="50px"/>
          <h3>{user.userID}</h3>
          <p>
            <span>{user.nickName}</span>
          </p>
        </div>
      </div>
      <div className="myCommunity-container">
        <div className="myCommunity-title">
          <h2>커뮤니티</h2>
        </div>
        <p>닉네임설정</p>
          <p>프로필사진설정</p>

        {/* <ul className="myPost">
          {filteredPosts.map(el => {
            return <PostDetail post={el} />
          })}
        </ul> */}
        <div className="mypost">
          <p>내가쓴글보기</p>
        </div>
      </div>
    </section>
  )
}
export default MyPage