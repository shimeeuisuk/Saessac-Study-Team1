import PostList from "components/PostList";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 800px;
  height: 900px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TabMenu = styled.ul`
  padding-left: 10;
  color: rgba(73, 73, 73, 0.5);
  font-weight: bold;
  display: flex;
  align-items: center;
  text-align: center;
  list-style: none;
  width: 400px;
  margin-top: 20px;
  margin-bottom: 20px;

  .DeActive {
    padding-top: 5px;
    background-color: white;
    vertical-align: center;
    cursor: pointer;
    height: 30px;
    width: 200px;
    transition: 0.3s;
  }

  .Active {
    padding-top: 5px;
    background-color: #c8c9c8;
    vertical-align: center;
    height: 30px;
    width: 200px;
    cursor: pointer;
  }
`;

const Writepostbox = styled.div`
  padding: 10px 0px 10px 0px;
  width: 600px;
  height: 60px;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  background-color: #13c768;
  color: white;
  align-items: center;

  .writepost {
    margin-left: 10px;
  }

  .writeicon {
    margin-right: 10px;
  }
`;

export default function PostListPage() {
  const [selectedTab, setSelectedTab] = useState(0);

  function clickhandler(num) {
    setSelectedTab(num);
  }
  return (
    <Container>
      <TabMenu>
        <li
          onClick={() => {
            clickhandler(0);
          }}
          className={selectedTab === 0 ? "Active" : "DeActive"}
        >
          런닝메이트 구해요
        </li>
        <li
          onClick={() => {
            clickhandler(1);
          }}
          className={selectedTab === 1 ? "Active" : "DeActive"}
        >
          런닝장소 추천
        </li>
      </TabMenu>
      <Writepostbox>
        <span className="writepost">새 글을 작성해 주세요!</span>
        <Link to="/postwrite">
          <span className="writeicon">
            <Icon icon="cil:pencil" />
          </span>
        </Link>
      </Writepostbox>
      <PostList selectedTab={selectedTab} />
    </Container>
  );
}
