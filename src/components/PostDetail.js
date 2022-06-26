import { useState } from "react";
export default function PostDetail() {
  return (
    <>
      <PostContent />
      <PostReply />
    </>
  );
}

function PostContent() {
  let [like, setLike] = useState(0);
  return (
    <>
      <section className="communitypage-container">
        <div className="communitypage-container__user">
          <div className="communitypage-user__img">
            <img className="user__img" src="img/qq.jpeg" />
          </div>
          <div className="communitypage-user__username">
            <span>씌미씌미</span>
            <div>2022.06.25</div>
          </div>
        </div>
        <div className="communitypage-container__title">제목이다</div>
        <div className="communitypage-container__content">
          나랑 같이뛰지 않을래~? 응 안뛰어~ 반포 한강 공원에서 런닝메이트
          구합니다~ 뛰고 싶은 열정만 있다면 7월 1일 세빛둥둥섬 앞에서 오후 7시에
          만나요 닉네임 씌미를 찾으세요 어스름한 저녁 반포대교 분수를 보며 같이
          뛰어요~!!
        </div>
        <div className="commuitypage-container__reaction">
          <span
            onClick={() => {
              setLike(like + 1);
            }}
          >
            👍
          </span>
          {like} <span>💬</span>0
        </div>
      </section>
    </>
  );
}
function PostReply() {
  <section className="communitypage-container"></section>;
}
