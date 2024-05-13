import { useEffect, useState } from "react";
import { appsetting } from "../settings/appseting";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { IProducto } from "../interface/IProducto";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

export const Lista = () => {
  const [producto, setProducto] = useState<IProducto[]>([]);

  const obtenerProducto = async () => {
    try {
      const response = await fetch(`${appsetting.apiUrl}Producto`);
      if (response.ok) {
        const data = await response.json();
        setProducto(data);
      }
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Hay un error, revisa bien el código!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    obtenerProducto();
  }, []);

  const eliminarProducto = (idProducto: number) => {
    Swal.fire({
      title: "Esta seguro?",
      text: "Esto no se puede deshacer!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${appsetting.apiUrl}Producto/${idProducto}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              }           
             }
          );

          if (response.ok) {
            Swal.fire({
              title: "Eliminado!",
              text: "Se ha Eliminado correctamente.",
              icon: "success",
            });

            obtenerProducto();

          } else {
            throw new Error("La solicitud no fue exitosa");
          }
        } catch (error: any) {
          Swal.fire({
            title: "Error!",
            text: error.message || "Hay un error, revisa bien el código!",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <Container className='mt-4'>
          <Row>
             <Col>
                <h4>Lista de Productos</h4>
                <hr />
                <Link className="btn btn-success mb-2" to='/nuevoempleado'>Nuevo Producto</Link>

                <Table bordered>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            producto.map(item => (
                                <tr key={item.idProducto}>
                                   <td>{item.nombre}</td>
                                   <td>{item.precio}</td>
                                   <td>{item.stock}</td>
                                   <td>
                                        <Link className="btn btn-primary me-2" to={`/editarempleado/${item.idProducto}`}>Editar Producto</Link>
                                        <button className="btn btn-danger" onClick={() => {eliminarProducto(item.idProducto!)}}>Eliminar Producto</button>
                                   </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
             </Col>
          </Row>
        </Container>
  );
};
