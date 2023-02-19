import React from "react";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { Route, Routes } from "react-router-dom";
import ResetPassword from "../changePassword";
import Upload from "../upload";
import VideoInfo from "../videoInfo";
import Dashboard from "../dashboard/index";
const Account = () => {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/uploadVideo" element={<Upload />} />
          <Route path="/videos" element={<VideoInfo />} />
          
        </Routes>
      </main>
    </div>
  );
};

export default Account;
