import React from "react"

import Navbar from '../Components/Navbar'

import { UserTable } from '../Components/UserTable';
// import { GigSingle } from '../Components/GigSingle';

export const Users = () => {
  return (
    <>
      <Navbar />
      <h1>Users.jsx</h1>
      <UserTable />
    </>
  )
}