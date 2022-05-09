import styled from 'styled-components'


export const StyledNavBar = styled.nav`
  background-color: rgb(35, 35, 47);
  width: 100%;
  display: flex;
  align-items: center;

  a:hover{
    opacity: .2;
  }

  .App-logo{
    padding: 1rem;

    &:hover{
      opacity: .2;
    }
  }
  
  ul{
    list-style-type: none;
    display: flex;
    margin: 0;
    padding: 0;

    li{
      // height: 100%;
      display: flex;
      justify-content: center;
      align-items:center;

      a{
        font-size: 2rem;
        text-align: center;
        padding: 3rem 2rem;
        display: inline-block;
        // height: 200px;

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