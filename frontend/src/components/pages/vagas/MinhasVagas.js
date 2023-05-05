import api from "../../../utils/api";
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";

 
  
  function MinhasVagas() {
    const [vagas, setVagas] = useState([])
    const [token] = useState(localStorage.getItem('token'))

    // Pegar os produtos da API
    useEffect(() => {
    api.get('/vagas/minhasVagas', {
        // Mandar o token para o headers
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
          }
      }).then((response) => {
        setVagas(response.data)
      })
    }, [token])

    async function removeVaga(id) {


      await api.delete(`/vagas/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedVagas = vagas.filter((vaga) => vaga.id != id)
        setVagas(updatedVagas)
        return response.data
      })
      .catch((err) => {
        console.log(err)

      })
    }


    return (
      <div>
        <h1>Vagas disponiveis</h1>
        <p>Veja os detalhes de cada uma</p>

        {vagas.length > 0 &&
                vagas.map((vaga) => (
                    <div key={vaga.id}>
                        <h3>{vaga.nome}</h3>
                        <p>
                            Descrição: {vaga.descricao}
                        </p>
                        <Link to={`/vagas/${vaga.id}`}>Mais detalhes</Link>

                        <Link to={`/vagas/editar/${vaga.id}`}>Editar</Link>
                        <button
                          onClick={() => {
                            removeVaga(vaga.id)
                          }}
                        >
                        Excluir
                        </button>
                    </div>         
        ))}
        {vagas.length === 0 && (
                <p>Não há vagas cadastradas!</p>
        )}
      </div>


    )
  }
  
  export default MinhasVagas