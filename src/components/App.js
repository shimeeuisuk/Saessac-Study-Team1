import "../css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Main from "./Main";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import MyPage from "./MyPage";
import PostWrite from "./PostWrite";
import Navbar from "./Navbar";
import RequireAuth from "./RequireAuth"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSignState } from '../action/action'
import { getLoginCookie } from '../lib/cookie'

const axios = require('axios')
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    (
      async () => {
        const res = await axios.get('http://34.168.215.145/user/checklogin', {headers: {authorization: getLoginCookie()}})
        dispatch(setSignState(res.data.msg))
      }
    )()
  })

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route 
          path="/signup" 
          element={
            <RequireAuth option={false}>
              <Signup />
            </RequireAuth>
          } 
        />
        <Route 
          path="/signin" 
          element={
            <RequireAuth option={false}>
              <Signin />
            </RequireAuth>
          } 
        />
        <Route 
          path="/mypage" 
          element={
            <RequireAuth option={true}>
              <MyPage />
            </RequireAuth>
          }
        />
        <Route path="/postlist" element={<PostList />}></Route>
        <Route path="/postdetail/:id" element={<PostDetail />}></Route>
        <Route path="/postwrite" element={<PostWrite />}></Route>
      </Routes>
      <Link to="/">
        <p>메인</p>
      </Link>
      <Link to="/signup">
        <p>회원가입</p>
      </Link>
      <Link to="/signin">
        <p>로그인</p>
      </Link>
      <Link to="/mypage">
        <p>마이페이지</p>
      </Link>
      <Link to="/postlist">
        <p>글 목록</p>
      </Link>
      <Link to="/postwrite">
        <p>글 작성</p>
      </Link>
    </div>
  );
}

export default App;
