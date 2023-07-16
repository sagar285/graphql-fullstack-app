const User = require("../models/User");
const Task = require("../models/Task");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const Taskschema = new GraphQLObjectType({
  name: "Task",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    user: {
      type: Userschema,
      resolve(parent, args) {
        return User.findById(parent.user);
      },
    },
  }),
});

const Userschema = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

// query in graphql
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    tasks: {
      type: new GraphQLList(Taskschema),
      resolve(parent, args) {
        return Task.find();
      },
    },
    task: {
      type: Taskschema,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Task.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(Userschema),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: Userschema,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
  },
});

// mutation in graphql
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: Userschema,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
        });
        return user.save();
      },
    },
    updateuser: {
      type: Userschema,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        email: { type: GraphQLString},
      },
      resolve(parent, args) {
        return User.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              email: args.email,
            },
          },
          {
            new: true,
          }
        );
      },
    },
    deleteUser:{
        type:Userschema,
        args:{
            id:{type:GraphQLNonNull(GraphQLID)},
        },
        resolve(parent,args){
          Task.find({user:args.id}).then((task)=>{
            task.forEach(data=>{
              data.deleteOne();
            })
          })
            return User.findByIdAndDelete(args.id);
        }
    },
    addTask:{
        type:Taskschema,
        args:{
            title: { type: GraphQLNonNull(GraphQLString) },
            description: { type: GraphQLNonNull(GraphQLString) },
            user: { type: GraphQLNonNull(GraphQLID) },
        },
        resolve(parent,args){
            const task = new Task({
                title:args.title,
                description:args.description,
                user:args.user,
            })
            return task.save();
        }
    },
    updatetask:{
        type:Taskschema,
        args:{
            id: { type: GraphQLNonNull(GraphQLID) },
            title: { type: GraphQLString },
            description: { type:GraphQLString }, 
        },
        resolve(parent,args){
            return Task.findByIdAndUpdate(args.id,{
                $set:{
                    title:args.title,
                    description:args.description
                }
            },{new:true});
        }
    },
    deletetask:{
        type:Taskschema,
        args:{id:{type:GraphQLNonNull(GraphQLID)}},
        resolve(parent,args){
            return Task.findByIdAndDelete(args.id);
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
