import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function ModalAgregar(props) {
    const [xtitulo, setTitulo] = useState(props.titulo);
    const [xdescripcion, setDescripcion] = useState(props.descripcion);
    const [xfecha, setFecha] = useState(props.fechaven);
    const [xestado, setEstado] = useState(props.estado? props.estado : '1');
    const tempTitulo = props.titulo;
    const tempDescripcion = props.descripcion;
    const tempfecha = props.fechaven;

    const handleChangeTitulo = (e) => {
        setTitulo(e.target.value);
    };

    const handleChangeDescripcion = (e) => {
        setDescripcion(e.target.value);
    };

    const handleChangeFecha = (e) => {
        console.log(e.target.value);
        setFecha(e.target.value);
    };

    const handleSubmit = () => {
        const tarea = {
            titulo: xtitulo,
            descripcion: xdescripcion,
            fecha: xfecha,
            estado: xestado
        };
       
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        if (props.accion === "Agregar Tarea"){
            tareas.push(tarea);

        } else{
            const tareaParaEditar = tareas.find(tarea => tarea.titulo === tempTitulo && tarea.descripcion === tempDescripcion && tarea.fecha === tempfecha);
            if (tareaParaEditar) {
                tareaParaEditar.titulo = xtitulo
                tareaParaEditar.descripcion = xdescripcion;
                tareaParaEditar.fecha = xfecha;
              } else {
                console.log('Tarea no encontrada.');
              }
        }

        localStorage.setItem('tareas', JSON.stringify(tareas));

        setTitulo('');
        setDescripcion('');
        setFecha('');

        props.onHide();
        props.toast();
        props.actualiza();
    };

    const eliminarTarea = (titu, desc, fec) => {
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        const tareaIndex = tareas.findIndex((tarea) => tarea.titulo === titu && tarea.descripcion === desc && tarea.fecha === fec);

        if (tareaIndex !== -1) {
            tareas.splice(tareaIndex, 1);
            localStorage.setItem('tareas', JSON.stringify(tareas));
            console.log('Tarea eliminada correctamente.');
            props.onHide();
            props.actualiza();
        } else {
            console.log('Tarea no encontrada.');
        }
    };

    return ( 
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.accion}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.accion === "Agregar Tarea" || props.accion === "Editar Tarea"?
                    <Form>
                        <FloatingLabel
                            controlId="labelTitulo"
                            label="Título"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="name@example.com"  value={xtitulo} onChange={handleChangeTitulo}/>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="labelDescripcion"
                            label="Descripción"
                            className="mb-3"
                        >
                            <Form.Control as="textarea" placeholder="Describe tu tarea aqui" value={xdescripcion} onChange={handleChangeDescripcion}/>
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="labelFecha"
                            label="Fecha de Vencimiento"
                            className="mb-3"
                        >
                            <Form.Control type="date" placeholder="Selecciona una fecha" value={xfecha}  onChange={handleChangeFecha}/>
                        </FloatingLabel>
                    </Form>
                    :
                    <h5>Se eliminara esta tarea. ¿Estas Seguro?</h5>
                }
            </Modal.Body>
                {props.accion === "Agregar Tarea" || props.accion === "Editar Tarea"?
                    <Modal.Footer>
                        <Button onClick={handleSubmit}>{props.accion === "Agregar Tarea"? "Agregar" : "Guardar"}</Button>
                        <Button variant="outline-secondary" onClick={props.onHide}>Cerrar</Button>
                    </Modal.Footer>
                    :
                    <Modal.Footer>
                        <Button onClick={() =>eliminarTarea(props.titulo, props.descripcion, props.fechaven)}>Eliminar</Button>
                        <Button variant="outline-secondary" onClick={props.onHide}>Cerrar</Button>
                    </Modal.Footer>
                }
        </Modal>
     );
}

export default ModalAgregar;