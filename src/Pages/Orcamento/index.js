import {useNavigate} from 'react-router-dom'

import OrcamentoForm from '../../Formulario/OrcamentoForm';
import styles from './Orcamento.module.css'

function Orcamento() {

    const navigate = useNavigate()

    function criarOrcamento(orcamento){
        orcamento.valor = 0
        orcamento.servicos = []

        fetch('http://localhost:5000/orcamentos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orcamento)
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate('/listagem')
        })
        .catch(err => console.log((err)))

    }

    return (
        <div className={styles.Orcamento}>
            <h1>Novo Orçamento</h1>
            <OrcamentoForm handleSubmit={criarOrcamento} btnText='Salvar'/>
        </div>
    )
}

export default Orcamento;