import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-conainter">
        <div className="sidenav-container">

        </div>
        <div className="app-container">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
          {/* outlet dinh nghia trong component cha, khi render cac component con cua cha nay` se thay vao outlet */}
          {/* nó cho phép phần header tồn tại chung khi link đến component khác */}
        </div>
      </div>
    </div>
  );
}

export default App;
