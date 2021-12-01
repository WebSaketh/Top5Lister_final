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
import { InputBase, Paper, Stack, Typography } from "@mui/material";
import SortMenu from "./SortMenu";

function LoadMenu(props) {
  function getStyleHome() {
    if (store.currentMenu === 1) {
      return {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
        color: "black",
        backgroundColor: "transparent",
      };
    }
    return {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "transparent",
      color: "black",
      backgroundColor: "transparent",
    };
  }
  function getStyleAll() {
    if (store.currentMenu === 2) {
      return {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
        color: "black",
        backgroundColor: "transparent",
      };
    }
    return {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "transparent",
      color: "black",
      backgroundColor: "transparent",
    };
  }
  function getStyleUser() {
    if (store.currentMenu === 3) {
      return {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
        color: "black",
        backgroundColor: "transparent",
      };
    }
    return {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "transparent",
      color: "black",
      backgroundColor: "transparent",
    };
  }
  function getStyleAgg() {
    if (store.currentMenu === 4) {
      return {
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: "black",
        color: "black",
        backgroundColor: "transparent",
      };
    }
    return {
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: "transparent",
      color: "black",
      backgroundColor: "transparent",
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
  function formSubmitHandler(e) {
    e.preventDefault();
  }
  return (
    <div id="loadMenu">
      <Stack direction="row" spacing={2}>
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
          <GroupsOutlinedIcon fontSize="large" />
        </ButtonUnstyled>
        <ButtonUnstyled
          onClick={setUser}
          className="loadMenuButton"
          style={getStyleUser()}
        >
          <PersonOutlineOutlinedIcon fontSize="large" />
        </ButtonUnstyled>
        <ButtonUnstyled
          onClick={setAgg}
          className="loadMenuButton"
          style={getStyleAgg()}
        >
          <FunctionsOutlinedIcon fontSize="large" />
        </ButtonUnstyled>
        <Paper
          component="form"
          sx={{
            p: "2px 2px",
            display: "flex",
            alignItems: "center",
            width: 350,
          }}
          elevation={0}
          onSubmit={formSubmitHandler}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "" }}
          />
        </Paper>
        <Stack direction="row" style={{ marginLeft: "auto", marginRight: 0 }}>
          <Box
            // style={{ width: "50%", margin: "0" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography style={{ fontWeight: "bold" }}>SORT BY</Typography>
          </Box>
          <Box
            // style={{ width: "50%", margin: "0" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <SortMenu></SortMenu>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
}

export default LoadMenu;
