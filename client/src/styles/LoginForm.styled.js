import styled from 'styled-components'

export const StyledLoginForm = styled.div`
  background-color: #3f7a6f;
  border-radius: .7rem;
  padding: 2rem;
  max-width: 35rem;
  margin: 0 auto;
  box-shadow: black 3px 4px 15px;
  
  form{
    text-align: center;
    display: flex;
    flex-direction: column;

    .formErr{
      background-color: #ff0000ad;
      padding: .2rem 1rem;
      border-bottom: solid 3px red;
    }

    .form-item{
      
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      svg{
        margin: 1rem 0 .3rem  0;
        font-size: 3rem
        // position: relative;
        // right: 0;
      }
  
      input{
        width: 60%;
        margin-bottom: 1rem;
        padding: .7rem;
        font-size: 20px;
        border-radius: 5px;
      }
    }

    .btns{
      margin-top: 2rem;

      button{
        background-color: #858585;
        border-radius: .3rem;
        padding: 1rem;
        margin-right: .2rem;
        cursor: pointer;

        &:hover{
          opacity: .6;
        }
      }
      .lgin{
        background-color: #30d2af;
        font-weight: bold;
        font-size: 1rem;
        color: white;
      }
    }
  }
`