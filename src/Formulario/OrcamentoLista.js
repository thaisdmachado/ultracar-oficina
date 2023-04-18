import styles from "./OrcamentoLista.module.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import Listagem from "../Pages/Listagem";

import { Link } from "react-router-dom";

function OrcamentoLista({
  id,
  name,
  date,
  licensePlate,
  handleRemove,
}) 

{

  const remove = (e) => {
    e.preventDefault()
    handleRemove(id)
  }

  return (
    <div className={styles.orcamento_lista}>
      <h4>
        <span>Código:</span> 00{id}
      </h4>
      <p>
        <span>Cliente</span> {name}
      </p>
      <p>
        <span>Data de Entrada:</span> {date}
      </p>
      <p>
        <span>Placa:</span> {licensePlate}
      </p>
      <div className={styles.orcamento_lista_actions}>
        <Link to={`/orcamento/${id}`}>
          <EditOutlined />
        </Link>
        <button onClick={remove}>
          <DeleteOutlined />
        </button>
      </div>
    </div>
  );
}

export default OrcamentoLista;
