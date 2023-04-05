import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./TopInfo.css";
const TopInfo = () => {
  const loginedUser = useSelector((state) => state.loginedUser);
  const navigate = useNavigate();
  const gotoDashboard = () => {
    navigate("/home/dashboard");
  };
  return (
    <>
      <div className="d-none d-xl-block">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo_library.png`}
          alt=""
          className="w-100 logo_library"
          onClick={gotoDashboard}
        />
      </div>
      <div className="bg-secondary avatarLogin p-3 mx-3  rounded-3  logo   d-none d-xl-block">
        <div className="d-flex gap-3 align-items-center">
          <img
            src={loginedUser.length > 0 ? loginedUser[0].avatar : ""}
            alt=""
            className="logoAva1 rounded-circle"
          />
          <p className="m-0 fw-bold">
            {loginedUser.length > 0 ? loginedUser[0].name : ""}
          </p>
        </div>
      </div>
    </>
  );
};

export default TopInfo;
