import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



// utils
import api from '../../../utils/api'



function EditarVagas() {
  const [vaga, setVaga] = useState({})
  const [token] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    api.get(`/vagas/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setVaga(response.data)
      })
  }, [token, id])

  // Pegar os valores dos inputs
  function handleChange(e) {
    setVaga({...vaga, [e.target.name]: e.target.value})
    console.log(vaga)
  }

  // Função para cadastrar a vaga
  async function handleEdit(e){
    e.preventDefault()

   
    await api.put(`vagas/editar/${id}`, vaga, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
      })
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      .catch((err) => {
        console.log(err)

        return err.response.data
      })


    navigate('/')


  }

  return (


        
            <div>
                <h1>Editar vaga</h1>
            <div>
              <form onSubmit={handleEdit}>
                <input
                text="Nome: "
                type="text"
                name="nome"
                placeholder="Digite o nome da vaga"
                onChange={handleChange}
                value={vaga.nome || ""}
                />
                <input
                text="Descrição: "
                type="text"
                name="descricao"
                placeholder="Digite a descrição da vaga"
                onChange={handleChange}
                value={vaga.descricao || ""}
                />
                <input
                text="Valor: "
                type="text"
                name="Requisitos"
                placeholder="Digite o requisito para a vaga"
                onChange={handleChange}
                value={vaga.Requisitos || ""}
                />
                <input
                text="Valor: "
                type="date"
                name="DataExpiração"
                placeholder="Digite a data de expiração da vaga"
                onChange={handleChange}
                value={vaga.DataExpiração || ""}
                />
                <button type="submit">Editar vaga</button>
              </form>
            </div>
            </div>
  )
}

export default EditarVagas