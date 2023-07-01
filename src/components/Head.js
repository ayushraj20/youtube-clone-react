import React from "react";
import menu from "../assets/menu.png";
import logo from "../assets/yt_logo.png";
import user_icon from "../assets/user_icon.png";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";

const Head = () => {
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-sm">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer "
          alt="menu"
          src={menu}
        />
        <img className="h-8  ml-4 " alt="logo" src={logo} />
      </div>
      <div className="col-span-10 ml-10">
        <input
          type="text"
          className="w-1/2  border border-gray-400 rounded-l-full p-2 "
        />
        <button className="border border-gray-400 rounded-r-full  p-2">
          🔍
        </button>
      </div>
      <div className="col-span-1 ml-10 pl-5">
        <img alt="user" src={user_icon} />
      </div>
    </div>
  );
};

export default Head;
