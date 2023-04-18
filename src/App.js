import {Space} from 'antd';
import './App.css';
import PageContent from './Components/PageContent';
import SideMenu from './Components/SideMenu';
import AppHeader from './Components/AppHeader';
import AppFooter from './Components/AppFooter';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Space className='MenuPage'>
        <SideMenu />
        <PageContent />
      </Space>
      <AppFooter />
    </div>
  );
}

export default App;
