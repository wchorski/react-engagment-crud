import { useEffect } from "react";
import { useRefreshToken } from "./useRefreshToken";
import useAuth from "./useAuth";
import { apiPrivate } from "../api/axios";
import axios from "axios";

export const UseApiPrivate = () => {
  const refresh = useRefreshToken()
  const { auth } = useAuth()

  useEffect(() => {


    const requestIntercept = apiPrivate.interceptors.request.use(
      config => {
        if(!config.headers['Authroization']){
          config.headers['Authroization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      }, (err) => Promise.reject(err)
    )

    const responseIntercept = apiPrivate.interceptors.response.use(

      response => response, async (err) => {

        const prevReq = err?.config

        if(err?.response.status === 403 && !prevReq?.sent){
          prevReq.sent = true
          const newAccessToken = await refresh()
          prevReq.headers['Authorization'] = `Bearer ${newAccessToken}`
          return apiPrivate(prevReq)
        }

        return Promise.reject(err)
      }
    )

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept)
      apiPrivate.interceptors.response.eject(responseIntercept)
    }

  }, [auth, refresh])

  return apiPrivate
}
