import { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./DeleteModal";
import { List, ListItemButton, ListItemText, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { InputBase, Paper } from "@mui/material";
import { FixedSizeList } from "react-window";
import AuthContext from "../auth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
export default function ListCard2(props) {
  const { store } = useContext(GlobalStoreContext);
  const [editActive, setEditActive] = useState(false);
  const { idNamePair } = props;
  const [text, setText] = useState(idNamePair.name);
  const [open, setOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  function handleLoadList(event, id) {
    if (!event.target.disabled) {
      // CHANGE THE CURRENT LIST
      store.setCurrentList(id);
    }
  }
  function handleComment(e) {
    e.preventDefault();
    console.log(idNamePair);
    const formData = new FormData(e.currentTarget);
    let comment = auth.user.username + "@" + formData.get("comment");
    store.addComment(idNamePair._id, comment);
  }

  return <div> {idNamePair.name}</div>;

  function handleToggleEdit(event) {
    event.stopPropagation();
    toggleEdit(event);
  }
  function handleBlur() {
    toggleEdit();
    setText(idNamePair.name);
  }

  const date = Date(idNamePair.updatedAt);

  function CommentList() {
    const items = idNamePair.comments.map((comment, index) => (
      <li key={index}>
        <Box
          style={{
            backgroundColor: "gold",
            borderRadius: "15px",
            fontSize: "20pt",
            fontWeight: "bold",
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "darkBlue",
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: "1px",
            boxShadow: "0px 1px #888888",
          }}
          sx={{ p: 1.5, px: 2, mb: 1, ml: 1, mr: 1 }}
        >
          <Typography style={{ color: "blue", textDecoration: "underline" }}>
            {comment.substring(0, comment.indexOf("@"))}
          </Typography>
          <Typography style={{ color: "black", fontSize: "15pt" }}>
            {comment.substring(comment.indexOf("@") + 1)}
          </Typography>
        </Box>
      </li>
    ));
    return (
      <ul style={{ listStyleType: "none", paddingInlineStart: 0 }}>{items}</ul>
    );
  }

  function makeOpen() {
    store.incrementVote(idNamePair._id);
    setOpen(true);
  }
  function makeClose() {
    setOpen(false);
  }

  function toggleEdit() {
    let newActive = !editActive;
    if (newActive) {
      store.setIsListNameEditActive(true);
    }
    store.setIsListNameEditActive(false);
    setEditActive(newActive);
  }

  function setLike() {
    store.setLike(idNamePair._id);
  }
  function setDislike() {
    store.setDislike(idNamePair._id);
  }
  async function handleDeleteList(ev, id) {
    ev.preventDefault();
    ev.stopPropagation();
    await store.markListForDeletion(id);
  }

  function likeIcon() {
    if (idNamePair.likes.includes(auth.user.username)) {
      return <ThumbUpIcon style={{ color: "black", fontSize: "40pt" }} />;
    }
    return (
      <ThumbUpOffAltOutlinedIcon style={{ color: "black", fontSize: "40pt" }} />
    );
  }

  const editText1 = function () {
    if (auth.user.username !== idNamePair.username) {
      return (
        <Typography
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            textDecoration: "underline",
            color: "red",
          }}
        ></Typography>
      );
    }
    return (
      <Typography
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          textDecoration: "underline",
          color: "red",
        }}
        onClick={(event) => {
          handleLoadList(event, idNamePair._id);
        }}
      >
        EDIT
      </Typography>
    );
  };

  const editText2 = function () {
    if (auth.user.username !== idNamePair.username) {
      return (
        <Typography
          sx={{ p: 0.0, flexGrow: 1, ml: 2 }}
          style={{
            fontSize: "12px",
            fontWeight: "bold",
            textDecoration: "underline",
            color: "red",
            display: "flex",
            alignItems: "center",
          }}
        ></Typography>
      );
    }
    return (
      <Typography
        sx={{ p: 0.0, flexGrow: 1, ml: 2 }}
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          textDecoration: "underline",
          color: "red",
          display: "flex",
          alignItems: "center",
        }}
        onClick={(event) => {
          handleLoadList(event, idNamePair._id);
        }}
      >
        EDIT
      </Typography>
    );
  };

  const delete1 = function () {
    if (idNamePair.username != auth.user.username) {
      return (
        <IconButton aria-label="delete" disabled={true}>
          <DeleteIcon style={{ color: "transparent", fontSize: "35pt" }} />
        </IconButton>
      );
    }
    return (
      <IconButton
        onClick={(event) => {
          handleDeleteList(event, idNamePair._id);
        }}
        aria-label="delete"
      >
        <DeleteIcon style={{ color: "black", fontSize: "35pt" }} />
      </IconButton>
    );
  };
  const delete2 = function () {
    return (
      <IconButton aria-label="delete" disabled={true}>
        <DeleteIcon style={{ color: "transparent", fontSize: "35pt" }} />
      </IconButton>
    );
    return (
      <IconButton
        onClick={(event) => {
          handleDeleteList(event, idNamePair._id);
        }}
        aria-label="delete"
      >
        <DeleteIcon style={{ color: "black", fontSize: "35pt" }} />
      </IconButton>
    );
  };

  function dislikeIcon() {
    if (idNamePair.dislikes.includes(auth.user.username)) {
      return <ThumbDownIcon style={{ color: "black", fontSize: "40pt" }} />;
    }
    return (
      <ThumbDownAltOutlinedIcon style={{ color: "black", fontSize: "40pt" }} />
    );
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
      // onClick={(event) => {
      //   handleLoadList(event, idNamePair._id);
      // }}
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
              {idNamePair.username}
            </Typography>
          </Stack>
        </Box>
        <Box sx={{ p: 0.5, flexGrow: 1 }}>{editText1()}</Box>
      </Box>
      {/* <Box sx={{ p: 1 }}>
        <IconButton onClick={handleToggleEdit} aria-label="edit">
          <EditIcon style={{ fontSize: "48pt" }} />
        </IconButton>
      </Box> */}
      <Box sx={{ p: 0.0 }}>
        <Box sx={{ p: 0.0 }}>
          <Stack direction="row">
            <IconButton aria-label="like" onClick={setLike}>
              {likeIcon()}
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
              {idNamePair.likes.length}
            </Typography>

            <IconButton aria-label="dislike" onClick={setDislike}>
              {dislikeIcon()}
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
              {idNamePair.dislikes.length}
            </Typography>

            {delete1()}
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
                  {idNamePair.views}
                </Typography>
                <IconButton onClick={makeOpen}>
                  <KeyboardArrowDownOutlinedIcon />
                </IconButton>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </ListItem>
  );
  //when open
  if (open) {
    if (!idNamePair.public) {
      cardElement = (
        <ListItem
          id={idNamePair._id}
          key={idNamePair._id}
          sx={{ marginBottom: "15px", display: "flex", p: 1 }}
          button
          // onClick={(event) => {
          //   handleLoadList(event, idNamePair._id);
          // }}
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
          <Stack sx={{ p: 0.0, pt: 0.5, flexGrow: 1 }}>
            <div>
              <Stack direction="row">
                <Box sx={{ p: 1, flexGrow: 1, ml: 1 }}>
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    {idNamePair.name}
                  </Typography>
                  <Stack sx={{ py: 0.5, pl: 0.2 }} direction="row">
                    <Typography
                      style={{ fontSize: "12px", fontWeight: "bold" }}
                    >
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
                      {idNamePair.username}
                    </Typography>
                  </Stack>
                </Box>
                <Box>
                  <Stack direction="row">
                    <IconButton aria-label="like" onClick={setLike}>
                      {likeIcon()}
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
                      {idNamePair.likes.length}
                    </Typography>

                    <IconButton aria-label="dislike" onClick={setDislike}>
                      {dislikeIcon()}
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
                      {idNamePair.dislikes.length}
                    </Typography>
                    {delete1()}
                  </Stack>
                </Box>
              </Stack>
            </div>
            <div>
              <Stack direction="row">
                <Box
                  sx={{ p: 1, pr: 0, ml: 2 }}
                  style={{
                    backgroundColor: "darkBlue",
                    borderRadius: "5px",
                    fontSize: "25pt",
                    fontWeight: "bold",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    color: "gold",
                    height: "10",
                    width: "50%",
                  }}
                >
                  <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                    1. {idNamePair.items[0]}
                  </Box>
                  <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                    2. {idNamePair.items[1]}
                  </Box>
                  <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                    3. {idNamePair.items[2]}
                  </Box>
                  <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                    4. {idNamePair.items[3]}
                  </Box>
                  <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                    5. {idNamePair.items[4]}
                  </Box>
                </Box>
                <Stack
                  style={{
                    top: "70%",
                    width: "50%",
                    p: 3.0,
                    alignItems: "center",
                  }}
                >
                  <Paper
                    style={{
                      backgroundColor: "transparent",
                      borderRadius: "5px",
                      fontSize: "20pt",
                      fontWeight: "bold",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      color: "darkBlue",
                      width: "100%",
                      overflow: "scroll",
                      overflowX: "hidden",
                      minHeight: 300,
                      maxHeight: 300,
                    }}
                    elevation={0}
                  >
                    <CommentList />
                  </Paper>
                  <Paper
                    component="form"
                    sx={{
                      backgroundColor: "grey",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                    elevation={0}
                    onSubmit={handleComment}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Comment"
                      inputProps={{ "aria-label": "comment" }}
                      name="comment"
                      type="text"
                      id={"comment" + idNamePair._id}
                    />
                  </Paper>
                </Stack>
              </Stack>
            </div>
            <div>
              <Stack direction="row">
                {editText2()}
                <Typography
                  sx={{ p: 0.0, flexGrow: 1 }}
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    color: "#ab0000",
                  }}
                ></Typography>
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
                  {idNamePair.views}
                </Typography>
                <IconButton onClick={makeClose}>
                  <KeyboardArrowUpOutlinedIcon />
                </IconButton>
              </Stack>
            </div>
          </Stack>
        </ListItem>
      );
    }
  }
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

  if (idNamePair.public) {
    cardElement = (
      <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ marginBottom: "15px", display: "flex", p: 1 }}
        button
        // onClick={(event) => {
        //   handleLoadList(event, idNamePair._id);
        // }}
        style={{
          fontSize: "48pt",
          width: "100%",
          borderRadius: "15px",
          backgroundColor: "#D4D4F5",
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
                {idNamePair.username}
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ p: 0.5, flexGrow: 1 }}>
            <Stack direction="row">
              <Typography
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                onClick={(event) => {
                  handleLoadList(event, idNamePair._id);
                }}
              >
                Published: &nbsp;
              </Typography>
              <Typography
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#39AF57",
                }}
                onClick={(event) => {
                  handleLoadList(event, idNamePair._id);
                }}
              >
                {date.toString().substring(4, 15)}
              </Typography>
            </Stack>
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
              <IconButton aria-label="like" onClick={setLike}>
                {likeIcon()}
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
                {idNamePair.likes.length}
              </Typography>

              <IconButton aria-label="dislike" onClick={setDislike}>
                {dislikeIcon()}
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
                {idNamePair.dislikes.length}
              </Typography>
              {delete1()}
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
                    {idNamePair.views}
                  </Typography>
                  <IconButton onClick={makeOpen}>
                    <KeyboardArrowDownOutlinedIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Box>
      </ListItem>
    );
  }
  if (idNamePair.public && open) {
    cardElement = (
      <ListItem
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{ marginBottom: "15px", display: "flex", p: 1 }}
        button
        // onClick={(event) => {
        //   handleLoadList(event, idNamePair._id);
        // }}
        style={{
          fontSize: "48pt",
          width: "100%",
          borderRadius: "15px",
          backgroundColor: "#D4D4F5",
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
        <Stack sx={{ p: 0.0, pt: 0.5, flexGrow: 1 }}>
          <div>
            <Stack direction="row">
              <Box sx={{ p: 1, flexGrow: 1, ml: 1 }}>
                <Typography variant="h5" style={{ fontWeight: "bold" }}>
                  {idNamePair.name}
                </Typography>
                <Stack sx={{ py: 0.5, pl: 0.2 }} direction="row">
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
                    {idNamePair.username}
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Stack direction="row">
                  <IconButton aria-label="like" onClick={setLike}>
                    {likeIcon()}
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
                    {idNamePair.likes.length}
                  </Typography>

                  <IconButton aria-label="dislike" onClick={setDislike}>
                    {dislikeIcon()}
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
                    {idNamePair.dislikes.length}
                  </Typography>
                  {delete2()}
                </Stack>
              </Box>
            </Stack>
          </div>
          <div>
            <Stack direction="row">
              <Box
                sx={{ p: 1, pr: 0, ml: 2 }}
                style={{
                  backgroundColor: "darkBlue",
                  borderRadius: "5px",
                  fontSize: "25pt",
                  fontWeight: "bold",
                  fontFamily: "Arial, Helvetica, sans-serif",
                  color: "gold",
                  height: "10",
                  width: "50%",
                }}
              >
                <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                  1. {idNamePair.items[0]}
                </Box>
                <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                  2. {idNamePair.items[1]}
                </Box>
                <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                  3. {idNamePair.items[2]}
                </Box>
                <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                  4. {idNamePair.items[3]}
                </Box>
                <Box sx={{ p: 0.5, pb: 1, flexGrow: 1, pr: 1, py: 1.5 }}>
                  5. {idNamePair.items[4]}
                </Box>
              </Box>
              <Stack
                style={{
                  top: "70%",
                  width: "50%",
                  p: 3.0,
                  alignItems: "center",
                }}
              >
                <Paper
                  style={{
                    backgroundColor: "transparent",
                    borderRadius: "5px",
                    fontSize: "20pt",
                    fontWeight: "bold",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    color: "darkBlue",
                    width: "100%",
                    overflow: "scroll",
                    overflowX: "hidden",
                    minHeight: 300,
                    maxHeight: 300,
                  }}
                  elevation={0}
                >
                  <CommentList />
                </Paper>
                <Paper
                  component="form"
                  sx={{
                    backgroundColor: "grey",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                  elevation={0}
                  onSubmit={handleComment}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Comment"
                    inputProps={{ "aria-label": "comment" }}
                    name="comment"
                    type="text"
                    id={"comment" + idNamePair._id}
                  />
                </Paper>
              </Stack>
            </Stack>
          </div>
          <div>
            <Stack direction="row">
              <Typography
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
                onClick={(event) => {
                  handleLoadList(event, idNamePair._id);
                }}
              >
                Published: &nbsp;
              </Typography>
              <Typography
                sx={{ p: 0.0, flexGrow: 1 }}
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#39AF57",
                }}
                onClick={(event) => {
                  handleLoadList(event, idNamePair._id);
                }}
              >
                {date.toString().substring(4, 15)}
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
              ></Typography>
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
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Typography>
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
                {idNamePair.views}
              </Typography>
              <IconButton onClick={makeClose}>
                <KeyboardArrowUpOutlinedIcon />
              </IconButton>
            </Stack>
          </div>
        </Stack>
      </ListItem>
    );
  }
  if (store.currentMenu == 4) {
  }
  return cardElement;
}
