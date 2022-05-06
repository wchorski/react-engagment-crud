import styled from 'styled-components'


export const StyledNavBar = styled.nav`
  background-color: rgb(35, 35, 47);
  width: 100%;
  display: flex;
  align-items: center;

  .App-logo{
    padding: 1rem;
  }
  
  ul{
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;

    li{
      // background-color: rgb(78, 105, 123);
      padding: 1rem 1rem;
      height: 100%;

      a{
        color: white;
      }
    }
    li:hover{
      background-color: rgb(62, 78, 112);
      a{
        color: rgb(156, 165, 183);
      }
    }
  }
`