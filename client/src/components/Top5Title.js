import { React, useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
/*
    This React component represents a single item in our
    Top 5 List, which can be edited or moved around.
    
    @author McKilla Gorilla
*/
export default function Top5Title(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const [draggedTo, setDraggedTo] = useState(0);
  const [text, setText] = useState(store.currentList?.name);

  function handleDragStart(event, targetId) {
    event.dataTransfer.setData("item", targetId);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    console.log("entering");
    setDraggedTo(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    console.log("leaving");
    setDraggedTo(false);
  }

  function handleDrop(event, targetId) {
    event.preventDefault();
    let sourceId = event.dataTransfer.getData("item");
    sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
    setDraggedTo(false);

    console.log(
      "handleDrop (sourceId, targetId): ( " + sourceId + ", " + targetId + ")"
    );

    // UPDATE THE LIST
    store.addMoveItemTransaction(sourceId, targetId);
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit();
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (!newActive) {
      if (props.text !== text) {
        let k = store.currentList;
        k.name = text;
        store.editCurrentList(k);
      }
    }
    setEditActive(newActive);
    setText(props.text);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      toggleEdit();
    }
  }

  function handleBlur() {
    let newActive = !editActive;
    setEditActive(newActive);
  }
  function handleUpdateText(event) {
    setText(event.target.value);
  }
  let { index } = props;

  let itemClass = "";
  if (draggedTo) {
    itemClass = "top5-item-dragged-to";
  }
  if (editActive) {
    return (
      <TextField
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        onBlur={handleBlur}
        defaultValue={store.currentList?.name}
        inputProps={{ style: { fontSize: 20 } }}
        InputLabelProps={{ style: { fontSize: 20 } }}
        autoFocus
        style={{
          position: "absolute",
          fontSize: "20pt",
          left: "25%",
          width: "50%",
          height: "20%",
          top: "15%",
          backgroundColor: "white",
        }}
      />
    );
  }
  return (
    <ListItem
      draggable="false"
      sx={{ display: "flex", p: 1 }}
      style={{
        position: "absolute",
        top: "15%",
        left: "25%",
        fontSize: "20pt",
        width: "50%",
        height: "7%",
        borderWeight: "0px",
        borderStyle: "none",
        backgroundColor: "white",
        borderRadius: ".5em",
      }}
    >
      <Box sx={{ p: 1 }}>
        <IconButton aria-label="edit" onClick={handleToggleEdit}>
          <EditIcon style={{ fontSize: "20pt" }} />
        </IconButton>
      </Box>
      <Box sx={{ p: 1, flexGrow: 1 }}>{store.currentList?.name}</Box>
    </ListItem>
  );
}
