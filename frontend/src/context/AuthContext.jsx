import { createContext, useState, useContext } from "react";
import axios from 'axios';
import {showErrorToast, showValidationErrors} from '../helpers/alertHelper';

export const AuthContext = createContext()

export const useAuth = () => {
   const contexto =  useContext(AuthContext);
   if(!contexto){
    throw new Error('useAuth debe estar dentro del authproovider')
   }
   return contexto
}
export const AuthProvider =({children}) => {
    
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(null)
    const login = async (userData) => {
        try {
            const respuesta = await axios.post('http://localhost:3000/api/login', userData, {
                withCredentials: true, 
                headers: {
                "content-Type": 'application/json',
                "Accept": 'application/json'
            }})
            if(respuesta.data.success==true){
                setUser(respuesta.data.usuario)
                setIsAuth(true);
                return respuesta.data
            }
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'Error en el servidor')
        }
    }

    const logout = async () => {
        try {
            await axios.post('http://localhost:3000/api/logout', {}, {
                withCredentials: true
            })
            setUser(null);
            setIsAuth(false);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthContext.Provider value={{login,user,isAuth, logout}}>
            {children},
        </AuthContext.Provider>
    )
}