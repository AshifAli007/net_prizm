import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Manage/HomePage';
import Login from './Pages/Components/Login';
import RoleAction from './Pages/Components/RoleAction';
function App() {
  return (
    <Routes>
      {/* Each route capsulated inside MainLayout is protected */}
      {/* User with invalid token will be redirected to login page */}
      <Route path="/" element={<Login />}>
      </Route>
      <Route path="/profile" element={<RoleAction />}>
      </Route>
      <Route path="/home" element={<HomePage />}>
      </Route>
    </Routes>
  );
}

export default App;
