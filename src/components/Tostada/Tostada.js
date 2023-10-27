import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function Tostada({close, open}) {
    return ( 
        <ToastContainer
          className="p-3"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast onClose={close} show={open} delay={3000} autohide>
            <Toast.Header>
                <strong className="me-auto">Agregado con exito</strong>
            </Toast.Header>
            <Toast.Body>Haz agregado una nueva Tarea</Toast.Body>
          </Toast>
      </ToastContainer>
     );
}

export default Tostada;