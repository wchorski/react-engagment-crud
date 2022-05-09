// rafc snippit
import React, { useState, useEffect, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { Link } from 'react-router-dom'
import { FaSortAmountUp,  FaSortAmountDownAlt} from 'react-icons/fa'
import { GrRefresh } from 'react-icons/gr'

// import mock_data from './mock_data.json'
import { format } from 'date-fns'
import { StyledGigTable } from '../styles/GigTable.styled'

import axios from 'axios'
const { EXPRESS_API_IP, EXPRESS_API_PORT } = require('../config/config')
const api = axios.create({
  baseURL: `${EXPRESS_API_IP}:${EXPRESS_API_PORT}/api/v1`
  // baseURL: `http://localhost:4011/api/v1`
})


export const UserTable = () => {

  //? DATA ###############################
  const [gigsArray, setGigssArray] = useState([])

  const getGigs = async () => {
    try{
      let response = await api.get('/users').then(({ data }) => data)
      // console.log(response.data.posts);
      if (response === undefined || response.length === 0) {
        console.log('no data in database')
  
        return setGigssArray([{ client: "no client", type: "no type" }])
      }
      // setPostsArray(prevPostsArray => [response.data.posts, ...prevPostsArray])
      setGigssArray(response.data.users)
      // console.log(gigsArray)

    } catch (err){
      console.log('cannot get users from db');
    }
  }

  useEffect(() => {
    getGigs()
    console.log('UserTable.jsx useEffect');
  }, [''])


  //? TABLE #################################
  const gigColumns = [
    {
      Header: 'Username',
      Footer: 'Username',
      accessor: 'username',
    },
    {
      Header: 'Password',
      Footer: 'Password',
      accessor: 'password'
    },
    {
      Header: 'ID',
      Footer: 'ID',
      accessor: '_id'
    },
  ]

  const newColumns = useMemo(() => gigColumns, []) //* useMemo stops render on every refresh. performant
  // const newData    = useMemo( () => gigsArray, [] ) //* idk skipping this for now

  const tableInstance = useTable({
    columns: newColumns,
    data: gigsArray //* this was using 'newData'

  }, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = tableInstance

  return (
    <>
      <h2>UserTable.jsx</h2>
      <StyledGigTable>
        <button onClick={getGigs}>refresh users <GrRefresh /></button>


        <div className="postTable">

          <table {...getTableProps()}>

            <thead>
              {headerGroups.map((headGrp, i) => (
                <tr {...headGrp.getHeaderGroupProps()} key={i}>
                  {headGrp.headers.map((column, i) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={i}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' ↥' : ' ↧') : ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map(cell => {

                      return (
                        <td {...cell.getCellProps()}> {cell.render('Cell')}</td>
                      )
                    })}
                    <td><Link to={`/users/${row.values._id}`}> account </Link> </td>
                    {/* <a href={`/api/v1/engagements/${row.values._id}`}>account</a>  */}
                  </tr>
                )
              })}
            </tbody>

            <tfoot>
              {footerGroups.map(footerGrp => (
                <tr {...footerGrp.getFooterGroupProps()}>
                  {footerGrp.headers.map((column, i) => (
                    <td {...column.getFooterProps} key={i}>
                      {column.render('Footer')}
                    </td>
                  ))}
                </tr>
              ))}
            </tfoot>

          </table>

        </div>
      </StyledGigTable>
    </>
  )
}
