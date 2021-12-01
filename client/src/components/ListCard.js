import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./DeleteModal";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const { idNamePair } = props;
  const [text, setText] = useState(idNamePair.name);

  function handleLoadList(event, id) {
    if (!event.target.disabled) {
      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit(event);
  }
  function handleBlur() {
    toggleEdit();
    setText(idNamePair.name);
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive(true);
    }
    store.setIsListNameEditActive(false);
    setEditActive(newActive);
  }

  async function handleDeleteList(ev, id) {
    ev.preventDefault();
    ev.stopPropagation();
    await store.markListForDeletion(id);
  }

  async function confirmDelete(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    await store.deleteMarkedList();
    await store.loadIdNamePairs();
    await store.unmarkListForDeletion();
  }

  async function cancelDelete(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    await store.unmarkListForDeletion();
    console.log(store.listMarkedForDeletion);
  }

  function handleKeyPress(event) {
    if (event.code === "Enter") {
      let id = event.target.id.substring("list-".length);
      store.changeListName(id, text);
      toggleEdit();
    }
  }
  function handleUpdateText(event) {
    setText(event.target.value);
  }

  let cardElement = (
    <ListItem
      id={idNamePair._id}
      key={idNamePair._id}
      sx={{ marginBottom: "15px", display: "flex", p: 1 }}
      button
      onClick={(event) => {
        handleLoadList(event, idNamePair._id);
      }}
      style={{
        fontSize: "48pt",
        width: "100%",
        borderRadius: "15px",
        backgroundColor: "#FFFFF1",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "black",
      }}
    >
      <DeleteModal
        message={idNamePair.name}
        presence={store.listMarkedForDeletion}
        handleClose={cancelDelete}
        confirmCallback={confirmDelete}
        subtype={"delete-modal"}
      />
      <Box sx={{ pl: 0.5, flexGrow: 1 }}>
        <Box sx={{ p: 0.5, flexGrow: 1 }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            {idNamePair.name}
          </Typography>
        </Box>
        <Box sx={{ p: 0.5, flexGrow: 1 }}>
          <Stack direction="row">
            <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>
              By: &nbsp;
            </Typography>
            <Typography
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                textDecoration: "underline",
                color: "blue",
              }}
            >
              Username
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ p: 0.5, flexGrow: 1 }}>
          <Typography
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              textDecoration: "underline",
              color: "red",
            }}
          >
            EDIT
          </Typography>
        </Box>
      </Box>
      {/* <Box sx={{ p: 1 }}>
        <IconButton onClick={handleToggleEdit} aria-label="edit">
          <EditIcon style={{ fontSize: "48pt" }} />
        </IconButton>
      </Box> */}
      <Box sx={{ p: 0.0 }}>
        <Box sx={{ p: 0.0 }}>
          <Stack direction="row">
            <IconButton aria-label="like">
              <ThumbUpOffAltOutlinedIcon
                style={{ color: "black", fontSize: "40pt" }}
              />
            </IconButton>

            <Typography
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                color: "black",
              }}
              sx={{ pr: 6 }}
            >
              404
            </Typography>

            <IconButton aria-label="dislike">
              <ThumbDownAltOutlinedIcon
                style={{ color: "black", fontSize: "35pt" }}
              />
            </IconButton>

            <Typography
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                color: "black",
              }}
              sx={{ pr: 6 }}
            >
              404
            </Typography>

            <IconButton
              onClick={(event) => {
                handleDeleteList(event, idNamePair._id);
              }}
              aria-label="delete"
            >
              <DeleteIcon style={{ color: "black", fontSize: "35pt" }} />
            </IconButton>
          </Stack>
        </Box>

        <Box sx={{ p: 0.0 }}>
          <Stack direction="row">
            <Box sx={{ p: 0.0, flexGrow: 1 }}>
              <Stack
                direction="row"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    color: "black",
                  }}
                >
                  Views: &nbsp;
                </Typography>
                <Typography
                  sx={{ p: 0.0, flexGrow: 1 }}
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    color: "#ab0000",
                  }}
                >
                  420
                </Typography>
                <IconButton>
                  <KeyboardArrowDownOutlinedIcon />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </ListItem>
  );

  if (editActive) {
    cardElement = (
      <TextField
        margin="normal"
        required
        fullWidth
        id={"list-" + idNamePair._id}
        label="Top 5 List Name"
        name="name"
        autoComplete="Top 5 List Name"
        className="list-card"
        onKeyPress={handleKeyPress}
        onChange={handleUpdateText}
        onBlur={handleBlur}
        defaultValue={idNamePair.name}
        inputProps={{ style: { fontSize: 48 } }}
        InputLabelProps={{ style: { fontSize: 24 } }}
        autoFocus
      />
    );
  }
  return cardElement;
}

export default ListCard;
