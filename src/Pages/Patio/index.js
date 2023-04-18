import styles from "./Patio.module.css";

import OrcamentoLista from "../../Formulario/OrcamentoLista";
import { useState, useEffect } from "react";
import {Space} from 'antd'

function Patio() {
  const [orcamento, setOrcamento] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orcamentos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setOrcamento(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
        <h1>Veículos no Pátio</h1>
      {orcamento.length > 0 &&
        orcamento.map((orcamento) => (
          <Space className={styles.patio_lista}>
           <span>Cliente:</span>{orcamento.name}
           <span>Veículo:</span> {orcamento.veiculos.name}
            <span>Placa:</span> {orcamento.licensePlate}
            </Space>
        ))}
    </div>
  );
}

export default Patio;
