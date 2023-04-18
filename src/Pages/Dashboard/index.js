import { Card, Space, Statistic, Table } from "antd";
import {
  CarOutlined,
  CarryOutOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";

import QRCode from "react-qr-code";

import styles from './Dashboard.module.css'


function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <CarryOutOutlined
              style={{
                color: "#017BA8",
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Orçamentos"}
          value={1234}
        />
        <DashboardCard
          icon={
            <CarOutlined
              style={{
                color: "#00BCCC",
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Ticket Médio"}
          value={1234}
        />
        <DashboardCard
          icon={
            <DollarCircleOutlined
              style={{
                color: "#6CFACD",
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Receita"}
          value={1234}
        />
      </Space>
    <Card>
      <Space direction="vertical">
        <QRCode className={styles.code}
          value="http://localhost:3000/patio"
        />

        Use a camêra para acessar facilmente a listagem de clientes no pátio!
      </Space>
      </Card>
    </div>


  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}


export default Dashboard;
