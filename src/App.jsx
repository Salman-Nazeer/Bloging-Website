import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./Services/auth_services";
import { login, logout } from "./Store/Features/authSlice";
import { Header, Footer } from "./Components";
import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setloading(false));
  }, []);

  return !loading ? (
    <div className=" flex flex-wrap content-between min-h-screen bg-gray-400">
      <div className="w-full block">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
