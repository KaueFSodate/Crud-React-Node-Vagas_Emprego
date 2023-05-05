import { useContext, useState } from "react";

import { FormAuth, Container } from "./StylesAuth";

// Contexto
import { Context } from "../../../context/ClienteContext";  // Acesso aos metodos como inserir e etc

function Register() {
    const [usuario, setUsuario] = useState({})
    const {register} = useContext(Context)

    function handleChange(e){
        setUsuario({...usuario, [e.target.name]: e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        register(usuario)
    }

    return (  
        <Container>
            <FormAuth onSubmit={handleSubmit}>
            <h1>Registro</h1>
                <input
                text="Nome: "
                type="text"
                name="nome"
                placeholder="Digite o seu nome"
                onChange={handleChange}
                />
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
                <button type="submit">Registrar</button>
            </FormAuth>
        </Container>
    );
}

export default Register;