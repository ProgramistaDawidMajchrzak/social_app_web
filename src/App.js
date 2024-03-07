import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import AuthLayout, { LoginForm, RegisterForm } from "./routes/auth/Auth";
import Home from './routes/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        <Route path="/home" element={<Home />} />
        {/* <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog/*" element={<BlogApp />} />
        <Route path="/users/*" element={<UserApp />} />
      </Route> */}
      </Routes>
      <ToastContainer
        autoClose={2500}
      />
    </>
  );
}

export default App;
