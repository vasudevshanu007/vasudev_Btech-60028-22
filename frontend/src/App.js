import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import KanbanBoard from "./components/KanbanBoard";
import Profile from "./components/Profile";

function App() {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/login"
          element={<Login setIsAuth={setIsAuth} />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={
            isAuth ? (
              <KanbanBoard setIsAuth={setIsAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/profile"
          element={
            isAuth ? (
              <Profile setIsAuth={setIsAuth} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
