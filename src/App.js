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
          <Route path="/friends" element={<Friends />} />
        </Route>
      </Routes>
      <ToastContainer
        autoClose={2500}
      />
    </>
  );
}

export default App;
