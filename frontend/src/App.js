import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Layouts
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

// Pages
import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import DetalhesVagas from './components/pages/vagas/DetalhesVagas'
import CadastrarVagas from "./components/pages/vagas/CadastrarVagas";
import MinhasVagas from "./components/pages/vagas/MinhasVagas";
import EditarVagas from "./components/pages/vagas/EditarVagas"

// Context
import { ClienteProvider } from "./context/ClienteContext";

function App() {
  return (
    <div className="App">
      <Router>
        <ClienteProvider>
          <NavBar/>
          <Container>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/vagas/:id" element={<DetalhesVagas/>}/>
              <Route path="/vagas/Cadastrar" element={<CadastrarVagas/>}/>
              <Route path="/vagas/minhasvagas" element={<MinhasVagas/>}/>
              <Route path="/vagas/editar/:id" element={<EditarVagas/>}/>
            </Routes>
          </Container>
          <Footer/>
        </ClienteProvider>
      </Router>
    </div>
  );
}

export default App;
