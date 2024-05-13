import {ChangeEvent, useState} from 'react'
import { appsetting } from '../settings/appseting'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {IProducto} from '../interface/IProducto'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'

const initialProducto = {
  nombre: '',
  precio: 0,
  stock: 0,
}

export const NuevoEmpleado = () => {

    const [producto, setproducto] = useState<IProducto>(initialProducto)
    const navigate = useNavigate()

    const inputChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
       const inputName = event.target.name
       const inputValue = event.target.value

       setproducto({...producto, [inputName] : inputValue})
    }

    const volverInicio = () => {
      navigate('/')
    }

    const guardar = async () =>{
      try {
        const response = await fetch(`${appsetting.apiUrl}Producto`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(producto)
        });
        
        if(response.ok){
          navigate('/');
        } else {
          throw new Error('La solicitud no fue exitosa');
        }
      } catch(error: any) {
        Swal.fire({
          title: "Error!",
          text: error.message || "Hay un error, revisa bien el código!",
          icon: "error"
        });
      }
    }
    

    return(
        <Container className='mt-4'>
          <Row>
             <Col>
                  <h4>Nueva Persona</h4>
                  <hr />
                  <Form>
                      <FormGroup>
                         <Form.Label>Nombre</Form.Label>
                         <Form.Control type='text' name="nombre" onChange={inputChangeValue} value={producto.nombre}/>
                      </FormGroup>
                      <FormGroup>
                         <Form.Label>Precio</Form.Label>
                         <Form.Control type='number' name="precio" onChange={inputChangeValue} value={producto.precio}/>
                      </FormGroup>
                      <FormGroup>
                         <Form.Label>Stock</Form.Label>
                         <Form.Control type='number' name="stock" onChange={inputChangeValue} value={producto.stock}/>
                      </FormGroup>
                  </Form>
                  <div className='mt-2'>
                    <Button variant="primary" onClick={guardar} className='me-2'>Guardar</Button>
                    <Button variant="secondary" onClick={volverInicio}>Volver</Button>
                  </div>
             </Col>
          </Row>
        </Container>
    )
}