import axios from "axios";
import { useState } from "react";
import {showErrorToast, showSuccessToast} from '../helpers/alertHelper';

const URI = 'http://localhost:3000/api/';

function NuevaSolicitudModal({showModal, setModal, obtenerSolicitudes}) {
    const [newSolicitud, setNewSolicitud] = useState({
        codigo: '', 
        descripcion: '', 
        resumen: '',
        eid: ''
    });

    const handleCloseModal = () => {
        setModal(false);
    };

    const handleSubmit = async () => {
        try {
            const respuesta = await axios.post(URI+'solicitudes', newSolicitud, {withCredentials: true});
            setModal(false);
            setNewSolicitud({codigo: '', descripcion: '', resumen: '', eid:''});
            showSuccessToast(respuesta?.data?.message)
            obtenerSolicitudes();
        } catch (error) {
            showErrorToast(error.response?.data?.message || 'error en server')
        }
    };

    return (
        <div className={`modal ${showModal? 'd-block': 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar nueva solicitud</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="codigo" className="form-label">Código</label>
                            <input type="text" className="form-control" name="codigo" value={newSolicitud.codigo} onChange={(e)=> setNewSolicitud({...newSolicitud, codigo: e.target.value})} placeholder="Código de la solicitud"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="descripcion" className="form-label">Descripcion</label>
                            <input type="text" className="form-control" name="descripcion" value={newSolicitud.descripcion} onChange={(e)=> setNewSolicitud({...newSolicitud, descripcion: e.target.value})} placeholder="Descripción de la solicitud"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="resumen" className="form-label">Resumen</label>
                            <input type="text" className="form-control" name="resumen" value={newSolicitud.resumen} onChange={(e)=> setNewSolicitud({...newSolicitud, resumen: e.target.value})} placeholder="Resumen de la solicitud"/>
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

export default NuevaSolicitudModal;