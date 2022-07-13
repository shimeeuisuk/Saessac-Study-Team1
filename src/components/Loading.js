import styled from 'styled-components';

export const LoadingContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  color: #fff;
  font-size: 48px;

  @keyframes ldio-tfz49yiebmh {
    0% { opacity: 1 }
    100% { opacity: 0 }
  }

  .ldio-tfz49yiebmh div {
    left: 95px;
    top: 52px;
    position: absolute;
    animation: ldio-tfz49yiebmh linear 2.272727272727273s infinite;
    background: #0FA958;
    width: 10px;
    height: 8px;
    border-radius: 1.2px / 1.2px;
    transform-origin: 5px 48px;
  }.ldio-tfz49yiebmh div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -2.13903743315508s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(2) {
    transform: rotate(21.176470588235293deg);
    animation-delay: -2.0053475935828877s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(3) {
    transform: rotate(42.35294117647059deg);
    animation-delay: -1.8716577540106951s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(4) {
    transform: rotate(63.529411764705884deg);
    animation-delay: -1.7379679144385025s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(5) {
    transform: rotate(84.70588235294117deg);
    animation-delay: -1.6042780748663101s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(6) {
    transform: rotate(105.88235294117646deg);
    animation-delay: -1.4705882352941175s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(7) {
    transform: rotate(127.05882352941177deg);
    animation-delay: -1.3368983957219251s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(8) {
    transform: rotate(148.23529411764707deg);
    animation-delay: -1.2032085561497325s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(9) {
    transform: rotate(169.41176470588235deg);
    animation-delay: -1.06951871657754s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(10) {
    transform: rotate(190.58823529411765deg);
    animation-delay: -0.9358288770053476s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(11) {
    transform: rotate(211.76470588235293deg);
    animation-delay: -0.8021390374331551s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(12) {
    transform: rotate(232.94117647058823deg);
    animation-delay: -0.6684491978609626s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(13) {
    transform: rotate(254.11764705882354deg);
    animation-delay: -0.53475935828877s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(14) {
    transform: rotate(275.29411764705884deg);
    animation-delay: -0.40106951871657753s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(15) {
    transform: rotate(296.47058823529414deg);
    animation-delay: -0.267379679144385s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(16) {
    transform: rotate(317.6470588235294deg);
    animation-delay: -0.1336898395721925s;
    background: #0FA958;
  }.ldio-tfz49yiebmh div:nth-child(17) {
    transform: rotate(338.8235294117647deg);
    animation-delay: 0s;
    background: #0FA958;
  }
  .loadingio-spinner-spinner-mwekho7oqt {
    width: 200px;
    height: 200px;
    display: inline-block;
    overflow: hidden;
  }
  .ldio-tfz49yiebmh {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(1);
    backface-visibility: hidden;
    transform-origin: 0 0;
  }
  .ldio-tfz49yiebmh div { box-sizing: content-box; }
`

const Loading = () => {
  return(
    <LoadingContainer>
      <div className="loadingio-spinner-spinner-mwekho7oqt">
        <div className="ldio-tfz49yiebmh">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </LoadingContainer>
  )
}

export default Loading