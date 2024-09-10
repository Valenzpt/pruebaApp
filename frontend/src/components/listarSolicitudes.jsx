import axios from 'axios';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import SolicitudModal from './solicitudModal';
import NuevaSolicitudModal from './nuevaSolicitudModal';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {showErrorToast, showSuccessToast} from '../helpers/alertHelper';

const URI = 'http://localhost:3000/api/'

function GetSolicitudes() {
    const {isAuth, user} = useAuth();
    const navigate = useNavigate();
    const [solicitudesData, setSolicitudesData] = useState([]);
    const [isAdmin, setAdmin] = useState(false);
    const [showNewSolicituModal, setNewSolicitudModal] = useState(false);
    const [showSolicitudModal, setSolicitudModal] = useState(false);
    const [solicitudSeleccionado, setSolicitudSeleccionado] = useState(null);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [totalSolicitudes, setTotalSolicitudes] = useState(1);

    useEffect(()=>{
        if (!isAuth){
            navigate('/login')
        }else{
            if(user?.rol==1){
                setAdmin(true);
            }
            obtenerSolicitudes();
        }
    }, [isAuth])
    const obtenerSolicitudes= async (page=1, size= 10) => {
        try {
            const respuesta = await axios.get(URI+'solicitudes', {
                params: {page, pageSize: size},
                withCredentials: true
            })
            setSolicitudesData(respuesta.data.data);
            setTotalPages(respuesta.data.totalPages);
            setTotalSolicitudes(respuesta.data.totalSolicitudes);
            setCurrentPage(page);
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'error en server')
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        obtenerSolicitudes(page, pageSize);
    }
    const handlePageSizeChange = (e) => {
        const size = parseInt(e.target.value, 10);
        setPageSize(size);
        obtenerSolicitudes(1, size);
    }
    const handleOpenNewSolicitudModal = () =>{
        setNewSolicitudModal(true);
    }
    const handleConsultar= async (sid) =>{
        try {
            const respuesta = await axios.get(URI+`solicitudes/${sid}`, {withCredentials: true});
            if(respuesta.status==200){
                setSolicitudSeleccionado(respuesta.data.solicitud)
                setSolicitudModal(true);
            }
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'error en server')
        }
    }
    const handleEliminar = async (sid) => {
        try {
            Swal.fire({
                title: "Seguro que desea eliminar?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Eliminar"
              }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        await axios.delete(URI+`solicitudes/${sid}`, {withCredentials: true});
                        obtenerSolicitudes();
                        showSuccessToast('Solicitud Eliminada')
                    } catch (error) {
                        showErrorToast('Error al eliminar')
                    }
                }
              });
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='container mt-4'>
            <h2 className='mb-4'>Solicitudes</h2>
            {isAdmin && (<button className='btn btn-primary mb-3' onClick={handleOpenNewSolicitudModal}><i className='fa fa-plus'></i>Agregar Solicitud</button>)}
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Descripcion</th>
                            <th>Resumen</th>
                            <th>Empleado</th>
                            {isAdmin && (<th>Acciones</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudesData.map(solicitud=>(
                            <tr key={solicitud.sid}>
                                <td>{solicitud.codigo}</td>
                                <td>{solicitud.descripcion}</td>
                                <td>{solicitud.resumen}</td>
                                <td>{solicitud.Empleado.nombre}</td>
                                {isAdmin && (
                                    <td><button className='btn btn-primary me-2' onClick={()=>handleConsultar(solicitud.sid)}><i className='fa fa-eye'></i></button>
                                    <button className='btn btn-primary me-2' onClick={()=>handleEliminar(solicitud.sid)}><i className='fa fa-trash'></i></button></td>
                                )}
                            </tr>
                        ))}
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
                {isAdmin && <NuevaSolicitudModal showModal={showNewSolicituModal} setModal={setNewSolicitudModal} obtenerSolicitudes={obtenerSolicitudes} />}
                {isAdmin && solicitudSeleccionado && <SolicitudModal showModal={showSolicitudModal} setModal={setSolicitudModal} solicitud={solicitudSeleccionado} />}
        </div>
    )
}

export default GetSolicitudes