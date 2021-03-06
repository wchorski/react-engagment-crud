import styled from 'styled-components'


export const StyledGigForm = styled.div`

  .dataForm{
    background-color: #666d7c;
    padding: 1.5rem;
    border-radius: .3rem;
    display: flex;
    flex-direction: column;
    flex-grow: 30;
    justify-content: center;
    align-items: center;
    width: 60%;
  }
  .dataForm input{
    width: 100%;
    padding: .5rem .7rem;
    margin-bottom: .5rem;
  }

  .dataForm textarea{
    width: 100%;
    min-height: 6rem;
    padding: .5rem .7rem;
    margin-bottom: .5rem;
  }
  .dataForm input[type="color" i]{
    padding: 0;
    width: 80%;
    align-items: center;
  }
`