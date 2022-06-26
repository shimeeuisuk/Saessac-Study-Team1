import React, { useEffect, useState } from "react"
// import axios from 'axios';


function MyPage() {
  // const [todayDistance, setTodayDistance] = useState(0);

  // useEffect(()=>{
  // axios.get(url)
  //   .then((Response)=>{
  //   console.log(Response.data);
  //   setTodayDistance(data.distance) //
  //   })
  //   .catch((Error)=>{
  //   console.log(Error);
  //   })
  // , []})


  return (
    <div>
      <h3>호팍님이 총 뛰신 거리는 {}km 입니다</h3>
      <h3>오늘 뛴 거리는 {}km 입니다</h3>
      <h3>뜀박질로 인해 {}kcal가 소모됐습니다</h3>
      <h3>호팍님! {}일 연속으로 뛰었어요!</h3>
    </div>
  )
}
export default MyPage