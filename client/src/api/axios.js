import axios from 'axios'
const { EXPRESS_API_IP, EXPRESS_API_PORT } = require('../config/config')

export const api = axios.create({
  baseURL: `${EXPRESS_API_IP}:${EXPRESS_API_PORT}/api/v1`
  // baseURL: `http://localhost:4011/api/v1`
})

export const apiPrivate = axios.create({
  baseURL: `${EXPRESS_API_IP}:${EXPRESS_API_PORT}/api/v1`,
  headers: { 'Content-Type': 'application/json'},
  withCredentials: true
  // baseURL: `http://localhost:4011/api/v1`
})

