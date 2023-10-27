import { useState} from 'react';
import './App.css';
import Boton from './components/Boton/Boton';
import Header from './components/Header/Header';
import Tarea from './components/Tarea/Tarea';
import ListGroup from 'react-bootstrap/ListGroup';
import ModalAgregar from './components/ModalAgregar/ModalAgregar';
import Tostada from './components/Tostada/Tostada';

function App() {
  const [botonActual, setBotonActual] = useState('Todas');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [selecIndex, setSelecIndex] = useState("");
  const [selecTitulo, setSelecTitulo] = useState("");
  const [selecDescripcion, setSelecDescripcion] = useState("");
  const [selecFecha, setSelecFecha] = useState("");
  const [selecEstado, setSelecEstado] = useState("");
  const [mostrarToast, setMostrarToast] = useState(false);
  const fechaEnFormatoISO = "17/07/2001".split("/").reverse().join("-");
  const [tareasGuardadas, setTareasGuardadas] = useState(JSON.parse(localStorage.getItem('tareas')) || []);
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  let mesActual = fechaActual.getMonth() + 1; 
  let diaActual = fechaActual.getDate();

  mesActual = mesActual < 10 ? '0' + mesActual : mesActual;
  diaActual = diaActual < 10 ? '0' + diaActual : diaActual;
  

  const cambiarBoton = (texto) => {
    const tareas = JSON.parse(localStorage.getItem('tareas'));
    var nuevasT = "";

    if(texto === "Completadas"){
      nuevasT = tareas.filter(tarea => tarea.estado === "2");
      
    }else if (texto === "Pendientes"){
      nuevasT = tareas.filter(tarea => tarea.estado === "1");

    }else if (texto === "Todas"){
      nuevasT = JSON.parse(localStorage.getItem('tareas')) || [];
    }
    
    setTareasGuardadas(nuevasT);

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
                  indx={index}
                  titulo={tarea.titulo}
                  descripcion={tarea.descripcion}
                  fechaven={tarea.fecha}
                  estado={tarea.estado}
                  toast={() => setMostrarToast(true)}
                  actualiza={()=> setTareasGuardadas(JSON.parse(localStorage.getItem('tareas')) || [])}
                  aActual = {añoActual}
                  mActual = {mesActual}
                  dActual = {diaActual}
                />
              ))
            }
              
          </ListGroup>
          <div className='row g-2 mt-5 mb-5'>
            <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-center'>
              <Boton texto='Completadas' actual={botonActual === 'Completadas'} funcion={() => cambiarBoton('Completadas')}/>
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
          index={selecIndex}
          titulo={selecTitulo}
          descripcion={selecDescripcion}
          fechaven={selecFecha}
          estado={selecEstado}
          toast={() => setMostrarToast(true)}
          actualiza={()=> setTareasGuardadas(JSON.parse(localStorage.getItem('tareas')) || [])}
        />
      </div>
      <Tostada close={() => setMostrarToast(false)} open={mostrarToast}/>
    </>
  );
}

export default App;
