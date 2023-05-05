import React from 'react'
import api from "../../../utils/api";
import {useState, useEffect } from "react";
import { useParams } from 'react-router-dom'

function DetalhesVagas() {
    const [vagas, setVagas] = useState({})
    const { id } = useParams()

    // Pegar os produtos da API
    useEffect(() => {
        api.get(`/vagas/${id}`).then((response) => {
          setVagas(response.data)
          console.log(response.data)
        })
    }, [id])

    


    return (
        <div>
          <h1>Detalhes da vaga</h1>
          {Object.keys(vagas).length > 0 ? (
            <div>
              <h3>{vagas.nome}</h3>
              <p>Descrição: {vagas.descricao}</p>
              <p>Requisitos: {vagas.Requisitos}</p>
              <p>Data de expiração: {vagas.DataExpiração}</p>

      
            </div>
          ) : (
            <p>Não há vagas cadastradas ou disponíveis!</p>
          )}
        </div>
      );
}      

export default DetalhesVagas