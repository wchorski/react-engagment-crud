
import './App.css';
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { RequireAuth } from './Components/RequireAuth';

// import Navbar         from './Components/Navbar'
import Home from './views/Home'
import Page404 from './views/Page404'
import Engagment from './views/Engagment'
import { Layout } from './views/Layout'
import { Create } from './views/Create'
import { Login } from './views/Login'
import { Users } from './views/Users'
import { User } from './views/User'
import { Unauthorized } from './views/Unauthorized';

const ROLES = {
  'Admin': 1001,
  'Editor': 1002,
  'Subscriber': 1003
}


function App() {


  useEffect(() => {
    // console.log('App.jsx');
  })

  return (
    <main className="App">
      <header className="App-header">

        <Routes>
          <Route path="/" element={ <Layout/> }>
            
            {/* public routes */}
            <Route path='login'              element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* protected routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor, ROLES.Subscriber]}/> } >
              <Route path='/'                   element={<Home />} />
              <Route path='engagment/:_gigID'  element={<Engagment />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
              <Route path='create'             element={<Create />} />
              <Route path='users'              element={<Users />} />
              <Route path='users/:_gigID'      element={<User />} />
            </Route>

            {/* catch all */}
            <Route path="*"                   element={<Page404 />} />
          </Route>

        </Routes>

      </header>
    </main>
  );
}

export default App;
