import {gql} from "@apollo/client"


export const DELETE_USER =gql`
 mutation deleteuser($id:ID!){
    deleteUser(id:$id){
        id
        name
    }
 }
`;
export const ADD_USER =gql`
 mutation adduser($name:String!,$email:String!,$password:String!){
    addUser(name:$name,email:$email,password:$password){
        id
        name
        email
        password
    }
 }
`;
export const EDIT_USER =gql`
 mutation updateuser($id:ID!,$name:String,$email:String){
    updateuser(id:$id,name:$name,email:$email){
        id
        name
        email
        password
    }
 }
`;

export const ADD_TASK =gql`
   mutation Addtask($user:ID!,$title:String!,$description:String!){
    addTask(user:$user,title:$title,description:$description){
        id
        title
        description
        user{
            id
            name
            email
        }
    }
   }
`;
export const EDIT_TASK =gql`
   mutation Addtask($id:ID!,$title:String,$description:String){
    updatetask(id:$id,title:$title,description:$description){
        id
        title
        description
        user{
            id
            name
            email
        }
    }
   }
`;

export const DELETE_TASK =gql`
 mutation deletetask($id:ID!){
    deletetask(id:$id){
        id
        title
        description
    }
 }
`;