import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostContent from "../../components/PostContent";
import styled from "styled-components";

const Container = styled.div`
  width: 800px;
  height: 900px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function PostDetail() {
  const [detail, setDetail] = useState({});
  const [Loading, setLoading] = useState(true);
  let params = useParams();

  useEffect(() => {
    console.log(params);
    axios.get(`http://34.168.215.145/topic/${params.id}`).then((res) => {
      const data = res.data[0];
      setDetail({ ...data });
      setLoading(false);
    });
  }, []);

  return (
    <Container>{Loading ? <></> : <PostContent detail={detail} />}</Container>
  );
}
