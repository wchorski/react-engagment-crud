import React, {useState} from 'react'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

import { StyledGigForm } from '../styles/GigForm.styled'

import axios from 'axios'
const api = axios.create({
  baseURL: `http://localhost:3001/api/v1`
})

export const GigForm = () => {

  const navigate = useNavigate()

  const [gigForm, setGigForm] = useState([])
  // TODO success or Failure message

  const postForm = async (event, jsonFrom) => {
    try{
      navigate('/')
      // event.preventDefault()
      let dJSON = formJSON
      let res = await api.post('/engagements', { ...dJSON})
      // console.log(res)
      // getForms()
      // postFrontendData(dJSON)
    } catch (err){
      console.log(err);
    }
  }

  const postFrontendData = (event) => {
    event.preventDefault()
    document.getElementById("TheForm").reset();

    setGigForm([formJSON, ...gigForm])
    console.log(gigForm);

    //? Save to DB
    postForm()
  }

  //? temp holder for below 'frontendData' form
  let formJSON = {
    dateGig: "2022-01-01T16:55:12.725Z",
    address: "123 wallyworld ave Candlyland, AA 60622",
    type: "party",
    client: "client 1",
    email:"client@email.com",
    phone: "(000) 000-0000",
    employee: "choose employee...",
    options: [],
  }

  return (
    <>
      <h2>GigForm</h2>

      <StyledGigForm>
        <form onSubmit={postFrontendData} id="TheForm" className="dataForm">    
        <label>Engagment Details</label>
          <input 
              type="date"
              placeholder="date of engagment..."
              required
              onChange={(event) => {
                formJSON.dateGig = event.target.value
              }}
          />    
          <input 
            type="address"
            placeholder="address..."
            // required
            onChange={(event) => {
              formJSON.address = event.target.value
            }}
          />
          <input 
            type="text"
            placeholder="birthday, wedding, graduation, ect..."
            // required
            onChange={(event) => {
              formJSON.type = event.target.value
            }}
          />
          <label>Client Info</label>
          <input 
            type="text"
            placeholder="client name..."
            required
            onChange={(event) => {
              formJSON.client = event.target.value
            }}
          />
          <input 
            type="email"
            placeholder="client email..."
            required
            onChange={(event) => {
              formJSON.email = event.target.value
            }}
          />
          <input 
            type="phone"
            placeholder="client phone..."
            required
            onChange={(event) => {
              formJSON.phone = event.target.value
            }}
          />
          <input 
            type="text"
            placeholder="employee for gig..."
            required
            onChange={(event) => {
              formJSON.employee = event.target.value
            }}
          />
          <input 
            type="text"
            placeholder="gig options..."
            required
            onChange={(event) => {
              formJSON.options = event.target.value
            }}
          />
          

          <button type='submit'> <FaPlus/> Create Gig </button>
        </form>
      </StyledGigForm>
    </>
    
  )
}
