const express =require("express");
const app=express();
require("./config/dbconn");
const schema =require("./schema/schema");
const {graphqlHTTP} =require("express-graphql")

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}))



app.listen(8000,()=>{
    console.log(`server listening on 8000`)
})