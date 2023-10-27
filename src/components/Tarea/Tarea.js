import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Tarea({titulo, descripcion, fechaven, estado}) {
    const [seleccionada, setSeleccionada] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        if (seleccionada) {
            estado = '2';
        } else {
            estado = '1';
        }
    }, [seleccionada]);

    const pulsa = () => {
        setSeleccionada(!seleccionada);
    };

    const eliminar = (titu, desc, fec) => {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        console.log(titu, " *** ", desc, " *** ", fec);

        const tareaIndex = tareas.findIndex((tarea) => tarea.titulo === titu && tarea.descripcion === desc && tarea.fecha === fec);


        if (tareaIndex !== -1) {
            tareas.splice(tareaIndex, 1);
            localStorage.setItem('tareas', JSON.stringify(tareas));
            console.log('Tarea eliminada correctamente.');
        } else {
            console.log('Tarea no encontrada.');
        }
    };

    return ( 
        <>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start mb-3"
            >
                <Form.Check 
                    type="checkbox" 
                    aria-label="chech 1"
                    checked={seleccionada}
                    onChange={pulsa}
                />
                <div className= {`ms-2 me-auto ${seleccionada? "text-decoration-line-through" : ""}`}>
                    <div className="fw-bold"> {titulo} </div>
                    <p> {descripcion} </p>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <div>
                        {fechaven} 
                    </div> 
                    <Button variant="outline-danger" size="sm" onClick={()=> {eliminar(titulo, descripcion, fechaven); setMostrarModal(true)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"/></svg>
                    </Button>
                </div>
            </ListGroup.Item>
            <ModalAgregar
                show={mostrarModal}
                accion="Eliminar Tarea"
                onHide={() => setMostrarModal(false)}
                titulo={selecTitulo}
                descripcion={selecDescripcion}
                fechaven={selecFecha}
                toast={() => setMostrarToast(true)}
            />
        </>
    );
}

export default Tarea;