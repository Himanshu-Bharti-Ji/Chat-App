import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import SettingsPage from "./Pages/SettingsPage";
import ProfilePage from "./Pages/ProfilePage";
import HomePage from "./Pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import LoaderUi from "./Components/LoaderUi";
import theme from "./theme";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("authUser", { authUser });

  if (isCheckingAuth && !authUser) {
    return <LoaderUi />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignupPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/profile"
              element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
