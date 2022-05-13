import React, { useState, useRef } from 'react';
// import AuthContext from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useFormik, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaUserAlt } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'

import { api } from '../api/axios';
import { useRefreshToken } from '../hooks/useRefreshToken';

import Navbar from '../Components/Navbar'
import {GigTable} from '../Components/GigTable'

import {StyledLoginForm} from '../styles/LoginForm.styled'



export const Login = () => {

  const { setAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const refresh = useRefreshToken()

  const userRef = useRef()
  const errRef = useRef()


  const [isUsernameTaken, setIsUsernameTaken] = useState(false)
  const [isLoginFail, setissLoginFail] = useState(false)

  const addUser = async (creds) => {
    try{
      let res = await api.post('/users/signup', { ...creds})
      setIsUsernameTaken(false)
      // return navigate('/users')
      return console.log(res);
      
    } catch (err){
      if(!err?.response){
        console.log('No server response');
      } else if (err.response?.status === 409){
        console.log('Username Taken');
        setIsUsernameTaken(true)
      } else{
        console.log('signup completely failed for no reason. Might want to step away for a bit and come back later');
      }

    }
  }

  const loginUser = async (creds) => {
    try{
      // let res = await api.post('/users/login', { ...creds})
      let res = await api.post('/users/login', JSON.stringify( { ...creds}), {
        headers: { 'Content-Type': 'application/json'},
        withCredentials: true
      })
      console.log(JSON.stringify(res?.data))
      const accessToken = res?.data?.accessToken
      setAuth({...creds, accessToken})

      setissLoginFail(false)
      return navigate(from, { replace: true })

    } catch (err){
      setissLoginFail(true)
      console.log(err);
    }
  }

  

  const SignupSchema = Yup.object().shape({

    username: Yup.string()
      .required('*Username required!')
      .min(6, '*Your Username too short!')
      .max(28, '*Your Username too long!'),
      // TODO How to show user that 'username' is already taken
      // TODO make a api request where single use can be accessed like a bool
      // .test('Unique Username', '*Username already taken. Use different username', 
      // function(value){
      //   return new Promise((resolve, reject) => {
      //     if(!isUsernameTaken){
      //       resolve(true)
      //     } else {
      //       resolve(false)
      //     }
      //   })
      // }),
    password: Yup.string().required('*password required!').min(6, '*Your password too short!').max(28, '*Your password too long!'),
    roles: Yup.string().min(6, '*Your roles name is too short!').max(28, '*Your roles name is too long!'),

  })


  return (
    <>
      <Navbar />
      <div>


        <h1>Login.jsx</h1>
        <button onClick={() => refresh()}>Refresh Login</button>
        <Formik

          initialValues={{ username: "", password: "" }}
          validationSchema={SignupSchema}
          validateOnChange={false} // disable on every keystroke
          onSubmit={(values, actions) => {
            // alert(JSON.stringify(values, null, 2))
            loginUser(values)
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
                    <span className='formErr'>{errors.username}</span>
                  ) : null}
                </div>

                <div className='form-item'>
                  <MdPassword />
                  <Field name="password" type="password" placeholder="password..." />
                  {errors.password && touched.password ? (
                    <span className='formErr'>{errors.password}</span>
                  ) : null}
                </div>

                {isLoginFail && (
                  <span className='formErr'>Login Failed. Check your credentials and try again</span>
                )}

                <div className='btns'>
                  <button className='lgin' type='submit'>Login</button>
                  <button>Create Account</button>
                </div>
              </Form>
            </StyledLoginForm>

          )}
        </Formik>



        <h1>Signup</h1>
        <Formik
          initialValues={{ username: "", password: "", roles: "" }}
          validationSchema={SignupSchema}
          validateOnChange={false} // disable on every keystroke
          onSubmit={(values, actions) => {
            addUser(values)
            // alert(JSON.stringify(values, null, 2))
            actions.resetForm()
          }}
        >
          {({ errors, touched }) => (
            <StyledLoginForm>

              <Form>
                <div className='form-item'>
                  <Field name="username" type="text" placeholder="username..." />
                  {errors.username && touched.username ? (
                    <span className='formErr'>{errors.username}</span>
                  ) : null}
                </div>
                {isUsernameTaken && (
                  <span className='formErr'>Username already taken. Choose a different username</span>
                )}

                <div className='form-item'>
                  <Field name="password" type="password" placeholder="password..." />
                  {errors.password && touched.password ? (
                    <span className='formErr'>{errors.password}</span>
                  ) : null}
                </div>

                <div className='form-item'>
                  <Field name="roles" type="roles" placeholder="roles..." />
                  {errors.roles && touched.roles ? (
                    <span className='formErr'>{errors.roles}</span>
                  ) : null}
                </div>

                <div className='btns'>
                  <button className='lgin' type='submit'>Create Account</button>
                </div>
              </Form>
            </StyledLoginForm>

          )}
        </Formik>

      </div>

      {/* <GigTable /> */}
    </>
  )
}