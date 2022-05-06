// rafc snippit

import React, {useState, useEffect, useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { Link } from 'react-router-dom'

// import mock_data from './mock_data.json'
import { format } from 'date-fns'
import { StyledGigTable } from '../styles/GigTable.styled'

import axios from 'axios'
const api = axios.create({
  baseURL: `http://localhost:3001/api/v1`
})


export const GigTable = () => {

  //? DATA ###############################
  const [gigsArray, setGigssArray] = useState( [] )

  const getGigs = async () => {
    let response = await api.get('/engagements').then(({ data }) => data)
    // console.log(response.data.posts);
    if(response === undefined || response.length === 0){
      console.log('no data in database')

      return setGigssArray([ {client: "no client", type: "no type"} ])
    }
    // setPostsArray(prevPostsArray => [response.data.posts, ...prevPostsArray])
    setGigssArray(response.data.gigs)
    // console.log(gigsArray)
  }

  useEffect(() => {
    getGigs()
    console.log('GigTable.jsx useEffect');
  } , [''])


  //? TABLE #################################
  const gigColumns = [
    {
      Header: 'Date of Gig',
      Footer: 'Date of Gig',
      accessor: 'dateGig',
      Cell: ( {value} ) => {return format(new Date(value), 'MM/dd/yyyy')}
    },
    {
      Header: 'Client Info',
      Footer: 'Client Info',
      //? group multple columns with one name
      columns: [
        {
          Header: 'Client',
          Footer: 'Client',
          accessor: 'client'
        },
        {
          Header: 'Type',
          Footer: 'Type',
          accessor: 'type'
        },
        {
          Header: 'ID',
          Footer: 'ID',
          accessor: '_id'
        },
      ]
    },
    {
      Header: 'Employee',
      Footer: 'Employee',
      accessor: 'employee'
    },
  ]

  const newColumns = useMemo( () => gigColumns, [] ) //* useMemo stops render on every refresh. performant
  // const newData    = useMemo( () => gigsArray, [] ) //* idk skipping this for now

  const tableInstance = useTable({
    columns: newColumns,
    data: gigsArray //* this was using 'newData'
    
  }, useSortBy)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups} = tableInstance

  return (
    <>
      <StyledGigTable>
        <button onClick={getGigs}>refresh gigs 🔄</button>


        <div className="postTable">

          <table {...getTableProps()}>

            <thead>
              {headerGroups.map( (headGrp, i) => (
                <tr {...headGrp.getHeaderGroupProps()} key={i}>
                  {headGrp.headers.map( (column, i) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={i}> 
                      {column.render('Header')} 
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' ↥': ' ↧'): ''}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map( (row, i) => {
                prepareRow(row)
                return(
                  <tr {...row.getRowProps()} key={i}>
                    {row.cells.map( cell => {
                      
                      return (
                        <td {...cell.getCellProps()}> {cell.render('Cell')}</td>
                      )
                    })}
                    <td><Link to={`/engagment/${row.values._id}`}> account </Link> </td>
                    {/* <a href={`http://localhost:3001/api/v1/engagements/${row.values._id}`}>account</a>  */}
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
