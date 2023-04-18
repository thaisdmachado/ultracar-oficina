import { useState, useEffect } from "react";

import Input from "../Components/Form/Input";
import Select from "../Components/Form/Select";
import SubmitButton from "../Components/Form/SubmitButton";
import styles from "./OrcamentoForm.module.css";

import { Space } from "antd"

function OrcamentoForm({ handleSubmit, btnText, orcamentoDados }) {
  const [veiculos, setVeiculos] = useState([]);
  const [orcamento, setOrcamento] = useState(orcamentoDados || {});

  useEffect(() => {
    fetch("http://localhost:5000/veiculos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setVeiculos(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(orcamento);
  };

  function handleChange(e) {
    setOrcamento({ ...orcamento, [e.target.name]: e.target.value });
  }

  function handleSelect(e) {
    setOrcamento({
      ...orcamento,
      veiculos: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
    });
  }

  return (
    <Space className={styles.container}>
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Cliente"
        name="name"
        placeholder="Nome Completo"
        handleOnChange={handleChange}
        value={orcamento.name ? orcamento.name : ''}
      />
      <Input
        type="number"
        text="CPF/CNPJ"
        name="CpfCnpj"
        placeholder="CPF/CNPJ"
        handleOnChange={handleChange}
        value={orcamento.CpfCnpj ? orcamento.CpfCnpj : ''}
      />
      <Input
        type="tel"
        text="Telefone"
        name="phone"
        placeholder="Telefone"
        handleOnChange={handleChange}
        value={orcamento.phone ? orcamento.phone : ''}
      /> 
      <Input
        type="email"
        text="E-mail"
        name="email"
        placeholder="E-mail"
        handleOnChange={handleChange}
        value={orcamento.email ? orcamento.email : ''}
      />
      <Input
        type="text"
        text="Placa"
        name="licensePlate"
        placeholder="Placa"
        handleOnChange={handleChange}
        value={orcamento.licensePlate ? orcamento.licensePlate : ''}
      />
      <Input
        type="datetime-local"
        text="Data de entrada"
        name="date"
        placeholder="Data/Hora"
        handleOnChange={handleChange}
        value={orcamento.date ? orcamento.date : ''}
      />
      <Select
        name="vehicle"
        text="Veiculo"
        options={veiculos}
        handleOnChange={handleSelect}
        value={orcamento.veiculos ? orcamento.veiculos.id : ''}
      />
      <SubmitButton text={btnText} />
    </form>
    </Space>
  );
}

export default OrcamentoForm;
