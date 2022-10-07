import { useEffect, useReducer } from 'react';
import { database } from '../firebase';
import { useProvideContext } from '../contexts/Context';

const ACTIONS = {
  SELECT_FOLDER: 'select-folder',
  UPDATE_FOLDER: 'update-folder',
  SET_CHILD_FOLDERS: 'set-child-folders',
  SET_CHILD_FILES: 'set-child-files',
  SET_ALL_FILES: 'set-all-files',
  SET_ALL_FOLDERS: 'set-all-folders',
};

// this is fake folder that only exist in our code to provide a -
// base folder for the folders in our database

// id = null because it doesn't have an id in the database
// path are folders that come before the folder
export const ROOT_FOLDER = { name: 'Root', id: null, path: [] };
function reducer(
  state: any,
  action: {
    type: string;
    payload: any;
  }
) {
  switch (action.type) {
    case ACTIONS.SELECT_FOLDER: // selecting a brand new folder
      return {
        folderId: action.payload.folderId,
        folder: action.payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        // only update the folder portion of our state
        ...state,
        folder: action.payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        // only update the folder portion of our state
        ...state,
        childFolders: action.payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        // only update the file portion of our state
        ...state,
        childFiles: action.payload.childFiles,
      };
    case ACTIONS.SET_ALL_FILES:
      return {
        // only update the file portion of our state
        ...state,
        allFiles: action.payload.allFiles,
      };
    case ACTIONS.SET_ALL_FOLDERS:
      return {
        // only update the file portion of our state
        ...state,
        allFolders: action.payload.allFolders,
      };
    default:
      return state; // return default state
  }
}

export function useFolder(folderId: string | null = null, folder: any = null) {
  const initialState: any = {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
    allFiles: [],
    allFolders: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { currentUser }: any = useProvideContext();

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: {
        folderId,
        folder,
      },
    });
  }, [folderId, folder]);

  // load all details about the folder using the folderId
  useEffect(() => {
    // if we are in the root folder
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    // if folderId is not null, get folder from firestore

    database.folders
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch((e) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  // rendering children
  useEffect(() => {
    const cleanup = database.folders
      .where('parentId', '==', folderId)
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          // set childFolders
          // get documents from firebase
          payload: { childFolders: snapshot.docs.map(database.formatDoc) },
        });
      });

    return () => cleanup(); // cleanup function for snapshot
  }, [folderId, currentUser]);

  // get the child files of the folder
  useEffect(() => {
    const cleanup = database.files
      .where('folderId', '==', folderId)
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: snapshot.docs.map(database.formatDoc) },
        });
      });

    return () => cleanup(); // cleanup function for snapshot
  }, [folderId, currentUser]);

  // get all files of the user
  useEffect(() => {
    const cleanup = database.files
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_ALL_FILES,
          payload: { allFiles: snapshot.docs.map(database.formatDoc) },
        });
      });

    return () => cleanup(); // cleanup function for snapshot
  }, [folderId, currentUser]);

  // get all folders of the user
  useEffect(() => {
    const cleanup = database.folders
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_ALL_FOLDERS,
          payload: { allFolders: snapshot.docs.map(database.formatDoc) },
        });
      });

    return () => cleanup(); // cleanup function for snapshot
  }, [folderId, currentUser]);

  return state;
}
