import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Lista } from "./components/Lista";
import { NuevoEmpleado } from "./components/NuevaPersona";
import { EditarEmpleado } from "./components/EditarPersona";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lista />} />
        <Route path="/nuevoempleado" element={<NuevoEmpleado/>}/>
        <Route path="/editarempleado/:idProducto" element={<EditarEmpleado/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
