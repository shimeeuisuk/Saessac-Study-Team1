import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteCookie } from "../lib/cookie";
import { trySignout } from "../action/action";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Signin from "./Signin";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 53px;
  background: #fff;
  border-bottom: 1px solid #000000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 25px;
  line-height: 35px;
  text-align: center;
  letter-spacing: 1px;
  z-index: 2;
  > a {
    font-family: "Orbitron", sans-serif;
    margin-left: 25px;
    text-decoration: none;
    color: #000000;
    font-weight: 800;
  }
  > div.NavbarInfoBox {
    display: flex;
    margin-right: 25px;
  }
`;

const NavbarBtn = styled.div`
  font-weight: 700;
  font-size: 16px;
  padding: 0 10px;
  cursor: pointer;
  > a {
    text-decoration: none;
    color: #000;
  }
`;

const NavbarBtnBlack = styled(NavbarBtn)`
  background: #000;
  > div {
    color: #fff;
  }

  > a {
    color: #fff;
  }
`;

const Navbar = ({ viewModal, setModal }) => {
  const state = useSelector((state) => state.signinReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const doSignout = async () => {
    deleteCookie();
    dispatch(trySignout());
    navigate("/");
  };

  const viewSignin = () => {
    setModal(!viewModal);
  };

  return (
    <NavbarContainer>
      <Link to="/">RUNNERS</Link>
      <div className="NavbarInfoBox">
        {state.loginState ? (
          <>
            <NavbarBtn>
              <div onClick={doSignout}>로그아웃</div>
            </NavbarBtn>
            <NavbarBtnBlack>
              <Link to="/mypage">마이페이지</Link>
            </NavbarBtnBlack>
          </>
        ) : (
          <NavbarBtnBlack>
            <div onClick={viewSignin}>로그인</div>
          </NavbarBtnBlack>
        )}
      </div>
    </NavbarContainer>
  );
};

export default Navbar;
