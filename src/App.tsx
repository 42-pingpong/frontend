import './App.css';
import { RecoilRoot } from 'recoil';
import Header from './component/Header/Header';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Main } from './component/Main/Main';
import { Chat } from './component/Chat/Chat';
import { Game } from './component/Game/Game';
import { TokenSave } from './component/Main/TokenSave';
import { Profile } from './component/Profile/Profile';
import { DirectMessage } from './component/Chat/DirectMessage/DirectMessage';
import { ChatManage } from './component/Chat/Manage/ChatManage';

function App() {
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/token" element={<TokenSave />} />
            <Route path="/chat/:id/:levelOfPublicity?" element={<Chat />} />
            <Route path="/direct-message/:id" element={<DirectMessage />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="/profile/:nickName?" element={<Profile />} />
            <Route path="/chat-manage/:roomId" element={<ChatManage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
