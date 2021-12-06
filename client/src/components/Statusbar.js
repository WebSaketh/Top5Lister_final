import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { Button, Typography } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AuthContext from "../auth";
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  function handleCreateNewList() {
    store.createNewList(0);
  }
  function textDisable() {
    if (store.isListNameEditActive || store.currentList) {
      return { opacity: 0.5 };
    }
    return {};
  }
  let text = "";
  if (store.currentList) text = store.currentList.name;
  if (!auth.user) {
    return <div id="top5-statusbar" />;
  }
  return (
    <div id="top5-statusbar">
      <Button
        color="primary"
        aria-label="add"
        id="add-list-button"
        onClick={handleCreateNewList}
        disabled={store.isListNameEditActive || store.currentList}
        size="small"
        style={{ color: "black" }}
      >
        <AddIcon style={{ color: "black", fontSize: "50px" }} />
      </Button>
      <Typography style={textDisable()} variant="h4">
        Your Lists
      </Typography>
    </div>
  );
}

export default Statusbar;
