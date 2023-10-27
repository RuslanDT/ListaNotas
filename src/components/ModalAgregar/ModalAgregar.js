import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function ModalAgregar(props) {
    const [xtitulo, setTitulo] = useState(props.titulo);
    const [xdescripcion, setDescripcion] = useState(props.descripcion);
    const [xfecha, setFecha] = useState(props.fechaven);

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
        };
       
        const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        tareas.push(tarea);

        localStorage.setItem('tareas', JSON.stringify(tareas));

        setTitulo('');
        setDescripcion('');
        setFecha('');

        props.onHide();
        props.toast();
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
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSubmit}>Agregar</Button>
                <Button variant="outline-secondary" onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
     );
}

export default ModalAgregar;