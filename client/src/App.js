import React from 'react'
import {Routes,Route} from "react-router-dom"
import {ApolloProvider,ApolloClient,InMemoryCache} from "@apollo/client"
import Navbar from './component/Navbar'
import Users from './pages/Users'
import Adduser from './pages/Adduser'
import Viewuser from './pages/Viewuser'
import Edituser from './pages/Edituser'
import Addtask from './pages/Addtask'
import Tasks from './pages/Tasks'
import Viewtask from './pages/Viewtask'
import Edittask from './pages/Edittask'



const client = new ApolloClient({
  uri:'http://localhost:8000/graphql',
  cache:new InMemoryCache(),
})
const App = () => {
  return (
    <ApolloProvider client={client}>
      <Navbar/>
  <Routes>
    <Route path='/' element={<Users/>}/>  
    <Route path='/adduser' element={<Adduser/>}/>
    <Route path='/viewuser/:id' element={<Viewuser/>}/>
    <Route path='/viewtask/:id' element={<Viewtask/>}/>
    <Route path='/edituser/:id' element={<Edituser/>}/>
    <Route path='/edittask/:id' element={<Edittask/>}/>
    <Route path='/addtask' element={<Addtask/>}/>
    <Route path='/tasks' element={<Tasks/>}/>
  </Routes>
  </ApolloProvider>
  )
}

export default App