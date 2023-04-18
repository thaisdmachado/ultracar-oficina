import { useState, useEffect } from "react";

import Input from "../Components/Form/Input";
import Select from "../Components/Form/Select";
import SubmitButton from "../Components/Form/SubmitButton";
import styles from "../Formulario/OrcamentoForm.module.css";

function ServicoForm({ handleSubmit, btnText, orcamentoDados, dateAut }) {

    const [servico, setServico] = useState({})

    const [funcionario, setFuncionario] = useState([]);
    const [orcamento, setOrcamento] = useState(orcamentoDados || {});
  
    useEffect(() => {
      fetch("http://localhost:5000/funcionarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setFuncionario(data);
        })
        .catch((err) => console.log(err));
    }, []);
  
    function handleChange(e) {
      setServico({...servico, [e.target.name]: e.target.value})
    }  

    function handleSelect(e) {
      setOrcamento({
        ...orcamento,
        funcionarios: {
          id: e.target.value,
          nome: e.target.options[e.target.selectedIndex].text,
        },
      });
    }


  function submit(e) {
    e.preventDefault()
    orcamentoDados.servicos.push(servico)
    handleSubmit(orcamentoDados)
  }


  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Serviço"
        name="name"
        placeholder="Descrição"
        handleOnChange={handleChange}
      />
      <Input
        type="number"
        text="Valor"
        name="valor"
        placeholder="Valor"
        handleOnChange={handleChange}
      />
      <Input
        type="datetime-local"
        text="Data de Autorização"
        name="dateAut"
        placeholder="Data/Hora"
        handleOnChange={handleChange}
        value={servico.dateAut ? servico.dateAut : ''}
      />
      <Select
        name="name"
        text="Funcionário"
        options={funcionario}
        handleOnChange={handleSelect}
        value={orcamento.funcionarios ? orcamento.funcionarios.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServicoForm;
