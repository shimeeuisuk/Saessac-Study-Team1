import { useState } from "react";
export default function PostList() {
  const list = [1, 2, 3, 4];
  return (
    <>
      <div>
        {list.map(() => {
          return <PostBox />;
        })}
      </div>
    </>
  );
}

function PostBox() {
  let [like, setLike] = useState(0);
  return (
    <>
      <div className="communitypage-container">
        <div className="communitypage-container__top">
          <div className="communitypage-top__left">
            <h2>제목이다</h2>
            <div>2022.06.25</div>
          </div>
          <div className="communitypage-top__right">
            <span
              onClick={() => {
                setLike(like + 1);
              }}
            >
              {" "}
              👍{" "}
            </span>{" "}
            {like}
          </div>
        </div>
        <div className="communitypage-container__bottom">
          <div className="communitypage-bottom__content">
            <div className="communitypage-content__img">
              <img className="communitypage-content__thumb" src="img/qq.jpeg" />
            </div>
            <div className="communitypage-content__preview">
              <span>씌미씌미</span>
              <span> </span>
              <span>미리보기내용 솰라솰라솰라 미리보기내용</span>
            </div>
          </div>
          <div className="communitypage-bottom__detail">
            <span>상세더보기</span>
          </div>
        </div>
      </div>
    </>
  );
}
