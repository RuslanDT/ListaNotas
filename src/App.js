import { useState} from 'react';
import './App.css';
import Boton from './components/Boton/Boton';
import Header from './components/Header/Header';
import Tarea from './components/Tarea/Tarea';
import ListGroup from 'react-bootstrap/ListGroup';
import ModalAgregar from './components/ModalAgregar/ModalAgregar';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function App() {
  const [botonActual, setBotonActual] = useState('Todas');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [selecTitulo, setSelecTitulo] = useState("");
  const [selecDescripcion, setSelecDescripcion] = useState("");
  const [selecFecha, setSelecFecha] = useState("");
  const [mostrarToast, setMostrarToast] = useState(false);
  const fechaEnFormatoISO = "17/07/2001".split("/").reverse().join("-");

  const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];

  const cambiarBoton = (texto) => {
    setBotonActual(texto);
  };


  return (
    <>
      <Header funcModal={()=> setMostrarModal(true)}/>
      <div className='container'>
        <div className='container-sm'>
          <ListGroup variant="flush" as="ul" className='mt-3'>
            { tareasGuardadas.length === 0?
              <h3 className='text-center'>No hay Tareas</h3>
              :
              tareasGuardadas.map((tarea, index) => (
                <Tarea
                  key={index}
                  titulo={tarea.titulo}
                  descripcion={tarea.descripcion}
                  fechaven={tarea.fecha}
                  estado={tarea.estado}
                />
              ))
            }
              
          </ListGroup>
          <div className='row g-2 mt-5 mb-5'>
            <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
              <Boton texto='Completadas' actual={botonActual === 'Completadas'} funcion={() => cambiarBoton('Completadas')} />
            </div>
            <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
              <Boton texto='Pendientes' actual={botonActual === 'Pendientes'} funcion={() => cambiarBoton('Pendientes')} />
            </div>
            <div className='col-12  col-lg-4 d-flex justify-content-center'>
              <Boton texto='Todas' actual={botonActual === 'Todas'} funcion={() => cambiarBoton('Todas')} />
            </div>  
          </div>
        </div>
        <ModalAgregar
          show={mostrarModal}
          accion="Agregar Tarea"
          onHide={() => setMostrarModal(false)}
          titulo={selecTitulo}
          descripcion={selecDescripcion}
          fechaven={selecFecha}
          toast={() => setMostrarToast(true)}
        />
      </div>
      <ToastContainer
            className="p-3"
            position="bottom-end"
            style={{ zIndex: 1 }}
          >
            <Toast onClose={() => setMostrarToast(false)} show={mostrarToast} delay={2000} autohide>
              <Toast.Header>
                  <strong className="me-auto">Agregado con exito</strong>
              </Toast.Header>
              <Toast.Body>Haz agregado una nueva Tarea</Toast.Body>
            </Toast>
          </ToastContainer>
    </>
  );
}

export default App;
