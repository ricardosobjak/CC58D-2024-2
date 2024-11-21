import { Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from './AppRoutes';

const PageHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">UserListAPP</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/user" className="nav-link active">Usuário</Link>
            </li>
          </ul>

          <ul className="navbar-nav d-flex">
            <li className="nav-item text-nowrap">
              <a href='/' className="nav-link">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


function App() {

  return (
    <>
      <BrowserRouter>
        <PageHeader />
        <div className='container mt-4'>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </>

  );
}

export default App;