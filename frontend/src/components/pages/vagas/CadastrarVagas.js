import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'




// utils
import api from '../../../utils/api'



function CadastrarVagas() {
  const [vaga, setVaga] = useState({})
  const [token] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()


  // Pegar os valores dos inputs
  function handleChange(e) {
    setVaga({...vaga, [e.target.name]: e.target.value})
    console.log(vaga)
  }

  // Função para cadastrar a vaga
  async function handleSubmit(e){
    e.preventDefault()

   
    await api.post(`vagas/`, vaga, {
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
                <h1>Cadastrar produto</h1>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                text="Nome: "
                type="text"
                name="nome"
                placeholder="Digite o nome da vaga"
                onChange={handleChange}
                />
                <input
                text="Descrição: "
                type="text"
                name="descricao"
                placeholder="Digite a descrição da vaga"
                onChange={handleChange}
                />
                <input
                text="Valor: "
                type="text"
                name="Requisitos"
                placeholder="Digite o requisito para a vaga"
                onChange={handleChange}
                />
                <input
                text="Valor: "
                type="date"
                name="DataExpiração"
                placeholder="Digite a data de expiração da vaga"
                onChange={handleChange}
                />
                <button type="submit">Cadastrar vaga</button>
              </form>
            </div>
            </div>
  )
}

export default CadastrarVagas