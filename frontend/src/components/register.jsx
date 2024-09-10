import axios from 'axios';
import { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {showErrorToast} from '../helpers/alertHelper';

const URI = 'http://localhost:3000/api/'

function RegistrationForm() {
    const {isAuth} = useAuth();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        rol: '',
        empleado: ''
    });
    useEffect(()=>{
        if(!isAuth){
            navigate('/login')
        }
    })
    const [roles, setRoles] = useState([]);
    useEffect(()=>{
        const obtenerRoles = async () => {
            try {
                const respuesta = await axios.get(URI+'roles', {
                    withCredentials: true
                });
                setRoles(respuesta.data.data);
            } catch (error) {
                showErrorToast(error.response?.data?.message || 'error en server')
            }
        }
        obtenerRoles()
    }, []);

    const [empleados, setEmpleados] = useState([]);
    useEffect(()=>{
        const obtenerEmpleados = async () => {
            try {
                const respuesta = await axios.get(URI+'empleados/todos', {
                    withCredentials: true
                });
                setEmpleados(respuesta.data.data);
            } catch (error) {
                showErrorToast(error.response?.data?.message || 'error en server')
            }
        }
        obtenerEmpleados()
    }, [])


    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.post(URI+'usuarios', userData,{ withCredentials: true})
            if(respuesta.data.success==true){
                navigate('/empleados');
            }
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'error en server')
        }
    };

    return (
        <div className='form-container'>
            <div className='form-box'>

                <h2>Registro de usuarios</h2>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor='username' className='form-label'>Username</label>
                            <input type='text' className='form-control' name="username" value={userData.username} onChange={handleChange} placeholder='Ingrese nombre de usuario'/>
                        </div>
                        
                        <div className='col-md-6 mb-3'>
                            <label htmlFor='email' className='form-label'>Correo</label>
                            <input type='email' className='form-control' name="email" value={userData.email} onChange={handleChange} placeholder='ejemplo@correo.com'/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor='password' className='form-label'>Contraseña</label>
                            <input type='password' className='form-control' name="password" value={userData.password} onChange={handleChange} placeholder='Ingrese contraseña'/>
                        </div>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor='empleado' className='form-label'>Empleado</label>
                            <select className='form-control' name="empleado" value={userData.empleado} onChange={handleChange}>
                                <option value="">Seleccione un empleado</option>
                                {empleados.map(empleado=>(
                                    <option key={empleado.eid} value={empleado.eid}>{empleado.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6 mb-3'>
                            <label htmlFor='rol' className='form-label'>Perfil</label>
                            <select className='form-control' name="rol" value={userData.rol} onChange={handleChange}>
                                <option value="">Seleccione un rol</option>
                                {roles.map(rol=>(
                                    <option key={rol.rid} value={rol.rid}>{rol.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationForm