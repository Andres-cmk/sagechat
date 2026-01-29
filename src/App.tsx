import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ChatProvider } from './context/ChatContext';

function App() {

  return (
    <div>
    <BrowserRouter>
      <ChatProvider>
          <Routes>
            <Route path='/' element = {<Navigate to= "/login" replace />} ></Route>
            <Route path={"/login"} element={<Login />} />
            <Route path={"/chat"} element={<Chat />} />
          </Routes>
      </ChatProvider>
    </BrowserRouter>
    </div>
  );
}

export default App
