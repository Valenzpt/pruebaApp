function SolicitudModal({showModal, setModal, solicitud}) {
    const handleCloseModal = () => {
        setModal(false);
    };
    return (
        <div className={`modal ${showModal? 'd-block': 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles solicitud</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    {solicitud?(
                        <div className="modal-body">
                            <p><strong>Codigo:</strong> {solicitud.codigo}</p>
                            <p><strong>Descripcon:</strong> {solicitud.descripcion}</p>
                            <p><strong>Resumen:</strong> {solicitud.resumen}</p>
                            <p><strong>Empleado:</strong> {solicitud.Empleado.nombre}</p>
                        </div>):(<p>Cargando...</p>)}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>setModal(false)}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SolicitudModal;