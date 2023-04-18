
import { useState, useEffect } from "react";

import OrcamentoLista from "../../Formulario/OrcamentoLista";
import Loading from '../../Components/Loader/Loading'

function Listagem() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    setTimeout(
      () => {
        fetch("http://localhost:5000/orcamentos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            setOrcamentos(data)
            setRemoveLoading(true)
          })
          .catch((err) => console.log(err));
      }, 500)

  }, []);

    function removeOrcamento(id) {

      fetch(`http://localhost:5000/orcamentos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(resp => resp.json)
      .then(data => {
        setOrcamentos(orcamentos.filter((orcamento) => orcamento.id !== id))
      })
      .catch(err => console.log(err))
    }

  return (
    <div>
      <h1>Orçamentos</h1>
      {orcamentos.length > 0 &&
        orcamentos.map((orcamento) => <OrcamentoLista  
        id={orcamento.id}
        name={orcamento.name}
        date={orcamento.date}
        licensePlate={orcamento.licensePlate}
        handleRemove={removeOrcamento}
        /> 
        )}
        {!removeLoading && <Loading />}
        {removeLoading && orcamentos.length === 0 &&
         <p>Não há orçamentos cadastrados ainda!</p>
        }
    </div>
  );
}

export default Listagem;
