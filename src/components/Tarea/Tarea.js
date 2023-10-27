import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ModalAgregar from '../ModalAgregar/ModalAgregar';

function Tarea({indx, titulo, descripcion, fechaven, estado, toast, actualiza, añoActual, mesActual, diaActual}) {
    const [seleccionada, setSeleccionada] = useState(estado === '1'? false : true);
    const [mostrarModal2, setMostrarModal2] = useState(false);
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const [accion, setAccion] = useState("Eliminar Tarea");
    const [vencida, setVencida] = useState(false)
    const fechaString = fechaven;
    const partesFecha = fechaString.split("-");

    const año = partesFecha[0]; 
    const mes = partesFecha[1];  
    const día = partesFecha[2];  



    useEffect(() => {
        if (seleccionada) {
            estado = '2';
            tareas[indx].estado = estado;
        } else {
            estado = '1';
            tareas[indx].estado = estado;
        }

        localStorage.setItem('tareas', JSON.stringify(tareas));

        actualiza();

    }, [seleccionada]);

    const pulsa = () => {
        setSeleccionada(!seleccionada);
    };

    const editar = () =>{
        setAccion("Editar Tarea");
        setMostrarModal2(true);
    }
    

    return ( 
        <>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start mb-3"
                action onClick={editar}
            >
                <Form.Check 
                    type="checkbox" 
                    aria-label="chech 1"
                    checked={seleccionada}
                    onChange={pulsa}
                />
                <div className= {`ms-2 me-auto ${seleccionada || estado === '2' ? "text-decoration-line-through" : ""}`}>
                    <div className={`fw-bold` }> {titulo} </div>
                    <p> {descripcion} </p>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <div>
                        {fechaven} 
                    </div>
                    <Button variant="outline-danger" size="sm" onClick={()=> setMostrarModal2(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"/></svg>
                    </Button>
                </div>
            </ListGroup.Item>
            <ModalAgregar
                show={mostrarModal2}
                accion={accion}
                onHide={()=> setMostrarModal2(false)}
                titulo={titulo}
                descripcion={descripcion}
                fechaven={fechaven}
                toast={toast}
                actualiza={actualiza}
            />
        </>
    );
}

export default Tarea;