// rafc snippit
import React, { useState } from 'react'

// import mock_data from './mock_data.json'
import { format } from 'date-fns'
import { StyledGigTable } from '../styles/GigTable.styled'

// import axios from 'axios'
// const api = axios.create({
//   baseURL: `http://localhost:3001/api/v1`
// })

export const GigSingle = (props) => {

  //? DATA ###############################
  const [ gig, setGig] = useState( {} )

  // const props = () => {
  //   dateGig,
  //   address,
  //   type,
  //   client,
  //   email,
  //   phone,
  //   employee,
  //   options
  // }

  // const getGig = async () => {
  //   let response = await api.get('/engagements/6274321445ed74ac8054a7c1').then(({ data }) => data)
  //   if(response === undefined || response.length === 0){
  //     console.log('no data in database')

  //     return setGig([ {client: "no client", type: "no type"} ])
  //   }
  //   setGig(response.data.gig)
  // }

  // useEffect(() => {
  //   getGig()
  //   console.log('GigSingle.jsx useEffect');
  // } , [''])

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
        <h1>GigSingle</h1>

        <div className="card clientInfo">
          <h3>Client Info</h3>
          <table>
            <tbody>
              <tr>
                <th>Client:</th>
                <td>{props.client}</td>
              </tr>
              <tr>
                <th>email:</th>
                <td>{props.email}</td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>{props.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>


        <div className="card gigInfo">

          <h3>Gig Info</h3>
          <table>
            <tbody>
              <tr>
                <th>Date of Event:</th>
                <td>{formatDate(props.dateGig)}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>{props.address}</td>
              </tr>
              <tr>
                <th>Type:</th>
                <td>{props.type}</td>
              </tr>
              <tr>
                <th>Employee:</th>
                <td>{props.employee}</td>
              </tr>
              <tr>
                <th>options:</th>
                <td>{props.options}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </StyledGigTable>
    </>
  )
}
