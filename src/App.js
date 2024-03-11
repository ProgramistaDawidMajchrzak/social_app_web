import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import AuthLayout, { LoginForm, RegisterForm } from "./routes/auth/Auth";
import Board from './routes/panel/board/Board';
import Friends from './routes/panel/friends/Friends';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PanelLayout from './routes/panel/PanelLayout';
import MyFriends from './routes/panel/friends/my_friends/MyFriends';
import AllPeople from './routes/panel/friends/all_people/AllPeople';

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        <Route element={<PanelLayout />}>
          <Route path="/board" element={<Board />} />
          <Route element={<Friends />}>
            <Route path="/friends" element={<MyFriends />} />
            <Route path="/all-people" element={<AllPeople />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        autoClose={2500}
      />
    </>
  );
}

export default App;
