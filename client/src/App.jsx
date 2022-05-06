
import './App.css';
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// import Navbar         from './Components/Navbar'
import Home           from './views/Home'
import Page404        from './views/Page404'
import Engagment      from './views/Engagment'
import {Create}       from './views/Create'

// import axios from 'axios'
// const api = axios.create({
//   baseURL: `/api/v1`
// })

function App() {

  // const [postsArray, setPostsArray] = useState([])

  // const getPosts = async () => {
  //   let response = await api.get('/posts').then(({ data }) => data)
  //   // console.log(response.data.posts);
  //   if(response === undefined || response.length === 0){
  //     console.log('no data in database')

  //     return setPostsArray([ {title: "no posts", body: "no messages"} ])
  //   }
  //   // setPostsArray(prevPostsArray => [response.data.posts, ...prevPostsArray])
  //   setPostsArray(response.data.posts)
  // }


  useEffect(() => {
    console.log('App.jsx');
  })

  return (
    <div className="App">
      <header className="App-header">

        <Routes> 
          <Route path="*"                   element={<Page404/>} />
          <Route path='/engagment/:_gigID'  element={<Engagment/>}/>  
          <Route path='/create'             element={<Create/>}/>  
          <Route path='/'                   element={<Home/>}/>  
        </Routes>

      </header>
    </div>
  );
}

export default App;
