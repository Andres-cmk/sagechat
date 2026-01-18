import { Chat } from './components/Chat';
import {Login} from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>
    <BrowserRouter>

        <Routes>

          <Route path={"/login"} element={<Login />} />
          <Route path={"/chat"} element={<Chat />} />

        </Routes>

    </BrowserRouter>
    </div>
  );
}

export default App
