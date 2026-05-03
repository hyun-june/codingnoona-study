import Chatting from "./components/Chatting/Chatting";
import "./App.css";
import UseCam from "./components/UseCam/UseCam";

// 유저 정보
const chatUserData = {
  other: {
    nickname: "모코모코",
    src: "https://png.pngtree.com/png-clipart/20220112/ourmid/pngtree-cartoon-hand-drawn-default-avatar-png-image_4154232.png",
  },
  user: {
    nickname: "고양이",
    src: "https://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg",
  },
};

// 이전 대화
const prevMessage = [
  { sender: "other", text: "안녕하세요!" },
  { sender: "other", text: "안녕하세요!" },
];

// 이전 파일 정보
const prevFile = {
  sender: "user",
  text: "테스트파일.pdf",
  file: "url",
  type: "file",
  fileType: "pdf",
};

const App = () => {
  return (
    <div>
      <Chatting
        userData={chatUserData}
        prevData={prevMessage}
        prevFile={prevFile}
      />

      {/* <UseCam /> */}
    </div>
  );
};

export default App;
