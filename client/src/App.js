import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/home"
          element={isAuth ? <HomePage /> : <Navigate to="/" />}
        />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route
          path="/profile/:userId"
          element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
