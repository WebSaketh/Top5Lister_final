import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import ButtonUnstyled from "@mui/core/ButtonUnstyled";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import FunctionsOutlinedIcon from "@mui/icons-material/FunctionsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./DeleteModal";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { border } from "@mui/system";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Stack } from "@mui/material";

function LoadMenu(props) {
  function getStyleHome() {
    if (store.currentMenu === 1) {
      return {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
        color: "black",
        //backgroundColor: "#e6e6e6",
      };
    }
    return {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "transparent",
      color: "black",
      // backgroundColor: "#e6e6e6",
    };
  }
  function getStyleAll() {
    if (store.currentMenu === 2) {
      return {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
        color: "black",
        //backgroundColor: "#e6e6e6",
      };
    }
    return {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "transparent",
      color: "black",
      //backgroundColor: "#e6e6e6",
    };
  }
  function getStyleUser() {
    if (store.currentMenu === 3) {
      return {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
        color: "black",
        //backgroundColor: "#e6e6e6",
      };
    }
    return {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "transparent",
      color: "black",
      //backgroundColor: "#e6e6e6",
    };
  }
  function getStyleAgg() {
    if (store.currentMenu === 4) {
      return {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
        color: "black",
        //backgroundColor: "#e6e6e6",
      };
    }
    return {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "transparent",
      color: "black",
      //backgroundColor: "#e6e6e6",
    };
  }

  function setHome() {
    // console.log("before", store.currentMenu);
    store.updateMenu(1);
    // console.log("after", store.currentMenu);
  }

  function setAll() {
    //  console.log("before", store.currentMenu);
    store.updateMenu(2);
    // console.log("after", store.currentMenu);
  }

  function setUser() {
    // console.log("before", store.currentMenu);
    store.updateMenu(3);
    // console.log("after", store.currentMenu);
  }

  function setAgg() {
    // console.log("before", store.currentMenu);
    store.updateMenu(4);
    // console.log("after", store.currentMenu);
  }

  const { store } = useContext(GlobalStoreContext);
  return (
    <div id="loadMenu">
      <ButtonUnstyled
        onClick={setHome}
        className="loadMenuButton"
        style={getStyleHome()}
      >
        <HomeOutlinedIcon fontSize="large" />
      </ButtonUnstyled>
      <ButtonUnstyled
        onClick={setAll}
        className="loadMenuButton"
        style={getStyleAll()}
      >
        <PersonOutlineOutlinedIcon fontSize="large" />
      </ButtonUnstyled>
      <ButtonUnstyled
        onClick={setUser}
        className="loadMenuButton"
        style={getStyleUser()}
      >
        <GroupsOutlinedIcon fontSize="large" />
      </ButtonUnstyled>
      <ButtonUnstyled
        onClick={setAgg}
        className="loadMenuButton"
        style={getStyleAgg()}
      >
        <FunctionsOutlinedIcon fontSize="large" />
      </ButtonUnstyled>
    </div>
  );
}

export default LoadMenu;
