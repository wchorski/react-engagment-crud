// import '../styles/navbar.scss'
import logo from '../logo.svg'
import React from "react"
import { StyledNavBar } from '../styles/Navbar.styled'
import { StyledNavSub } from '../styles/NavSub.styled'
import { RiUser5Line, RiLogoutBoxRLine } from 'react-icons/ri';

function Navbar() {
  return (
    <>
      <StyledNavBar>
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <ul>
          <li><a href="/"       > Home </a></li>
          <li><a href="/create" > Create </a></li>
          <li><a href="/login" > Login </a></li>
          <li><a href="/users" > Users </a></li>
        </ul>
      </StyledNavBar>


      <StyledNavSub>
        <ul>
          <li className='userCred'><RiUser5Line /> <span>--username--</span> <button><RiLogoutBoxRLine />logout</button></li>
        </ul>
      </StyledNavSub>
    </>
  )
}

export default Navbar