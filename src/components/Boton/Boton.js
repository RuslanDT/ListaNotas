import Button from 'react-bootstrap/Button';

function Boton({texto, actual, funcion}) {
    return ( 
        <Button variant={ actual? "primary" : "secondary"} size="lg" className="ps-5 pe-5" onClick={funcion}>
            {texto}
        </Button>
     );
}

export default Boton;