//data.js
const graphql = require("graphql");
const Shortcuts = require("../models/Shortcuts");
var async = require("async");
//https://www.compose.com/articles/using-graphql-with-mongodb/
//https://stackoverflow.com/questions/50982886/graphiql-returning-null-values-when-trying-to-fetch-a-particular-single-record
//https://stackoverflow.com/questions/48589649/graphql-returning-null-data-from-axios
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLListType
} = graphql;

let LibraryType = new GraphQLObjectType({
  name: "LibraryType",
  fields: () => ({
    _id: { type: GraphQLID },
    libraryName: { type: GraphQLString },
    libraryDescription: { type: GraphQLString },
    actions: { type: GraphQLList(ActionsType) }
  })
});

let NewShortcutLibraryType = new GraphQLInputObjectType({
  name: "NewShortcutLibraryType",
  fields: () => ({
    library_id: { type: GraphQLID },
    libraryName: { type: GraphQLString },
    libraryDescription: { type: GraphQLString },
    actions: { type: GraphQLList(NewActionsType) }
  })
});

let ActionsType = new GraphQLObjectType({
  name: "Actions",
  fields: () => ({
    actionName: { type: GraphQLString },
    keyCodes: { type: GraphQLList(KeyCodeType) }
  })
});

let NewActionsType = new GraphQLInputObjectType({
  name: "NewActions",
  fields: () => ({
    actionName: { type: GraphQLString },
    keyCodes: { type: GraphQLList(NewKeyCodeType) }
  })
});

let KeyCodeType = new GraphQLObjectType({
  name: "KeyCodeType",
  fields: () => ({
    keyCode: { type: GraphQLInt },
    keyName: { type: GraphQLString }
  })
});

let NewKeyCodeType = new GraphQLInputObjectType({
  name: "NewKeyCodeType",
  fields: () => ({
    keyCode: { type: GraphQLInt },
    keyName: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllLibraries: {
      type: new GraphQLList(LibraryType),
      args: null,
      resolve: () => {
        return new Promise((resolve, reject) => {
          Shortcuts.find((err, shortcuts) => {
            if (err) reject(err);
            else {
              console.log(shortcuts);
              resolve(shortcuts);
            }
          });
        });
      }
    },
    getCurrentLibrary: {
      type: LibraryType,
      args: { libraryName: { type: GraphQLString }, _id: { type: GraphQLID } },
      resolve: (root, args) => {
        return new Promise((resolve, reject) => {
          Shortcuts.findOne(
            { libraryName: args.libraryName },
            (err, shortcuts) => {
              if (err) reject(err);
              else {
                console.log(shortcuts);
                resolve(shortcuts);
                console.log(args.libraryName);
              }
            }
          );
        });
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addShortcutLibrary: {
      type: new GraphQLList(LibraryType),
      args: {
        libraryName: { type: GraphQLString },
        libraryDescription: { type: GraphQLString },
        actions: { type: new GraphQLList(NewActionsType) }
      },
      resolve(parent, args) {
        let shortcut = new Shortcuts({
          libraryName: args.libraryName,
          libraryDescription: args.libraryDescription,
          actions: args.actions
        });
        console.log(shortcut);
        return shortcut.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
