import { useEffect, useState } from "react";
import UserService from "./UserService";

function UserList() {
  const [users, setUsers] = useState([]); // Lista de Usuários
  const [page, setPage] = useState(1); // Página atual
  const [size, setSize] = useState(6); // Quantidade por página
  const [totalPages, setTotalPages] = useState(1); // Total de páginas

  // Fazer a requisição na API (através do UserService)
  useEffect(() => {
    UserService.getAll(page, size)
      .then((response) => {
        console.log("UserList:", response);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      })
      .catch((err) => {
        console.log(err);
        alert("Erro ao obter a lista de usuários");
      });
  }, [page, size]);

  const pageItems = []; // Itens de paginação
  for (let i = 0; i < totalPages; i++) {
    pageItems.push(
      <li>
        <button className="btn btn-primary" onClick={() => setPage(i + 1)}>
          {i + 1}
        </button>
      </li>
    );
  }

  const perPage = [2, 5, 10, 15].map((e) => <option value={e}>{e}</option>);

  const handleChangeSize = (event) => setSize(event.target.value);

  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>
                <img src={user.avatar} style={{ width: 80 }} />
              </td>
              <td>
                {user.first_name} {user.last_name}
              </td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-secondary">Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <ul className="pagination justify-content-center">
          {pageItems}
          <select className="form-select ms-2 w-auto" onChange={handleChangeSize}>
            {perPage}
          </select>
        </ul>
      </div>
    </>
  );
}

export default UserList;
