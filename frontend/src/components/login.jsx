import axios from 'axios';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {showErrorToast, showSuccessToast} from '../helpers/alertHelper';

const URI = 'http://localhost:3000/api/'

function LoginForm() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };
    const {login} = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await login(userData);
            if(respuesta.success==true){
                navigate('/')
            }
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'error en server')
        }
    };

    return (
        <div className='form-container'>
            <div className='form-box'>

                <h2>Inicio de sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='email' className='form-label'>Correo</label>
                        <input type='email' className='form-control' name="email" value={userData.email} onChange={handleChange} placeholder='ejemplo@correo.com'/>
                    </div>
                    <div>
                        <label htmlFor='password' className='form-label'>Contraseña</label>
                        <input type='password' className='form-control' name="password" value={userData.password} onChange={handleChange} placeholder='Ingrese su contraseña'/>
                    </div>
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm