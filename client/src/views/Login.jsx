import React from 'react';
import { useFormik, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaUserAlt } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'

import Navbar from '../Components/Navbar'

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
        padding: 1rem;
        border-radius: 5px;
      }

      .formErr{
        background-color: #ff0000ad;
        padding: .2rem 1rem;
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

export const Login = () => {

  const SignupSchema = Yup.object().shape({

    username: Yup.string().required('*Username required!').min(6, '*Your Username too short!').max(28, '*Your Username too long!'),
    password: Yup.string().required('*password required!').min(6, '*Your password too short!').max(28, '*Your password too long!'),

  })

  // const formik = useFormik({
  //   initialValues: { username: "", password: "" },
  //   validationSchema: Yup.object({
  //     username: Yup.string().required('Username required!').min(6, 'Your Username too short!').max(28, 'Your Username too long!'),
  //     password: Yup.string().required('password required!').min(6, 'Your password too short!').max(28, 'Your password too long!'),
  //   }),
  //   onSubmit: (values, actions) => {
  //     alert(JSON.stringify(values, null, 2))
  //     actions.resetForm()
  //   }
  // })

  let formJSON = {
    username: "myUsername",
    password: "myPassword",
  }

  const isInvalid = () => {
    alert('invalid')
  }
  return (
    <>
      <Navbar />
      <div>
        <h1>Login</h1>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={(values, actions) => {
            alert(JSON.stringify(values, null, 2))
            actions.resetForm()
          }}
        >
          {({ errors, touched }) => (
            <StyledLoginForm>

              <Form>
                <div className='form-item'>
                  <FaUserAlt />
                  <Field name="username" type="text" placeholder="username..." />
                  {errors.username && touched.username ? (
                    <div className='formErr'>{errors.username}</div>
                  ) : null}
                </div>

                <div className='form-item'>
                  <MdPassword />
                  <Field name="password" type="password" placeholder="password..." />
                  {errors.password && touched.password ? (
                    <div className='formErr'>{errors.password}</div>
                  ) : null}
                </div>

                <div className='btns'>
                  <button className='lgin' type='submit'>Login</button>
                  <button>Create Account</button>
                </div>
              </Form>
            </StyledLoginForm>

          )}
        </Formik>

        {/* <StyledLoginForm>
          <form onSubmit={formik.handleSubmit} >
            <div className='form-item'>
              <FaUserAlt />
              <input
                onInvalid={isInvalid}
                name="username"
                type="text"
                placeholder="username..."
                required
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              // onChange={(event) => {
              //   formJSON.username = event.target.value
              // }}
              />
            </div>

            <div className='form-item'>
              <MdPassword />
              <input
                onInvalid={isInvalid}
                name="password"
                type="password"
                placeholder="password..."
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              // onChange={(event) => {
              //   formJSON.password = event.target.value
              // }}
              />
            </div>
            <div className='btns'>
              <button className='lgin' type='submit'>Login</button>
              <button>Create Account</button>
            </div>
          </form>
        </StyledLoginForm> */}

      </div>
    </>
  )
}