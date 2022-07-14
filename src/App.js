import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './Pages/Manage/HomePage';
function App() {
  return (
    <Routes>
      {/* Each route capsulated inside MainLayout is protected */}
      {/* User with invalid token will be redirected to login page */}
      <Route path="/" element={<HomePage />}>
        
      </Route>
    </Routes>
  );
}

export default App;
