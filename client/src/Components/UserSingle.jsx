// rafc snippit
import React, { useState } from 'react'

// import mock_data from './mock_data.json'
import { format } from 'date-fns'
import { StyledGigTable } from '../styles/GigTable.styled'

// import axios from 'axios'
// const api = axios.create({
//   baseURL: `/api/v1`
// })

export const UserSingle = (props) => {

  //? DATA ###############################
  const [ gig, setGig] = useState( {} )


  const formatDate = (inputDate) => {
    try{
      console.log('formatDate');
      console.log(inputDate);
      return format(new Date( inputDate ), 'MM/dd/yyyy')
    } catch (err) {
      console.log(err)
    }
  }

  const {_id, date, color, name, message, getForms, clsNms='card'} = props

  return (
    <>
      <StyledGigTable>
        <h1>UserSingle.jsx</h1>

        <div className="card clientInfo">
          <h3>Client Info</h3>
          <table>
            <tbody>
              <tr>
                <th>Username:</th>
                <td>{props.username}</td>
              </tr>
              <tr>
                <th>Password:</th>
                <td>{props.password}</td>
              </tr>
              <tr>
                <th>ID:</th>
                <td>{props._id}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </StyledGigTable>
    </>
  )
}
