import {Image, Space, Typography} from "antd";
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons'

import styles from './AppHeader.module.css'
import logo from '../../img/logo.png'

function AppHeader() {
    return (
    <div className={styles.AppHeader}>

    <img src={logo} />
    <h1>Ultracar</h1>
    <Space>
        <QuestionCircleOutlined style={{ fontSize: 24}}/>
        <UserOutlined style={{ fontSize: 24}} />
    </Space>
    </div>
)
}

export default AppHeader;