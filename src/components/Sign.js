import styled from 'styled-components';

export const SignContainer = styled.div`
  min-height: 620px;
  height: calc(100vh - 180px);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SignBox = styled.div`
  width: 440px;
  height: 580px;
  text-align: center;
  box-shadow: 8px 8px 4px 1px rgba(0, 0, 0, 0.25), 1px 1px 4px 1px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background: #fff;

  > div > svg {
    padding: 60px 0 30px 0;
    width: 180px;
  }

  > div:nth-child(2) {
    margin: 0 70px;
  }

  > div:nth-child(2) > div {
    width: 300px;
    background: #eee;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }

  > div:nth-child(2) > div > p {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
    text-align: start;
    padding: 10px 10px 5px 10px;
    width: 300px;
  }

  > button {
    font-size: 14px;
    margin: 0 70px 30px 70px;
    box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.25);
    width: 300px;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 10px;
    background: #eee;
    cursor: pointer;
    font-weight: bold;
    transition: .2s;
  }

  > button:hover {
    background: rgb(34, 163, 85);
    color: #fff;
    transition: .2s;
  }

  > span {
    font-size: 14px;
  }
`

export const SigninBox = styled(SignBox)`
  > div:nth-child(2) > div > input {
    font-size: 20px;
    outline: none;
    border: none;
    background: #eee;
    margin: 0 10px 10px 10px;
    border-radius: 10px;
    width: 280px;
    height: 25px;
  }

  > div:nth-child(2) > div {
    margin-bottom: 20px;
  }

  > div:nth-child(3) {
    font-size: 14px;
    color: rgba(0, 0, 0, .85);
    width: 300px;
    height: 25px;
    margin: 25px 70px 30px 70px;
  }
`

export const SignupBox = styled(SignBox)`
  > div:nth-child(2) > div > input {
    font-size: 20px;
    outline: none;
    border: none;
    background: #eee;
    margin: 0 10px 10px 10px;
    border-radius: 10px;
    width: 280px;
    height: 25px;
  }

  > div:nth-child(2) > div {
    margin-bottom: 10px;
  }

  > div:nth-child(2) > div:first-child {
    display: grid;
    grid-template-columns: 250px 50px;
  }

  > div:nth-child(2) > div:first-child > p {
    grid-column: 1;
    width: 100%;
  }

  > div:nth-child(2) > div:first-child > input {
    grid-column: 1;
    font-size: 18px;
    outline: none;
    border: none;
    background: #eee;
    margin: 0 10px 10px 10px;
    border-radius: 10px;
    width: calc(100% - 20px);
    height: 20px;
  }

  > div:nth-child(2) > div:first-child > button {
    grid-column: 2;
    grid-row: 1 / 3;
    border: none;
    border-radius: 0px 10px 10px 0px;
    transition: .2s;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.6);
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }

  > div:nth-child(2) > div:first-child > button:hover {
    background: rgb(34, 163, 85);
    color: #fff;
    border-left: none;
    transition: .2s;
  }

  > div:nth-child(2) > p {
    height: 16px;
    font-size: 14px;
    margin-bottom: 10px;
  }
`