import { useState, useEffect } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import PostListFriend from "components/PostListFriend";
import PostListLocation from "components/PostLIstLocation";
import { IoCaretBack } from "react-icons/io5";
import { IoCaretForward } from "react-icons/io5";
import axios from "axios";
import useScroll from "util/useScroll";
import { useSelector, useDispatch } from "react-redux";
import { select } from "action/action";

export default function PostListPage() {
  const [page, setPage] = useState(1);
  const [totalTopic, setTotalTopic] = useState(0);
  const totalPage = Math.ceil(totalTopic / 6);
  const selectedTab = useSelector((state) => state.selectedTabReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useScroll();

  useEffect(() => {
    axios
      .get(
        `https://saessac.kro.kr:80/topic/list/count?type=${
          selectedTab === 0 ? "friend" : "location"
        }`
      )
      .then((res) => {
        setTotalTopic(res.data.count);
        setLoading(false);
      });
  }, [selectedTab]);
  function clickhandler(num) {
    dispatch(select(num));
  }
  function PageIncrease() {
    setPage(page + 1);
  }
  function PageDecrease() {
    setPage(page - 1);
  }
  if (loading) return null;
  return (
    <Container>
      <Top>
        <Transition>
          {page > 1 ? (
            <IoCaretBack className="left" onClick={PageDecrease} />
          ) : null}
          {page >= totalPage ? null : (
            <IoCaretForward className="right" onClick={PageIncrease} />
          )}
          <span className="page">
            {" "}
            {page}/{totalPage}{" "}
          </span>
        </Transition>
        <TabMenu>
          <li
            onClick={() => {
              clickhandler(0);
              setPage(1);
            }}
            className={selectedTab === 0 ? "mateActive" : "mateDeActive"}
          >
            MATE
          </li>
          <li
            onClick={() => {
              clickhandler(1);
              setPage(1);
            }}
            className={selectedTab === 1 ? "placeActive" : "placeDeActive"}
          >
            PLACE
          </li>
        </TabMenu>
      </Top>
      <Writepostbox>
        <span className="writepost">새 글 작성하기</span>
        <Link to="/postwrite">
          <span className="writeicon">
            <Icon icon="cil:pencil" />
          </span>
        </Link>
      </Writepostbox>

      <List>
        {selectedTab === 0 ? (
          <PostListFriend page={page} />
        ) : (
          <PostListLocation page={page} />
        )}
      </List>
    </Container>
  );
}

//styled components
const Container = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  width: 920px;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const TabMenu = styled.ul`
  padding-left: 10;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  list-style: none;

  .mateDeActive {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    padding-top: 5px;
    background-color: #c3ff75;
    vertical-align: center;
    cursor: pointer;
    height: 52px;
    width: 185px;
    transition: 0.3s;
    font-family: "Orbitron", sans-serif;
    font-weight: 800;
    box-shadow: 5px 5px black;
    margin-right: 22px;
  }

  .mateActive {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    padding-top: 5px;
    background-color: #c3ff75;
    vertical-align: center;
    height: 52px;
    width: 185px;
    cursor: pointer;
    font-family: "Orbitron", sans-serif;
    font-weight: 800;
    border: 2px solid green;
    margin-right: 22px;
  }
  .placeDeActive {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    padding-top: 5px;
    background-color: #a674fe;
    vertical-align: center;
    cursor: pointer;
    height: 52px;
    width: 185px;
    transition: 0.3s;
    font-family: "Orbitron", sans-serif;
    font-weight: 800;
    box-shadow: 5px 5px black;
  }
  .placeActive {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    padding-top: 5px;
    background-color: #a674fe;
    vertical-align: center;
    height: 52px;
    width: 185px;
    cursor: pointer;
    font-family: "Orbitron", sans-serif;
    font-weight: 800;
    border: 2px solid purple;
  }
`;

const Writepostbox = styled.div`
  padding: 10px 0px 10px 0px;
  width: 920px;
  height: 55px;
  margin-bottom: 21px;
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;
  align-items: center;

  .writepost {
    font-size: 24px;
    font-weight: bold;
    margin-left: 26px;
  }

  .writeicon {
    font-size: 24px;
    color: white;
    margin-right: 25px;
  }
`;
const Transition = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  .left {
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-color: white;
    border: hidden;
  }
  .page {
    margin-left: 10px;
    font-size: 20px;
    margin-right: 10px;
    margin-top: 5px;
  }
  .right {
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-color: white;
    border: hidden;
  }
`;

const List = styled.div`
  width: 923px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(455px, 1fr));
  gap: 11px;
`;
