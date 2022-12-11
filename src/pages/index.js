import Auth from "../components/Auth"
import Feed from "../components/Feed"
import { useState,useControl, useContext } from "react";
import { GlobalContext } from "../state/context/GlobalContext";
const HomePage = () => {
  
  const {isAuthenticated} = useContext(GlobalContext)
  
  return (
  isAuthenticated?<Feed/> : <Auth/>
  );
};

export default HomePage;