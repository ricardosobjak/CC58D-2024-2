import { useReducer } from "react";
import UserService from "./UserService";

function UserForm() {

  const formReducer = (state, event) => {
    if(event === "reset") 
      return {};

    return {
      ...state,
      [event.name]: event.value
    }
  }

  // Estado do formulário
  const [formData, setFormData] = useReducer(formReducer, {});

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    });
  }

  const handleSave = () => {
    console.log(formData);

    // Salvando na API
    UserService.save(formData)
      .then( (res) => {
        console.log(res);
        alert("Salvo com sucesso!");
      })
      .catch((err) => { console.log(err) });
  }
  

  return (
    <>
      <h1>Cadastro de Usuários</h1>

      <form>
        <fieldset className="form-group">
          <label>Nome</label>
          <input type="text" name="first_name" 
            className="form-control" placeholder="Fulano"
            onChange={handleChange} />
        </fieldset>

        <fieldset className="form-group">
          <label>Sobrenome</label>
          <input type="text" name="last_name" className="form-control" onChange={handleChange} placeholder="de Tal" />
        </fieldset>

        <fieldset className="form-group">
          <label>E-mail</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} placeholder="fulano@provedor.com" />
        </fieldset>

        <div className="mt-2">
          <button type="submit" className="btn btn-success me-1" onClick={handleSave}>Salvar</button>
          <button type="button" className="btn btn-light">Cancelar</button>
        </div>

      </form>
    </>
  );
}

export default UserForm;
