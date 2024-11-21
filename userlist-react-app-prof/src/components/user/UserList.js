import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../../Const';

/**
 * Componente funcional de paginação dos dados.
 * 
 * @param {*} param0
 * @returns 
 */
const Pagination = ({ pages, changeActivePage, changePerPage, activePage }) => {
  const listItems = [];

  for (let i = 0; i < pages; i++)
    listItems.push(
      <li className={'page-item ' + (activePage === i + 1 ? 'active' : '')} key={i}>
        <button type="button" className="page-link" onClick={() => changeActivePage(i + 1)} >{i + 1}</button>
      </li>
    );

  const perPage = [5, 10, 15].map(e => (
    <option key={e} value={e}>{e}</option>
  ));

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {listItems}

        <li>
          <select className="form-select ms-2" onChange={changePerPage}>
            {perPage}
          </select>
        </li>
      </ul>
    </nav>);
}

/**
 * Componente funcional para apresentação da lista de usuários.
 * @returns 
 */
export default function UserList() {
  const [activePage, setActivePage] = useState(1); // Estado: gerenciar a página ativa
  const [perPage, setPerPage] = useState(5); // Estado: gerenciar a quantidade de resultados por página
  const [data, setData] = useState({} | []); // Estado: armazenar os dados obtidos da API
  const nav = useNavigate(); // Navegação
  //let { data } = useFetch('https://reqres.in/api/users');


  /*
    Effect que faz a invocação da API para receber os dados dos usuários
    em formato JSON.
    
    O effect observa a alteração de estado de 'activePage' e 'perPage', quando
    algum destes estados muda, o effect é executado novamente.
  */
  useEffect(() => {
    fetch(`${API}/users?page=${activePage}&per_page=${perPage}`)
      .then(response => response.json())
      .then(data => setData(data));
  }, [activePage, perPage]);


  /**
   * Função para alterar o valor (estado) da página ativa.
   * 
   * @param {Number} page 
   */
  function changeActivePage(page = 1) {
    setActivePage(page);
  }

  /**
   * Função para alterar o valor (estado) da quantidade de resultados por página.
   * 
   * @param {Number} event 
   */
  function changePerPage(event) {
    setPerPage(event.target.value);
  }

  /**
   * Variável (array) que armazena as linhas para mostrar na tabela de usuários.
   */
  let userItems = data.data?.map(item => (
    <tr key={item.id}>
      <td><img className='avatar' src={item.avatar} alt={item.fisrt_name} /></td>
      <td>{item.first_name} {item.last_name}</td>
      <td>{item.email}</td>
    </tr>
  ));

  return (
    <>
      <h2>
        Usuários
        <button className="btn btn-primary ms-2"
         onClick={() => nav('/user/new')}>
          <i className="fas fa-plus-circle"></i> New
        </button>
      </h2>
      <p>Lista de usuários obtidos a partir da API https://reqres.in.</p>

      <table className='table table-striped'>
        <thead>
          <tr><th></th><th>Nome</th><th>E-mail</th></tr>
        </thead>
        <tbody>
          {userItems}
        </tbody>
      </table>

      <Pagination pages={data.total_pages}
        changeActivePage={changeActivePage}
        changePerPage={changePerPage}
        activePage={activePage} />
    </>
  );
}