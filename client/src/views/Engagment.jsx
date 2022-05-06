import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaSkullCrossbones, FaEject } from 'react-icons/fa'
import { useParams, useNavigate } from "react-router-dom";

import Navbar       from '../Components/Navbar'
import {StyledPopUp} from '../styles/popup.styled'
import { GigSingle } from '../Components/GigSingle'

import axios from 'axios'
const api = axios.create({
  baseURL: `http://localhost:3001/api/v1`
})
  
const Engagment = (  ) => {

  const navigate = useNavigate()

  //? params of react-router-dom
  let { _gigID } = useParams()

  const [isAreYouSure, setisAreYouSure] = useState(false)

  const [isLoading, setIsLoading] = useState(true);
  const [gigState, setGigState] = useState( {} );

  const getGig = async () => {
    let response = await api.get(`/engagements/${_gigID}`).then(({ data }) => data)
    
    if(response === undefined || response.length === 0){
      console.log('gig not in database')
      return setGigState([ {client: "no client", type: "no type"} ])
    }
    
    setGigState(response.data.gig)
    console.log(gigState)

    setIsLoading(false)
    console.log(isLoading);
  }

  const deleteGig = async (_id) => {

    // console.log(_id);

    try{
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

  useEffect(() => {
    getGig()
    console.log('Engagment.jsx useEffect');
  } , [])


  return (
    <>
      <Navbar/>
      <div>
        <h1>Engagment {gigState.client}</h1>
        {/* <button className='editBtn' onClick={() => deleteForm(_gigID)}> <FaTrashAlt/> </button> */}
        <button className='editBtn' onClick={() => toggleAreYouSure()}> <FaTrashAlt/> </button>
        <h2>{_gigID}</h2>

      {isAreYouSure && (
        <StyledPopUp>
          <h3>Delete Gig</h3>
          <button className='editBtn' onClick={() => deleteGig(_gigID)}> yes I'm sure <FaSkullCrossbones/> </button>
          <button className='editBtn' onClick={() => toggleAreYouSure()}> no, take me back <FaEject/> </button>
        </StyledPopUp>
      )}

      {!isLoading && (
        <GigSingle {...gigState}/>
      )}

      </div>
    </>
  )
}
  
export default Engagment;