import styles from "./ServicoCard.module.css"

import { DeleteOutlined } from '@ant-design/icons'

function ServicoCard({id, name, valor, handleRemove}) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id, valor)
    }

    return(
        <div className={styles.servico_lista}>
            <h4>{name}</h4>
            <p>
                <span>Valor:</span> R${valor}
            </p>

            <div className={styles.btn}>
                <button onClick={remove}>
                <DeleteOutlined />
                </button>
            </div>
        </div>
    )
}

export default ServicoCard;