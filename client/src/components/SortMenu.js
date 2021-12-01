import * as React from "react";
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import GlobalStoreContext from "../store";
export default function SortMenu() {
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const setViews = () => {
    store.updateSort(0);
    handleClose();
  };
  const setLikes = () => {
    store.updateSort(1);
    handleClose();
  };
  const setDislikes = () => {
    store.updateSort(2);
    handleClose();
  };
  const setNew = () => {
    store.updateSort(3);
    handleClose();
  };
  const setOld = () => {
    store.updateSort(4);
    handleClose();
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ color: "black" }}
      >
        <SortIcon style={{ color: "black" }}></SortIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={setViews}>Most Viewed</MenuItem>
        <MenuItem onClick={setLikes}>Most Liked</MenuItem>
        <MenuItem onClick={setDislikes}>Most Disliked</MenuItem>
        <MenuItem onClick={setNew}>Newest</MenuItem>
        <MenuItem onClick={setOld}>Oldest</MenuItem>
      </Menu>
    </div>
  );
}
