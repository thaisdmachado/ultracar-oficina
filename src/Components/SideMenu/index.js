import styles from './SideMenu.module.css'

import { DashboardOutlined, IdcardOutlined, UnorderedListOutlined, BarChartOutlined } from '@ant-design/icons'
import {Menu} from 'antd'
import { useNavigate } from 'react-router-dom'

function SideMenu() {

    const navigate = useNavigate();

    return (
    <div className={styles.SideMenu}>

        <Menu 
        style={{padding: 12, paddingBottom: '636px'}}
        mode='vertical'
        onClick={(item) => {
            navigate(item.key);
        }}
            items={[
                {
                    label: "Dashboard",
                    icon:<BarChartOutlined />,
                    key:"/"
                },
                {
                    label: "Orçamento",
                    icon: <DashboardOutlined />,
                    key:"/orcamento"
                },
                {
                    label: "Pátio",
                    icon: <IdcardOutlined />,
                    key:"/patio"
                },
                {
                    label: "Listagem",
                    icon: <UnorderedListOutlined />,
                    key:"/listagem"
                }

            ]}



        ></Menu>
    </div>)
}

export default SideMenu;