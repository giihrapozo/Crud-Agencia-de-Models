import { useState } from "react";
import "./App.css";

function App() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [altura, setAltura] = useState("");
  const [cidade, setCidade] = useState("");
  const [categoria, setCategoria] = useState("Fashion");
  const [status, setStatus] = useState("Disponível");

  const [modelos, setModelos] = useState([]);

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  function limparCampos() {
    setNome("");
    setIdade("");
    setAltura("");
    setCidade("");
    setCategoria("Fashion");
    setStatus("Disponível");
  }

  function salvarModelo() {
    if (
      nome === "" ||
      idade === "" ||
      altura === "" ||
      cidade === ""
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    if (editando) {
      const listaAtualizada = modelos.map((modelo) =>
        modelo.id === idEditar
          ? {
              ...modelo,
              nome,
              idade,
              altura,
              cidade,
              categoria,
              status,
            }
          : modelo
      );

      setModelos(listaAtualizada);
      setEditando(false);
      setIdEditar(null);
    } else {
      const novoModelo = {
        id: Date.now(),
        nome,
        idade,
        altura,
        cidade,
        categoria,
        status,
      };

      setModelos([...modelos, novoModelo]);
    }

    limparCampos();
  }

  function editarModelo(modelo) {
    setNome(modelo.nome);
    setIdade(modelo.idade);
    setAltura(modelo.altura);
    setCidade(modelo.cidade);
    setCategoria(modelo.categoria);
    setStatus(modelo.status);

    setEditando(true);
    setIdEditar(modelo.id);
  }

  function excluirModelo(id) {
    if (window.confirm("Deseja excluir esta modelo?")) {
      const novaLista = modelos.filter((modelo) => modelo.id !== id);
      setModelos(novaLista);
    }
  }

  return (
    <div className="container">
      <h1>Agency Raposo Models</h1>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nome da Modelo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />

        <input
          type="text"
          placeholder="Altura (Ex: 1,75)"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />

        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option>Fashion</option>
          <option>Comercial</option>
          <option>Fitness</option>
          <option>Plus Size</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Disponível</option>
          <option>Em Ensaio</option>
          <option>Em Desfile</option>
        </select>

        <button onClick={salvarModelo}>
          {editando ? "Salvar Alterações" : "Cadastrar Modelo"}
        </button>
      </div>

      <div className="lista">
        {modelos.length === 0 ? (
          <p className="vazio">
            Nenhuma modelo cadastrada.
          </p>
        ) : (
          modelos.map((modelo) => (
            <div className="card" key={modelo.id}>
              <h2>{modelo.nome}</h2>

              <p><strong>Idade:</strong> {modelo.idade} anos</p>

              <p><strong>Altura:</strong> {modelo.altura}</p>

              <p><strong>Cidade:</strong> {modelo.cidade}</p>

              <p><strong>Categoria:</strong> {modelo.categoria}</p>

              <p><strong>Status:</strong> {modelo.status}</p>

              <div className="botoes">
                <button
                  className="editar"
                  onClick={() => editarModelo(modelo)}
                >
                  Editar
                </button>

                <button
                  className="excluir"
                  onClick={() => excluirModelo(modelo.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;