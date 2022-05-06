import React from "react"

import Navbar       from '../Components/Navbar'

import { GigTable } from '../Components/GigTable';
// import { GigSingle } from '../Components/GigSingle';

function Home() {
  return(
    <>
      <Navbar/>
      <h1>Home.jsx</h1>
        <GigTable />
    </>
  )
}

export default Home