import "../css/App.css";
import { Routes, Route, Link } from "react-router-dom";
import Signup from "../page/Sign/Signup";
import Signin from "../page/Sign/Signin";
import Main from "./Main";
import PostList from "./PostList";
import PostDetail from "./PostDetail";
import MyPage from "../page/MyPage/MyPage";
import PostWrite from "./PostWrite";
import { PostListPage } from "page/Post/PostListPage";
import Navbar from "./Navbar";
import RequireAuth from "./RequireAuth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSignState } from "../action/action";
import { getLoginCookie } from "../lib/cookie";
import Loading from "../components/Loading";
import Weather from "./Weather";
import Chat from "./Chat";

const axios = require("axios");

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://34.168.215.145/user/checklogin", {
        headers: { authorization: getLoginCookie() },
      });
      dispatch(setSignState(res.data.msg));
      setLoading(false);
    })();
  });

  if (loading) return <Loading></Loading>;

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
        <Route path="/postlist" element={<PostListPage />}></Route>
        <Route path="/postdetail/:id" element={<PostDetail />}></Route>
        <Route path="/postwrite" element={<PostWrite />}></Route>
        <Route path="/weather" element={<Weather />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
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
      <Link to="/chat">
        <p>댓글</p>
      </Link>
    </div>
  );
}

export default App;
