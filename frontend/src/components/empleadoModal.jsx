function EmpleadoModal({showModal, setModal, empleado}) {
    const handleCloseModal = () => {
        setModal(false);
    };

    return (
        <div className={`modal ${showModal? 'd-block': 'd-none'}`} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Detalles empleado</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    {empleado?(
                        <div className="modal-body">
                            <p><strong>Nombre:</strong> {empleado.nombre}</p>
                            <p><strong>Salario:</strong> {empleado.salario}</p>
                            <p><strong>Fecha de ingreso:</strong> {empleado.fecha_ingreso}</p>
                        </div>):(<p>Cargando...</p>)}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={()=>setModal(false)}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmpleadoModal;