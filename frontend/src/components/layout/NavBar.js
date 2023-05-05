import { Link } from "react-router-dom";
import { useContext } from "react";

// Context
import { Context } from "../../context/ClienteContext";

import React from 'react'

function NavBar() {
    const {autenticado, logoutUser} = useContext(Context)
  return (
    <nav >
            <h1 >Bauru empregos</h1>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                {
                    //Se estiver autenticado
                    autenticado ?(
                        <>
                            <li>
                                <Link to='/vagas/Cadastrar'>Cadastrar Vagas</Link>
                            </li>
                            <li>
                                <Link to='/vagas/minhasvagas'>Minhas Vagas</Link>
                            </li>
                            <li>
                                <Link to='/cliente/perfil'>Perfil</Link>
                            </li>
                            <li onClick={logoutUser}>Sair</li>
                        </>
                    )
                    
                    // Se não
                    :( <><li>
                        <Link to='/login'>Entrar</Link>
                    </li>
                    <li>
                        <Link to='/register'>Cadastrar</Link>
                    </li></>)
                }
            </ul>
        </nav>
  )
}

export default NavBar