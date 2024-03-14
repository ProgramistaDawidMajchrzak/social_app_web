import { useState } from 'react';
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
import UserView from './routes/panel/user/UserView';

function App() {
  const [refreshInv, setRefreshInv] = useState(false);
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        <Route element={<PanelLayout refreshInv={refreshInv} setRefreshInv={setRefreshInv} />}>
          <Route path="/board" element={<Board />} />
          <Route element={<Friends />}>
            <Route path="/friends" element={<MyFriends refreshInv={refreshInv} setRefreshInv={setRefreshInv} />} />
            <Route path="/all-people" element={<AllPeople refreshInv={refreshInv} setRefreshInv={setRefreshInv} />} />
          </Route>
          <Route path="/user/:id" element={<UserView />} />
        </Route>
      </Routes>
      <ToastContainer
        autoClose={2500}
      />
    </>
  );
}

export default App;
