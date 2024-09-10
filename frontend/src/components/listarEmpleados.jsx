import axios from 'axios';
import { useState, useEffect } from "react";
import NuevoEmpleadoModal from './nuevoEmpleado';
import EmpleadoModal from './empleadoModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {showErrorToast, showSuccessToast} from '../helpers/alertHelper';

//URL BASE
const URI = 'http://localhost:3000/api/'

function GetEmpleados() {
    //estado de autenticacion del authContext
    const {isAuth, user} = useAuth();
    const navigate = useNavigate();

    const [empData, setEmpData] = useState([]);//estados para manejar datos de empleados
    const [isAdmin, setAdmin] = useState(false);//estados para almacenar si usuario en linea es admin
    const [showNewEmpleadoModal, setNewEmpleadoModal] = useState(false); //estado para manejar modal de nuevo empleado
    const [showEmpleadoModal, setEmpleadoModal] = useState(false);//estado para abrir modal de informacion de un empleado
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);//estado para guardar  informacion de un empleado

    //estados para manejar paginacion
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalEmpleados, setTotalEmpleados] = useState(1);
    
    //redirige a login si no esta autenticado
    useEffect(()=>{
        if (!isAuth){
            navigate('/login')
        }else{
            if(user?.rol==1){
                setAdmin(true);
            }
            obtenerEmpleados();
        }
    }, [isAuth]); //array dependencias para observar cambios


    //metodos o funciones
    const obtenerEmpleados = async (page=1, size= 10) => {
        try {
            const respuesta = await axios.get(URI+'empleados', {
                params: {page, pageSize: size},
                withCredentials: true
            })
            setEmpData(respuesta.data.data);
            setTotalPages(respuesta.data.totalPages);
            setTotalEmpleados(respuesta.data.totalEmpleados);
            setCurrentPage(page);
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'error en server')
        }
    };
    const handleOpenNewEmpleadoModal = () =>{
        setNewEmpleadoModal(true);
    }
    const handlePageChange = (page) => {
        setCurrentPage(page);
        obtenerEmpleados(page, pageSize);
    }
    const handlePageSizeChange = (e) => {
        const size = parseInt(e.target.value, 10);
        setPageSize(size);
        obtenerEmpleados(1, size);
    }
    const handleConsultar= async (eid) =>{
        try {
            const respuesta = await axios.get(URI+`empleados/${eid}`, {withCredentials: true});
            if(respuesta.status==200){
                setEmpleadoSeleccionado(respuesta.data.empleado)
                setEmpleadoModal(true);
            }
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'Error en el servidor')
        }
    }
    return (
        <div className='container mt-4'>
            <h2 className='mb-4'>Empleados</h2>
            {isAdmin && (<button className='btn btn-primary mb-3' onClick={handleOpenNewEmpleadoModal}><i className='fa fa-plus'></i>Agregar Empleado</button>)}
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Salario</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empData && empData.length> 0?(
                            empData.map(empleado=>(
                            <tr key={empleado.eid}>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.salario}</td>
                                <td><button className='btn btn-primary me-2' onClick={()=>handleConsultar(empleado.eid)}><i className='fa fa-eye'></i></button></td>
                            </tr>
                        ))):(
                            <tr><td>No se encontraron datos</td></tr>
                        )}
                    </tbody>
                </table>
                <div className='pagination-controls'>
                    <button className='btn btn-secondary' onClick={()=>handlePageChange(currentPage - 1)} disabled={currentPage===1}>Anterior</button>
                    <span className='mx-2'>
                        Página {currentPage} de {totalPages}
                    </span>
                    <button className='btn btn-secondary' onClick={()=> handlePageChange(currentPage + 1)} disabled={currentPage===totalPages}>Siguiente</button>
                    <select onChange={handlePageSizeChange} value={pageSize}>
                        <option value={10}>10 por página</option>
                        <option value={25}>25 por página</option>
                        <option value={50}>50 por página</option>
                    </select>
                </div>
                {isAdmin && <NuevoEmpleadoModal showModal={showNewEmpleadoModal} setModal={setNewEmpleadoModal} obtenerEmpleados={obtenerEmpleados} />}
                {empleadoSeleccionado && <EmpleadoModal showModal={showEmpleadoModal} setModal={setEmpleadoModal} empleado={empleadoSeleccionado} />}
        </div>
    )
}

export default GetEmpleados