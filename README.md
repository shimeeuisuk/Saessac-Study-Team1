# 🌱새싹 미니 프로젝트 - RUNNING MATE 🏃🏻‍ 
### 서로 격려하며 뛸 수 있는 런닝메이트를 만나고 싶다면 RUNNING MATE!!
</br>

## 💡 ABOUT PROJECT
* RUNNING MATE는 런닝을 같이 뛸 <strong>메이트를 구할 수 있는 플랫폼</strong>입니다.
* RUNNING MATE는 백엔드 1명과 프론트엔드 3명이 작업하였습니다.
#### TEAM MEMBERS INTRODUCE
---
|정연우 (BE 팀장)   |심의석 (FE 팀원)                  |박상호 (FE 팀원)               |문도연 (FE 팀원)               |
|----------------|-------------------------------|-----------------------------|-----------------------------|
|<img src='https://avatars.githubusercontent.com/u/104333720?v=4' width='150'>|<img src='https://user-images.githubusercontent.com/81614803/196865456-c74a5cb4-3143-4a8f-8207-11d2f8b5e872.png' width='150'/>|<img src='https://avatars.githubusercontent.com/u/97100045?v=4' width='150'/>|<img src='https://avatars.githubusercontent.com/u/102936206?v=4' width='150'/>|                  
|[@0SCAR0421](https://github.com/0SCAR0421)       |[@shimeeuisuk](https://github.com/shimeeuisuk)           |[@hopak-e](https://github.com/hopak-e)           |[@Moondoyeon](https://github.com/Moondoyeon)       |
#### USED TECH STACKS
---
<div>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=black"> <img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=black">
</div>

#### FIGMA 기획 
---
* 기획 링크 : https://www.figma.com/file/Pj5D20ovDAR5Zb55vBoFBu/%EB%9F%AC%EB%8B%9D%EC%95%B1?node-id=0%3A1&t=fN9l8j17JFDhhByX-0

#### 구현 기능
---

1. 회원가입, 로그인, 회원 탈퇴 기능
2. 런닝 메이트 찾기, 런닝 장소 추천 카테고리 별 검색 기능
3. 날씨 api를 이용한 날씨 정보 제공 기능
4. 게시글 및 댓글 작성, 수정, 삭제 기능
5. 마이페이지 정보 수정 기능

## PROBLEM-SOLUTION
#### ❗️PROBLEM
> 로그인 했을 때만 접근 가능한 페이지와 비로그인 시에도 접근 가능한 페이지를 구별 해 주어야 하였다.
#### 💡SOLUTION
> 리덕스를 이용한 현재 로그인 상태관리로 해결!
* 리덕스 리듀서를 이용한 로그인 상태관리
```js
const signinReducer = (state = {loginState: false}, action) => {

  switch (action.type) {
    case "CHECK_LOGIN":
      return {...state, loginState: action.payload.msg}
    case "SET_USER_DATA":
      return {...state, data: action.payload.data}
    case "SIGNOUT":
      return {...state, loginState: action.payload.msg}
    default:
      return state;
  }
}

export default signinReducer;
```
* 로그인, 로그아웃일 떄 각각의 옵션을 함수를 만들어 구분, 잘못 된 접근일 시 메인 페이지로 리다이렉트 하도록 함.
```js
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';

// option true = 로그인시에만 가능
// option false = 로그아웃시에만 가능
// option null = 둘다 가능
const RequireAuth = ({ children, option, setModal }) => {
  const state = useSelector(state => state.signinReducer)
  const location = useLocation();

  // 인증정보 갱신 추가하기
  if(option === null){
    return children
  } else if(option) {
    if(state.loginState) return children
    else {
      setTimeout(() => {
        setModal(true)
      }, 1000)
      return <Navigate to={'/'} state={location}></Navigate>
    }
  } else {
    if(state.loginState){
      return <Navigate to={'/'} state={location}></Navigate>
    } else return children
  }
}

export default RequireAuth
```



