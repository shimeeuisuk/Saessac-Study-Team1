import React from 'react';
import '../css/MyPage.css';

export default function MyPost ({ myPosts }){

return(

  <div className="mypage-bottom__wrapper">
    <div className="mypage-bottomleft__title">
      <h3>내가 쓴 글보기</h3>
    </div>
    <div className="mypage-bottomright__content">
      {myPosts.map(post => (
        <li key={post.tid}>
          <a href={`/postdetail/${post.tid}`}><span>{post.topicTitle}</span></a>
        </li>
      ))}
    </div>
  </div>  
);
}