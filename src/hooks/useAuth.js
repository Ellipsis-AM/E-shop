import { useState, useEffect } from "react"                                                     ;
import {
    userLogin   ,
    userRegister,
    getCurrentUser
                             } from '../services/api'                                           ;

export function useAuth() {    
    const [token         , setToken]          = useState(localStorage.getItem('token') || '')   ;
    const [user          , setUser ]          = useState(null)                                  ;
    const [name          , setName]           = useState('')                                    ;
    const [phone         , setPhone]          = useState('')                                    ;
    const [address       , setAddress]        = useState('')                                    ;
    const [email         , setEmail]          = useState('')                                    ;
    const [password      , setPassword]       = useState('')                                    ;
    const [authLoading   , setAuthLoading]    = useState(true)                                  ;
 
    useEffect(() => {
        const restoreSession = async () => {
            const storedToken = localStorage.getItem('token')                                   ;

            if (!storedToken) {
                setAuthLoading(false)                                                           ;
                return                                                                          ;
            }

            try {
                const userData = await getCurrentUser(storedToken)                              ;
                setToken(storedToken)                                                           ;
                setUser(userData)                                                               ;
            }   catch (error)   {
                console.error('Failed to restore session:', error)                              ;
                localStorage.removeItem('token')                                                ;
                setToken('')                                                                    ;
                setUser(null)                                                                   ;
            }   finally   {
                setAuthLoading(false)                                                           ;
            }
        }                                                                                       ;

        restoreSession()                                                                        ;
    }, [])

    const handleLogin = async () => {
        try {     
            const data = await userLogin(email, password)                                       ;
            if (data.token) {
                localStorage.setItem('token', data.token)                                       ;
                setToken            (data.token)                                                ;
                setUser             (data.user)                                                 ;
                setPhone            (data.user.phone)                                           ;
                setAddress          (data.user.address)                                         ;
                setEmail            ('')                                                        ;
                setPassword         ('')                                                        ;
            }
        }   catch (error)   {
            console.error('Login error:', error)                                                ;
        }
    }                                                                                           ;

    const handleRegister = async () => {
        try {
            const userData ={
                name    ,
                phone   ,
                address ,
                email   ,
                password
            }
            const data = await userRegister(userData)                                           ;
            if (data.user) {
                alert               ('Registration successful! Please Login.')                  ;
                setName             ('')                                                        ;
                setPhone            ('')                                                        ;
                setAddress          ('')                                                        ;
                setEmail            ('')                                                        ;
                setPassword         ('')                                                        ;

                return true                                                                     ;
            }
        }   catch (error)   {
            console.error('Register error:', error)                                             ;

            return false                                                                        ;
        }
    }                                                                                           ;

    const handleLogout = () => {
        localStorage.removeItem ('token')                                                       ;
        setToken                (null)                                                          ;
        setUser                 (null)                                                          ;
    }                                                                                           ;

    return {
        user            ,
        token           ,
        name            ,
        phone           ,
        address         ,
        email           ,
        password        ,
        authLoading     ,
        setName         ,
        setPhone        ,
        setAddress      ,
        setEmail        ,
        setPassword     ,
        setAuthLoading  ,
        handleLogin     ,
        handleRegister  ,
        handleLogout
    }                                                                                           ;
}
