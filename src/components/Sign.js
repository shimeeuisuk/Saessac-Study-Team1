import styled from 'styled-components';

export const SignContainer = styled.div`
  min-height: 620px;
  height: calc(100vh - 180px);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SigninContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, .6);
  z-index: 2;
`

export const SignBox = styled.div`
  width: 450px;
  height: 450px;
  text-align: center;
  border-radius: 5px;
  background: #fff;
`

export const SigninBox = styled(SignBox)`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div.logoBox {
    font-family: 'Orbitron', sans-serif;
    font-weight: 700;
    font-size: 25px;
    margin: 45px 0 12px 0;
  }

  > div.signinTitle {
    font-weight: 400;
    font-size: 20px;
    margin-bottom: 35px;
  }

  > input {
    width: 420px;
    height: 42px;
    background: #FFF;
    border: 1px solid #E5E5E5;
    margin-bottom: 14px;
    padding-left: 10px;
  }

  > div.loginBox {
    width: 420px;
    height: 42.75px;
    background: #000000;
    color: #FFF;
    font-weight: 400;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    cursor: pointer;
  }

  > div.loginMsg {
    margin: 20px 0;
    font-size: 14px;
    height: 14px;
  }

  > div.registerInfo {
    font-weight: 500;
    font-size: 13px;
    color: #B0ABAB;
  }

  > div.registerInfo > div {
    display: inline-block;
  }

  > div.registerInfo > div > a {
    text-decoration: none;
    color: #000;
  }
`

export const SignupBox = styled(SignBox)`
  width: 500px;
  height: 515px;
  
  > div.signupTitle {
    font-weight: 600;
    font-size: 25px;
    margin-top: 42px;
  }

  > div.signupSubTitle {
    font-weight: 500;
    font-size: 14px;
    color: #B0ABAB;
    margin-top: 15px;
  }

  > div.signupInputContainer {
    margin-top: 45px;
  }

  > div.signupInputContainer > div > input {
    width: 440px;
    height: 42px;
    background: #FFF;
    border: 1px solid #E5E5E5;
    padding-left: 10px;
  }

  > div.signupInputContainer > p {
    height: 12px;
    font-weight: 400;
    font-size: 12px;
    color: #656565;
    text-align: left;
    width: 440px;
    margin: 7px auto;
  }

  > div.signupInputContainer > div:first-child > input {
    width: calc(440px - 88px);
  }

  > div.signupInputContainer > div:first-child > button {
    width: 88px;
    height: 42px;
    background: #070707;
    border: none;
    font-weight: 400;
    font-size: 14px;
    color: #FFF;
  }

  > button {
    width: 440px;
    height: 42px;
    background: #000;
    color: #FFF;
    font-weight: 600;
    font-size: 16px;
    margin: 30px auto;
  }

  > p {
    color: #B0ABAB;
  }

  > p > a {
    color: #000;
  }
`