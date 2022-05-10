import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { FaUserAlt } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'

import Navbar from '../Components/Navbar'

import {StyledLoginForm} from '../styles/LoginForm.styled'

import axios from 'axios'
const { EXPRESS_API_IP, EXPRESS_API_PORT } = require('../config/config')
const api = axios.create({
  baseURL: `${EXPRESS_API_IP}:${EXPRESS_API_PORT}/api/v1`
  // baseURL: `http://192.168.0.100:4011/api/v1`
})


export const Login = () => {

  const navigate = useNavigate()

  const [isUsernameTaken, setIsUsernameTaken] = useState(false)
  const [isLoginFail, setissLoginFail] = useState(false)

  const addUser = async (creds) => {
    try{
      let res = await api.post('/users/signup', { ...creds})
      setIsUsernameTaken(false)
      return navigate('/')
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
      let res = await api.post('/users/login', { ...creds})
      return navigate('/')
      setissLoginFail(false)
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

  })


  return (
    <>
      <Navbar />
      <div>


        <h1>Login</h1>
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
          initialValues={{ username: "", password: "" }}
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

                <div className='btns'>
                  <button className='lgin' type='submit'>Create Account</button>
                </div>
              </Form>
            </StyledLoginForm>

          )}
        </Formik>

      </div>
    </>
  )
}