import { gql } from "apollo-boost";

const getAllLibrariesQuery = gql`
  {
    getAllLibraries {
      libraryName
      libraryDescription
      actions {
        actionName
        keyCodes {
          keyCode
          keyName
        }
      }
    }
  }
`;

const getCurrentLibraryQuery = gql`
  query($libraryName: String!) {
    getCurrentLibrary(libraryName: $libraryName) {
      _id
      libraryName
      libraryDescription
      actions {
        actionName
        keyCodes {
          keyCode
          keyName
        }
      }
    }
  }
`;

const addShortCutLibraryMutation = gql`
  mutation(
    $libraryName: String!
    $libraryDescription: String!
    $actions: [NewActions!]!
  ) {
    addShortcutLibrary(
      libraryName: $libraryName
      libraryDescription: $libraryDescription
      actions: $actions
    ) {
      libraryName
    }
  }
`;
export {
  addShortCutLibraryMutation,
  getAllLibrariesQuery,
  getCurrentLibraryQuery
};
