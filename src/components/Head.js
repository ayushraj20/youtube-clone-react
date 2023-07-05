import React, { useEffect, useState } from "react";
import menu from "../assets/menu.png";
import logo from "../assets/yt_logo.png";
import user_icon from "../assets/user_icon.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    // make an api call after every key press
    // but if the difference btw two api calls is <200ms
    // decline the api call.

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    console.log("api call made", searchQuery);
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    // console.log(json);
    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );
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
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            className="w-1/2  border border-gray-400 rounded-l-full p-2 px-5 "
          />
          <button className="border border-gray-400 rounded-r-full  p-2">
            🔍
          </button>
        </div>
        {showSuggestions && (
          <div className="absolute bg-white py-0 px-5 w-[37rem] shadow-lg rounded-md border border-gray-200">
            <ul>
              {suggestions.map((suggestion) => (
                <li className="p-2 shadow-sm hover:bg-gray-100">
                  🔍 {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1 ml-10 pl-5">
        <img alt="user" src={user_icon} />
      </div>
    </div>
  );
};

export default Head;
