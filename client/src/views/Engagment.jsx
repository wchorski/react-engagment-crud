import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
import { useParams, useNavigate } from "react-router-dom";

import Navbar from '../Components/Navbar'
import { StyledPopUp } from '../styles/popup.styled'
import { GigSingle } from '../Components/GigSingle'

import { useRefreshToken } from "../hooks/useRefreshToken";

import axios from 'axios'
const { EXPRESS_API_IP, EXPRESS_API_PORT } = require('../config/config')

const api = axios.create({
  baseURL: `${EXPRESS_API_IP}:${EXPRESS_API_PORT}/api/v1`
  // baseURL: `http://localhost:4011/api/v1`
})

const Engagment = () => {

  const navigate = useNavigate()

  //? params of react-router-dom
  let { _gigID } = useParams()

  const [isAreYouSure, setisAreYouSure] = useState(false)

  const [isLoading, setIsLoading] = useState(true);
  const [gigState, setGigState] = useState({});


  const refresh = useRefreshToken( )
  useEffect(() => {
    console.log('Engagment.jsx useEffect');
    let isMounted = true;
    const controller = new AbortController()

    getGig(isMounted, controller)

    // return () => {
    //   isMounted = false
    //   controller.abort()
    // }
  
  }, [])

  const getGig = async (isMntd, contlr) => {
    try{
      // let response = await api.get(`/engagements/${_gigID}`).then(({ data }) => data)
      const response = await api.get(`/engagements/${_gigID}`, {
        signal: contlr.signal
      })
      console.log(response.data.data)
      isMntd && setGigState(response.data.data.gig)

      // if (response === undefined || response.length === 0) {
      //   console.log('gig not in database')
      //   return setGigState([{ client: "no client", type: "no type" }])
      // }

      // setGigState(response.data.gig)
      // console.log(gigState)

      setIsLoading(false)
      // console.log(isLoading);

    } catch (err){
      console.log(err);
      return setGigState([{ client: "no client", type: "no type" }])
    }
  
  }

  const deleteGig = async (_id) => {

    // console.log(_id);

    try {
      api.delete(`/engagements/${_id}`).then(res => {
        console.log('Deleted!!!', res)
        // getForms()
        navigate('/')
      })
    } catch (err) {
      console.log(err)
    }
  }

  const toggleAreYouSure = () => {
    setisAreYouSure(previsSure => !previsSure)
  }


  return (
    <>
      <Navbar />
      <button onClick={() => refresh()}>Refresh token</button>
      <div>
        <h1>Engagment {gigState.client}</h1>
        {/* <button className='editBtn' onClick={() => deleteForm(_gigID)}> <FaTrashAlt/> </button> */}
        <button className='editBtn' onClick={() => toggleAreYouSure()}> <FaTrashAlt /> </button>
        <h2>{_gigID}</h2>

        {isAreYouSure && (
          <StyledPopUp>
            <h3>Delete Gig</h3>
            <button className='editBtn' onClick={() => deleteGig(_gigID)}> yes I'm sure <FaSkullCrossbones /> </button>
            <button className='editBtn' onClick={() => toggleAreYouSure()}> no, take me back <FaEject /> </button>
          </StyledPopUp>
        )}

        {!isLoading && (
          <GigSingle {...gigState} />
        )}

      </div>
    </>
  )
}

export default Engagment;