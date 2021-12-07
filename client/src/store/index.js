import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import jsTPS from "../common/jsTPS";
import api from "../api";
import MoveItem_Transaction from "../transactions/MoveItem_Transaction";
import UpdateItem_Transaction from "../transactions/UpdateItem_Transaction";
import AuthContext from "../auth";
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
  CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
  CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
  CREATE_NEW_LIST: "CREATE_NEW_LIST",
  LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
  MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
  UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
  SET_CURRENT_LIST: "SET_CURRENT_LIST",
  SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
  SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
  RESET_COUNTER: "RESET_COUNTER",
  SET_MENU: "SET_MENU",
  SET_QUERY: "SET_QUERY",
  SET_SORT: "SET_SORT",
  LOAD_AGG_LISTS: "LOAD_AGG_LISTS",
};

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
  // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
  const [store, setStore] = useState({
    idNamePairs: [],
    currentList: null,
    newListCounter: 0,
    listNameActive: false,
    itemActive: false,
    listMarkedForDeletion: null,
    currentMenu: 1,
    searchQuery: "",
    sortMode: 0,
    aggLists: [],
  });
  const history = useHistory();

  // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
  const { auth } = useContext(AuthContext);

  // HERE'S THE DATA STORE'S REDUCER, IT MUST
  // HANDLE EVERY TYPE OF STATE CHANGE
  const storeReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      // LIST UPDATE OF ITS NAME
      case GlobalStoreActionType.CHANGE_LIST_NAME: {
        return setStore({
          idNamePairs: payload.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      // STOP EDITING THE CURRENT LIST
      case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      // CREATE A NEW LIST
      case GlobalStoreActionType.CREATE_NEW_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter + 1,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      // GET ALL THE LISTS SO WE CAN PRESENT THEM
      case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
        return setStore({
          idNamePairs: payload,
          currentList: null,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: payload,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      // PREPARE TO DELETE A LIST
      case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: null,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      // UPDATE A LIST
      case GlobalStoreActionType.SET_CURRENT_LIST: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      // START EDITING A LIST ITEM
      case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          isListNameEditActive: false,
          isItemEditActive: true,
          listMarkedForDeletion: null,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      // START EDITING A LIST NAME
      case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: payload,
          newListCounter: store.newListCounter,
          isListNameEditActive: true,
          isItemEditActive: false,
          listMarkedForDeletion: null,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      case GlobalStoreActionType.RESET_COUNTER: {
        return setStore({
          idNamePairs: [],
          currentList: null,
          newListCounter: 0,
          listNameActive: false,
          itemActive: false,
          listMarkedForDeletion: null,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      case GlobalStoreActionType.SET_MENU: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          itemActive: store.itemActive,
          listMarkedForDeletion: store.listMarkedForDeletion,
          currentMenu: payload,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      case GlobalStoreActionType.SET_QUERY: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          itemActive: store.itemActive,
          listMarkedForDeletion: store.listMarkedForDeletion,
          currentMenu: store.currentMenu,
          searchQuery: payload,
          sortMode: store.sortMode,
          aggLists: store.aggLists,
        });
      }
      case GlobalStoreActionType.SET_SORT: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          itemActive: store.itemActive,
          listMarkedForDeletion: store.listMarkedForDeletion,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: payload,
          aggLists: store.aggLists,
        });
      }
      case GlobalStoreActionType.LOAD_AGG_LISTS: {
        return setStore({
          idNamePairs: store.idNamePairs,
          currentList: store.currentList,
          newListCounter: store.newListCounter,
          listNameActive: store.listNameActive,
          itemActive: store.itemActive,
          listMarkedForDeletion: store.listMarkedForDeletion,
          currentMenu: store.currentMenu,
          searchQuery: store.searchQuery,
          sortMode: store.sortMode,
          aggLists: payload,
        });
      }
      default:
        return store;
    }
  };

  // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
  // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN
  // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

  // THIS FUNCTION PROCESSES CHANGING A LIST NAME
  store.changeListName = async function (id, newName) {
    let response = await api.getTop5ListById(id);
    if (response.data.success) {
      let top5List = response.data.top5List;
      top5List.name = newName;
      async function updateList(top5List) {
        response = await api.updateTop5ListById(top5List._id, top5List);
        if (response.data.success) {
          async function getListPairs(top5List) {
            response = await api.getTop5ListPairs();
            if (response.data.success) {
              let pairsArray = response.data.idNamePairs;
              storeReducer({
                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                payload: {
                  idNamePairs: pairsArray,
                  top5List: top5List,
                },
              });
            }
          }
          getListPairs(top5List);
        }
      }
      updateList(top5List);
    }
  };

  // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
  store.closeCurrentList = function () {
    storeReducer({
      type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
      payload: {},
    });

    tps.clearAllTransactions();
    history.push("/");
  };

  // THIS FUNCTION CREATES A NEW LIST
  store.createNewList = async function (mode) {
    let newListName = "Untitled" + store.newListCounter;
    let payload = {
      name: newListName,
      items: ["1", "2", "3", "4", "5"],
      ownerEmail: auth.user.email,
      username: auth.user.username,
      likes: [],
      dislikes: [],
      views: 0,
      public: mode,
      comments: [],
    };
    const response = await api.createTop5List(payload);
    if (response.data.success) {
      tps.clearAllTransactions();
      let newList = response.data.top5List;
      storeReducer({
        type: GlobalStoreActionType.CREATE_NEW_LIST,
        payload: newList,
      });

      // IF IT'S A VALID LIST THEN LET'S START EDITING IT
      history.push("/top5list/" + newList._id);
    } else {
      console.log("API FAILED TO CREATE A NEW LIST");
    }
  };

  // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
  store.loadIdNamePairs = async function () {
    const response = await api.getTop5ListPairs({ email: auth.user.email });
    if (response.data.success) {
      let pairsArray = response.data.idNamePairs;
      storeReducer({
        type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
        payload: pairsArray,
      });
    } else {
      console.log("API FAILED TO GET THE LIST PAIRS");
    }
  };
  store.loggedOut = async function () {
    storeReducer({
      type: GlobalStoreActionType.RESET_COUNTER,
      payload: null,
    });
  };
  // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
  // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
  // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
  // showDeleteListModal, and hideDeleteListModal
  store.markListForDeletion = async function (id) {
    // GET THE LIST
    let response = await api.getTop5ListById(id);
    if (response.data.success) {
      let top5List = response.data.top5List;
      storeReducer({
        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
        payload: top5List,
      });
    }
  };

  store.deleteList = async function (listToDelete) {
    let response = await api.deleteTop5ListById(listToDelete._id);
    if (response.data.success) {
      store.loadIdNamePairs();
      history.push("/");
    }
  };

  store.deleteMarkedList = function () {
    store.deleteList(store.listMarkedForDeletion);
  };

  store.getAggLists = async function () {
    console.log("starting");
    const response = await api.getAggLists();
    if (response.data.success) {
      let agglists = response.data.data;
      storeReducer({
        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
        payload: agglists,
      });
    }
  };

  store.unmarkListForDeletion = function () {
    storeReducer({
      type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
      payload: null,
    });
  };

  // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
  // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
  // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
  // moveItem, updateItem, updateCurrentList, undo, and redo
  store.setCurrentList = async function (id) {
    let response = await api.getTop5ListById(id);
    if (response.data.success) {
      let top5List = response.data.top5List;

      response = await api.updateTop5ListById(top5List._id, top5List);
      if (response.data.success) {
        storeReducer({
          type: GlobalStoreActionType.SET_CURRENT_LIST,
          payload: top5List,
        });
        history.push("/top5list/" + top5List._id);
      }
    }
  };

  store.editCurrentList = function (top5List) {
    storeReducer({
      type: GlobalStoreActionType.SET_CURRENT_LIST,
      payload: top5List,
    });
    history.push("/top5list/" + top5List._id);
  };

  store.addMoveItemTransaction = function (start, end) {
    let transaction = new MoveItem_Transaction(store, start, end);
    tps.addTransaction(transaction);
  };

  store.addUpdateItemTransaction = function (index, newText) {
    let oldText = store.currentList.items[index];
    let transaction = new UpdateItem_Transaction(
      store,
      index,
      oldText,
      newText
    );
    tps.addTransaction(transaction);
  };

  store.moveItem = function (start, end) {
    start -= 1;
    end -= 1;
    if (start < end) {
      let temp = store.currentList.items[start];
      for (let i = start; i < end; i++) {
        store.currentList.items[i] = store.currentList.items[i + 1];
      }
      store.currentList.items[end] = temp;
    } else if (start > end) {
      let temp = store.currentList.items[start];
      for (let i = start; i > end; i--) {
        store.currentList.items[i] = store.currentList.items[i - 1];
      }
      store.currentList.items[end] = temp;
    }

    // NOW MAKE IT OFFICIAL
    store.updateCurrentList();
  };

  store.updateItem = function (index, newItem) {
    store.currentList.items[index] = newItem;
    store.updateCurrentList();
  };
  store.updateMenu = function (val) {
    console.log(val);
    storeReducer({
      type: GlobalStoreActionType.SET_MENU,
      payload: val,
    });
    history.push("/");
  };
  store.updateQuery = function (val) {
    storeReducer({
      type: GlobalStoreActionType.SET_QUERY,
      payload: val,
    });
  };
  store.updateSort = function (val) {
    storeReducer({
      type: GlobalStoreActionType.SET_SORT,
      payload: val,
    });
  };

  store.updateCurrentList = async function () {
    const response = await api.updateTop5ListById(
      store.currentList._id,
      store.currentList
    );
    if (response.data.success) {
      storeReducer({
        type: GlobalStoreActionType.SET_CURRENT_LIST,
        payload: store.currentList,
      });
    }
  };

  store.addComment = async function (id, comment) {
    async function updateList(top5List) {
      let response = await api.updateTop5ListById(top5List._id, top5List);
      if (response.data.success) {
        async function getListPairs(top5List) {
          response = await api.getTop5ListPairs();
          if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
              type: GlobalStoreActionType.CHANGE_LIST_NAME,
              payload: {
                idNamePairs: pairsArray,
                top5List: top5List,
              },
            });
          }
        }
        getListPairs(top5List);
      }
    }

    const response = await api.getTop5ListById(id);
    let list = response.data.top5List;
    list.comments.push(comment);
    updateList(list);
  };

  store.incrementVote = async function (id) {
    async function updateList(top5List) {
      let response = await api.updateTop5ListById(top5List._id, top5List);
      if (response.data.success) {
        async function getListPairs(top5List) {
          response = await api.getTop5ListPairs();
          if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
              type: GlobalStoreActionType.CHANGE_LIST_NAME,
              payload: {
                idNamePairs: pairsArray,
                top5List: top5List,
              },
            });
          }
        }
        getListPairs(top5List);
      }
    }
    console.log("2");
    const response = await api.getTop5ListById(id);
    console.log("3");
    let list = response.data.top5List;
    console.log(list);
    list.views++;
    console.log(list);
    updateList(list);
  };
  store.setLike = async function (id) {
    async function updateList(top5List) {
      let response = await api.updateTop5ListById(top5List._id, top5List);
      if (response.data.success) {
        async function getListPairs(top5List) {
          response = await api.getTop5ListPairs();
          if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
              type: GlobalStoreActionType.CHANGE_LIST_NAME,
              payload: {
                idNamePairs: pairsArray,
                top5List: top5List,
              },
            });
          }
        }
        getListPairs(top5List);
      }
    }

    const response = await api.getTop5ListById(id);
    let list = response.data.top5List;
    console.log(auth.user.username);
    if (list.dislikes.includes(auth.user.username)) {
      list.dislikes = list.dislikes.filter(function (name) {
        return name !== auth.user.username;
      });
      list.likes.push(auth.user.username);
      updateList(list);
    } else if (list.likes.includes(auth.user.username)) {
      list.likes = list.likes.filter(function (name) {
        return name !== auth.user.username;
      });
      updateList(list);
    } else {
      list.likes.push(auth.user.username);
      updateList(list);
    }
  };
  store.setDislike = async function (id) {
    async function updateList(top5List) {
      let response = await api.updateTop5ListById(top5List._id, top5List);
      if (response.data.success) {
        async function getListPairs(top5List) {
          response = await api.getTop5ListPairs();
          if (response.data.success) {
            let pairsArray = response.data.idNamePairs;
            storeReducer({
              type: GlobalStoreActionType.CHANGE_LIST_NAME,
              payload: {
                idNamePairs: pairsArray,
                top5List: top5List,
              },
            });
          }
        }
        getListPairs(top5List);
      }
    }

    const response = await api.getTop5ListById(id);
    let list = response.data.top5List;
    console.log(auth.user.username);
    if (list.likes.includes(auth.user.username)) {
      list.likes = list.likes.filter(function (name) {
        return name !== auth.user.username;
      });
      list.dislikes.push(auth.user.username);
      updateList(list);
    } else if (list.dislikes.includes(auth.user.username)) {
      list.dislikes = list.dislikes.filter(function (name) {
        return name !== auth.user.username;
      });
      updateList(list);
    } else {
      list.dislikes.push(auth.user.username);
      updateList(list);
    }
  };
  store.undo = function () {
    tps.undoTransaction();
  };

  store.redo = function () {
    tps.doTransaction();
  };

  store.canUndo = function () {
    return tps.hasTransactionToUndo();
  };

  store.canRedo = function () {
    return tps.hasTransactionToRedo();
  };

  // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
  store.setIsListNameEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
      payload: null,
    });
  };

  // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
  store.setIsItemEditActive = function () {
    storeReducer({
      type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
      payload: null,
    });
  };

  return (
    <GlobalStoreContext.Provider
      value={{
        store,
      }}
    >
      {props.children}
    </GlobalStoreContext.Provider>
  );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
