import { useContext } from "react";
import { GlobalStoreContext } from "../store";
import { Typography } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
  const { store } = useContext(GlobalStoreContext);
  function handleCreateNewList() {
    store.createNewList();
  }
  function textDisable() {
    if (store.isListNameEditActive || store.currentList) {
      return { opacity: 0.5 };
    }
    return {};
  }
  let text = "";
  if (store.currentList) text = store.currentList.name;
  return (
    <div id="top5-statusbar">
      <Fab
        color="primary"
        aria-label="add"
        id="add-list-button"
        onClick={handleCreateNewList}
        disabled={store.isListNameEditActive || store.currentList}
      >
        <AddIcon />
      </Fab>
      <Typography style={textDisable()} variant="h2">
        Your Lists
      </Typography>
    </div>
  );
}

export default Statusbar;
