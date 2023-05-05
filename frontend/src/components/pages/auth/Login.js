import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FormAuth, Container } from "./StylesAuth";

// Contexto
import { Context } from "../../../context/ClienteContext";  // Acesso aos metodos como inserir e etc

function Login() {
    const [usuario, setUsuario] = useState({})
    const {loginUser} = useContext(Context)

    function handleChange(e){
        setUsuario({...usuario, [e.target.name]: e.target.value})
        
    }

    function handleSubmit(e){
        e.preventDefault()
        console.log(usuario)
        loginUser(usuario)
    }

    return (  
        <Container>
            <FormAuth onSubmit={handleSubmit}>
            <h1>Login</h1>
                <input
                text="E-mail: "
                type="text"
                name="email"
                placeholder="Digite o seu e-mail"
                onChange={handleChange}
                />
                <input
                text="Senha: "
                type="password"
                name="senha"
                placeholder="Digite a sua senha"
                onChange={handleChange}
                />
                <button type="submit">Login</button>
                <p>Não tem conta? <Link to='/register'>Cadastrar</Link></p>
            </FormAuth>
        </Container>
    );
}

export default Login;