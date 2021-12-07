import { useContext, useEffect } from "react";
import Top5Item from "./Top5Item.js";
import List from "@mui/material/List";
import { Button, Stack, Typography, Box } from "@mui/material";
import { GlobalStoreContext } from "../store/index.js";
import LoadMenu from "./LoadMenu.js";
import Top5Title from "./Top5Title.js";
import AuthContext from "../auth";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (store.currentList == null) {
      const id = window.location.pathname.substring("/top5list/".length);
      store.setCurrentList(id);
    }
  });
  let editItems = "";
  if (store.currentList) {
    editItems = (
      <List
        id="edit-items"
        sx={{ width: "100%", bgcolor: "background.paper", pt: 0 }}
      >
        {store.currentList.items.map((item, index) => (
          <Top5Item
            key={"top5-item-" + (index + 1)}
            text={item}
            index={index}
          />
        ))}
      </List>
    );
  }
  const save = function () {
    store.updateCurrentList();
    store.closeCurrentList();
  };
  function publish() {
    console.log(store.currentList.name);
    console.log(store.idNamePairs);

    return;
    store.currentList.public = true;
    store.updateCurrentList();
    store.closeCurrentList();
  }

  const isDisabled = function () {
    if (store.currentList?.items[0] === "") {
      return true;
    }
    if (store.currentList?.items[1] === "") {
      return true;
    }
    if (store.currentList?.items[2] === "") {
      return true;
    }
    if (store.currentList?.items[3] === "") {
      return true;
    }
    if (store.currentList?.items[4] === "") {
      return true;
    }
    if (store.currentList?.name == "") {
      return true;
    }
    let k = false;
    store.idNamePairs.forEach((e) => {
      if (
        e.username == auth.user.username &&
        e.name.toLowerCase() == store.currentList.name.toLowerCase()
      ) {
        k = true;
      }
    });
    return k;
  };
  return (
    <div>
      <LoadMenu disabled="true" />
      <Top5Title />
      <div id="top5-workspace">
        <div id="workspace-edit">
          <div id="edit-numbering">
            <div className="item-number">
              <Typography variant="h3">1.</Typography>
            </div>
            <div className="item-number">
              <Typography variant="h3">2.</Typography>
            </div>
            <div className="item-number">
              <Typography variant="h3">3.</Typography>
            </div>
            <div className="item-number">
              <Typography variant="h3">4.</Typography>
            </div>
            <div className="item-number">
              <Typography variant="h3">5.</Typography>
            </div>
          </div>
          {editItems}
        </div>
      </div>

      <Stack
        direction="row"
        style={{ position: "absolute", top: "80%", left: "60%" }}
      >
        <Button
          sx={{ ml: 3 }}
          style={{ fontSize: 40, backgroundColor: "grey" }}
          variant="contained"
          onClick={save}
        >
          Save
        </Button>
        <Button
          sx={{ ml: 3 }}
          style={{ fontSize: 40, backgroundColor: "grey" }}
          variant="contained"
          disabled={isDisabled()}
          onClick={publish}
        >
          Publish
        </Button>
      </Stack>
    </div>
  );
}

export default WorkspaceScreen;
