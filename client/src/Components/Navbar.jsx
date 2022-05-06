// import '../styles/navbar.scss'
import logo from '../logo.svg'
import React from "react"
import { StyledNavBar } from '../styles/Navbar.styled'

function Navbar() {
  return(
    <>
      <StyledNavBar>
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li><a href="/"       > Home </a></li>
          <li><a href="/create" > Create </a></li>
        </ul>
      </StyledNavBar>
    </>
  )
}

export default Navbar