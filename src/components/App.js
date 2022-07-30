import "../css/App.css";
import { Routes, Route } from "react-router-dom";
import Signup from "../page/Sign/Signup";
import Signin from "./Signin";
import Main from "./Main";
import PostDetail from "../page/Post/PostDetailPage";
import MyPage from "../page/MyPage/MyPage";
import PostWritePage from "../page/Post/PostWritePage";
import PostListPage from "page/Post/PostListPage";
import PostEditPage from "page/Post/PostEditPage";
import Navbar from "./Navbar";
import RequireAuth from "./RequireAuth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSignState, setUserData } from "../action/action";
import { getLoginCookie } from "../lib/cookie";
import Loading from "../components/Loading";
import Weather from "./Weather";
import Chat from "./Chat";
import Footer from "./Footer";

const axios = require("axios");

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [viewModal, setModal] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await axios.get("http://34.168.215.145/user/checklogin", {
        headers: { authorization: getLoginCookie() },
      });
      dispatch(setSignState(res.data.msg));
      delete res.data.msg;
      dispatch(setUserData(res.data));
      setLoading(false);
    })();
  }, []);

  if (loading) return <Loading></Loading>;

  return (
    <div className="App">
      <Navbar viewModal={viewModal} setModal={setModal} />
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
          path="/mypage"
          element={
            <RequireAuth option={true} setModal={setModal}>
              <MyPage />
            </RequireAuth>
          }
        />
        <Route path="/postlist" element={<PostListPage />}></Route>
        <Route path="/postdetail/:id" element={<PostDetail />}></Route>
        <Route
          path="/postwrite"
          element={
            <RequireAuth option={true} setModal={setModal}>
              <PostWritePage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/postedit/:id"
          element={
            <RequireAuth option={true} setModal={setModal}>
              <PostEditPage />
            </RequireAuth>
          }
        ></Route>
        <Route path="/weather" element={<Weather />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
      {viewModal ? (
        <Signin viewModal={viewModal} setModal={setModal}></Signin>
      ) : null}
      <Footer />
    </div>
  );
}

export default App;
