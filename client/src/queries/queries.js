import { gql } from "apollo-boost";

const getAllLibrariesQuery = gql`
  {
    getAllLibraries {
      libraryName
      actions {
        actionName
        keyCodes
      }
    }
  }
`;

const getCurrentLibraryQuery = gql`
  query($libraryName: String!) {
    getCurrentLibrary(libraryName: $libraryName) {
      _id
      libraryName
      actions {
        actionName
        keyCodes
        keyNames
      }
    }
  }
`;

const addShortCutLibraryMutation = gql`
  mutation($libraryName: String!, $actions: [NewActions!]!) {
    addShortcutLibrary(libraryName: $libraryName, actions: $actions) {
      libraryName
    }
  }
`;
export {
  addShortCutLibraryMutation,
  getAllLibrariesQuery,
  getCurrentLibraryQuery
};
