import styles from "./OrcamentoDetalhes.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Space } from "antd";
import { parse, v4 as uuidv4 } from "uuid";

import Loading from "../../Components/Loader/Loading";
import OrcamentoForm from "../../Formulario/OrcamentoForm";
import ServicoForm from "../../Servico";
import ServicoCard from '../../Servico/ServicoCard'

function OrcamentoDetalhes() {
  const { id } = useParams();
  const [orcamento, setOrcamento] = useState([]);
  const [servicos, setServicos] = useState([])
  const [showOrcamentoForm, setShowOrcamentoForm] = useState(false);
  const [showServicoForm, setShowServicoForm] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/orcamentos/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setOrcamento(data);
          setServicos(data.servicos)
        })
        .catch((err) => console.log);
    }, 500);
  }, [id]);

  function editPost(orcamento) {
    fetch(`http://localhost:5000/orcamentos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orcamento),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setOrcamento(data);
        setShowOrcamentoForm(false);
      })
      .catch((err) => console.log(err));
  }

  function criarServico() {
    const ultimoServico = orcamento.servicos[orcamento.servicos.length - 1];
    ultimoServico.id = uuidv4();
    const ultimoServicoValor = ultimoServico.valor;
    const novoValor =
      parseFloat(orcamento.valor) + parseFloat(ultimoServicoValor);

    orcamento.valor = novoValor;

    fetch(`http://localhost:5000/orcamentos/${orcamento.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orcamento),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setShowServicoForm(false)
      })
      .catch((err) => console.log(err));
  }

  function removeServico(id, valor) {
    const servicosUpdated = orcamento.servicos.filter(
      (servico) => servico.id !== id,
    )
    const orcamentoUpdated = orcamento

    orcamentoUpdated.servicos = servicosUpdated
    orcamentoUpdated.valor =  parseFloat(orcamentoUpdated.valor) - parseFloat(valor)
  
      fetch(`http://localhost:5000/orcamentos/${orcamentoUpdated.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orcamentoUpdated)
      })
      .then((resp) => resp.json())
      .then((data) => {
        setOrcamento(orcamentoUpdated)
        setServicos(servicosUpdated)
      })
      .catch(err => console.log(err))

  }

  function toggleOrcamentoForm() {
    setShowOrcamentoForm(!showOrcamentoForm);
  }

  function toggleServicoForm() {
    setShowServicoForm(!showServicoForm);
  }

  return (
    <>
      {orcamento.name ? (
        <div className={styles.orcamento_details}>
          <Space>
            <div className={styles.details_container}>
              <h1>Orçamento: 00{orcamento.id}</h1>
              <button className={styles.btn} onClick={toggleOrcamentoForm}>
                {!showOrcamentoForm ? "Editar" : "Fechar"}
              </button>
              {!showOrcamentoForm ? (
                <div className={styles.orcamento_info}>
                  <p>
                    <span>Cliente:</span> {orcamento.name}
                  </p>
                  <p>
                    <span>Veiculo:</span> {orcamento.veiculos.name}
                  </p>
                  <p>
                    <span>Placa:</span> {orcamento.licensePlate}
                  </p>
                  <p>
                    <span>Data de Entrada:</span> {orcamento.date}
                  </p>
                  <p>
                    <span>Data de Autorização:</span> {orcamento.servicos.dateAut}
                  </p>
                  <p>
                    <span>Valor Total:</span> R${orcamento.valor}
                  </p>
                </div>
              ) : (
                <div className={styles.orcamento_info}>
                  <OrcamentoForm
                    handleSubmit={editPost}
                    btnText="Salvar"
                    orcamentoDados={orcamento}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione Serviços:</h2>
              <button className={styles.btn} onClick={toggleServicoForm}>
                {!showServicoForm ? "Adicionar" : "Fechar"}
              </button>
              <div className={styles.orcamento_info}>
                {showServicoForm && (
                  <ServicoForm
                    handleSubmit={criarServico}
                    btnText="Adicionar"
                    orcamentoDados={orcamento}
                  />
                )}
              </div>
            </div>
            <h3>Serviços:</h3>
            <Space>
              {servicos.length > 0 &&
                servicos.map((servico) =>(
                  <ServicoCard 
                    id={servico.id}
                    name={servico.name}
                    valor={servico.valor}
                    key={servico.id}
                    handleRemove={removeServico}
                  />
                ))
              }
              {servicos.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Space>
          </Space>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default OrcamentoDetalhes;
