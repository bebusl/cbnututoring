import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>SW중심대학사업단 Keep-UpⓇ 관리 시스템</h3>
      </header>
    </div>
  );
};

export default Home;
