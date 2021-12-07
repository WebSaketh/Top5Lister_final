import React, { useContext, useEffect, useState } from "react";
import { GlobalStoreContext } from "../store";
import ListCard from "./ListCard.js";
import ListCard2 from "./ListCard2.js";
import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import LoadMenu from "./LoadMenu.js";
import AuthContext from "../auth";
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    await store.loadIdNamePairs();
    await store.fetchAggLists();
  }

  function handleCreateNewList() {
    store.createNewList();
  }
  let listCard = "";
  let listCard2 = "";
  let p = store.idNamePairs;
  if (store.currentMenu == 1) {
    p = p.filter(function (list, index) {
      return list.username == auth.user.username;
    });
  }
  if (store.currentMenu == 2) {
    p = p.filter(function (list, index) {
      return list.public;
    });
  }
  if (store.currentMenu == 3) {
    p = p.filter(function (list, index) {
      return list.public;
    });
  }
  if (store.sortMode == 0) {
    p = p.sort((a, b) => b.views - a.views);
  }
  if (store.sortMode == 1) {
    p = p.sort((a, b) => b.likes.length - a.likes.length);
  }
  if (store.sortMode == 2) {
    p = p.sort((a, b) => b.dislikes.length - a.dislikes.length);
  }
  if (store.sortMode == 3) {
    p = p.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }
  if (store.sortMode == 4) {
    p = p.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  }

  if (store.currentMenu == 1 && store.searchQuery !== "") {
    p = p.filter(function (list, index) {
      return list.name.toLowerCase().includes(store.searchQuery.toLowerCase());
    });
  }
  if (store.currentMenu == 2 && store.searchQuery !== "") {
    p = p.filter(function (list, index) {
      return list.name.toLowerCase().includes(store.searchQuery.toLowerCase());
    });
  }
  if (store.currentMenu == 3 && store.searchQuery !== "") {
    p = p.filter(function (list, index) {
      return list.username
        .toLowerCase()
        .includes(store.searchQuery.toLowerCase());
    });
  }
  if (store) {
    listCard = (
      <List
        sx={{ width: "96%", left: "2%", bgcolor: "transparent", p: 0, pu: 0 }}
      >
        {p.map((pair) => (
          <ListCard key={pair._id} idNamePair={pair} selected={false} />
        ))}
      </List>
    );
    listCard2 = (
      <List
        sx={{ width: "96%", left: "2%", bgcolor: "transparent", p: 0, pu: 0 }}
      >
        {store.aggLists.map((pair) => (
          <ListCard2 key={pair._id} idNamePair={pair} selected={false} />
        ))}
      </List>
    );
  }
  if (store.currentMenu == 4) {
    let p = store.aggLists;
    if (store.sortMode == 0) {
      p = p.sort((a, b) => b.views - a.views);
    }
    if (store.sortMode == 1) {
      p = p.sort((a, b) => b.likes.length - a.likes.length);
    }
    if (store.sortMode == 2) {
      p = p.sort((a, b) => b.dislikes.length - a.dislikes.length);
    }
    if (store.sortMode == 3) {
      p = p.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }
    if (store.sortMode == 4) {
      p = p.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
    }
    if (store.searchQuery != "") {
      console.log(store.searchQuery, "serach QUesry");
      let counter = 0;
      p = p.filter(function (list, index) {
        return list.name
          .toLowerCase()
          .includes(store.searchQuery.toLowerCase());
      });
    }
    console.log("p", p);
    console.log("in current menu 4", store);
    return (
      <div>
        <LoadMenu />
        <div id="top5-list-selector">
          <div id="list-selector-list">
            <List
              sx={{
                width: "96%",
                left: "2%",
                bgcolor: "transparent",
                p: 0,
                pu: 0,
              }}
            >
              {p.map((pair) => (
                <ListCard2 key={pair._id} idNamePair={pair} selected={false} />
              ))}
            </List>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LoadMenu />
      <div id="top5-list-selector">
        <div id="list-selector-list">{listCard}</div>
      </div>
    </div>
  );
};

export default HomeScreen;
