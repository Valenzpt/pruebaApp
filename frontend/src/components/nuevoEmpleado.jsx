import axios from "axios";
import { useState } from "react";
import {showErrorToast} from '../helpers/alertHelper';

const URI = 'http://localhost:3000/api/';

function NuevoEmpleadoModal({showModal, setModal, obtenerEmpleados}) {
    const [newEmpleado, setNewEmpleado] = useState({
        nombre: '', 
        salario: '', 
        fecha: ''
    });

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleSubmit = async () => {
        try {
            const respuesta = await axios.post(URI+'empleados', newEmpleado, {withCredentials: true});
            setModal(false);
            setNewEmpleado({nombre: '', salario: '', fecha: ''});
            obtenerEmpleados();
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'error en server')
        }
    };

    return (
        <div className={`modal ${showModal? 'd-block': 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar nuevo empleado</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" name="nombre" value={newEmpleado.nombre} onChange={(e)=> setNewEmpleado({...newEmpleado, nombre: e.target.value})} placeholder="Nombre empleado"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salario" className="form-label">Salario</label>
                            <input type="text" className="form-control" name="salario" value={newEmpleado.salario} onChange={(e)=> setNewEmpleado({...newEmpleado, salario: e.target.value})} placeholder="Ingrese el salario"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fecha" className="form-label">Fecha Ingreso</label>
                            <input type="text" className="form-control" name="fecha" value={newEmpleado.fecha} onChange={(e)=> setNewEmpleado({...newEmpleado, fecha: e.target.value})}  placeholder="YYYY-MM-DD"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NuevoEmpleadoModal;