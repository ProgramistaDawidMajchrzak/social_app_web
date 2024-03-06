import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import AuthLayout, { LoginForm, RegisterForm } from "./routes/auth/Auth";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Route>
      {/* <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog/*" element={<BlogApp />} />
        <Route path="/users/*" element={<UserApp />} />
      </Route> */}
    </Routes>
  );
}

export default App;
