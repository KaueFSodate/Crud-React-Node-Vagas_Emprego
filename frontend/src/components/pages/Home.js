import api from "../../utils/api";
import {useState, useEffect } from "react";
import { Link } from "react-router-dom";

 
  
  function Home() {
  const [vagas, setVagas] = useState([]);
  const [buscarQuery, setbuscarQuery] = useState("");

  useEffect(() => {
    api.get("/vagas/").then((response) => {
      setVagas(response.data);
    });
  }, []);

  const filteredVagas = vagas.filter((vaga) =>
    vaga.nome.toLowerCase().includes(buscarQuery.toLowerCase())
  );

  function handleSearch(e) {
    setbuscarQuery(e.target.value);
  }

  return (
    <div>
      <h1>Vagas disponiveis</h1>
      <p>Veja os detalhes de cada uma</p>

      <input
        type="text"
        placeholder="Pesquisar vagas"
        value={buscarQuery}
        onChange={handleSearch}
      />

      {filteredVagas.length > 0 &&
        filteredVagas.map((vaga) => (
          <div key={vaga.id}>
            <h3>{vaga.nome}</h3>
            <p>Descrição: {vaga.descricao}</p>
            <Link to={`/vagas/${vaga.id}`}>Mais detalhes</Link>
          </div>
        ))}
      {filteredVagas.length === 0 && (
        <p>Não há vagas cadastradas ou disponíveis!</p>
      )}
    </div>
  );
}
  
  export default Home
