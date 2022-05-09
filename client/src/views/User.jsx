import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
import { useParams, useNavigate } from "react-router-dom";

import Navbar from '../Components/Navbar'
import { StyledPopUp } from '../styles/popup.styled'
import { UserSingle } from '../Components/UserSingle'

import axios from 'axios'
const { EXPRESS_API_IP, EXPRESS_API_PORT } = require('../config/config')
const api = axios.create({
  baseURL: `${EXPRESS_API_IP}:${EXPRESS_API_PORT}/api/v1`
  // baseURL: `http://localhost:4011/api/v1`
})

export const User = () => {

  const navigate = useNavigate()

  //? params of react-router-dom
  let { _gigID } = useParams()

  const [isAreYouSure, setisAreYouSure] = useState(false)

  const [isLoading, setIsLoading] = useState(true);
  const [gigState, setGigState] = useState({});

  const getGig = async () => {
    let response = await api.get(`/users/${_gigID}`).then(({ data }) => data)

    if (response === undefined || response.length === 0) {
      console.log('gig not in database')
      return setGigState([{ username: "no client", password: "no type" }])
    }

    setGigState(response.data.user)
    console.log(gigState)

    setIsLoading(false)
    console.log(isLoading);
  }

  const deleteGig = async (_id) => {

    // console.log(_id);

    try {
      api.delete(`/users/${_id}`).then(res => {
        console.log('Deleted!!!', res)
        // getForms()
        navigate('/users')
      })
    } catch (err) {
      console.log(err)
    }
  }

  const toggleAreYouSure = () => {
    setisAreYouSure(previsSure => !previsSure)
  }

  useEffect(() => {
    getGig()
    console.log('User.jsx useEffect');
  }, [])


  return (
    <>
      <Navbar />
      <div>
        <h1>User: {gigState.username}</h1>
        {/* <button className='editBtn' onClick={() => deleteForm(_gigID)}> <FaTrashAlt/> </button> */}
        <button className='editBtn' onClick={() => toggleAreYouSure()}> <FaTrashAlt /> </button>
        <h2>{_gigID}</h2>

        {isAreYouSure && (
          <StyledPopUp>
            <h3>Delete User</h3>
            <button className='editBtn' onClick={() => deleteGig(_gigID)}> yes I'm sure <FaSkullCrossbones /> </button>
            <button className='editBtn' onClick={() => toggleAreYouSure()}> no, take me back <FaEject /> </button>
          </StyledPopUp>
        )}

        {!isLoading && (
          <UserSingle {...gigState} />
        )}

      </div>
    </>
  )
}