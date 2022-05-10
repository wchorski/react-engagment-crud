import styled from 'styled-components'


export const StyledGigTable = styled.div`

  .formErr{
    background-color: #ff0000ad;
    padding: .2rem 1rem;
    border-bottom: solid 3px red;
  }

  .postTable{
    display: flex;
    justify-content: center;
  }
  table{
    background-color: rgb(90, 90, 90);
    padding: .5rem;
    text-align: left;
    width: 90%;
    border-collapse: collapse;
  }
  tr{
    border: solid black 3px;
    padding: 1rem;
  }
  th{
    border: solid black 1px;
    background-color: rgb(71, 213, 116);
    color: black;
    padding: 1rem .5rem;
  }
  td{
    border: solid rgba(0, 0, 0, 0.529) 1px;
    padding: .5rem;
  }
  .postTable table tbody tr:nth-child(even){
    background-color: rgba(255, 255, 255, 0.139);
  }
  tfoot{
    background-color: rgb(53, 160, 87);
    color: black;
  }
  .postTable tr:hover{
    background-color: rgba(223, 221, 182, 0.603);
  }
  .postTable table tbody tr:nth-child(even):hover{
    background-color: rgba(223, 221, 182, 0.603);
  }

  .card{
    background-color: #468f9e;
    border-radius: 1rem;
    text-align: left;
    padding: 1rem 1.8rem;
  
    margin: .3rem;
  }
`