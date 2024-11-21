import axios from "axios";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../Const";

const URL = `${API}/users`;

/**
 * Classe que representa a estrutura do formulário HTML.
 */
class HTMLForm {
  constructor(first_name = '', last_name = '', email = '') {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
  }
}

/**
 * Componente de formulário para criar e editar usuários.
 * 
 * @returns 
 */
export default function UserForm() {
  const nav = useNavigate();

  // Estado 'submitting': gerenciar se o formulário está sendo submetido.
  const [submitting, setSubmitting] = useState(false);

  /**
   * Função 'formReducer' trata as possibilidades de alteração do estado
   * do formulário (formData).
   * 
   * Se houver a indicação de reset no evento, então os valores para o 
   * formulário é esvaziado.
   * Caso contrário, um atributo do objeto é alterado.
   * 
   * @param {*} state 
   * @param {*} event 
   * @returns 
   */
  const formReducer = (state, event) => {
    // Verifica se o evento é para resetar o formulário
    if (event.reset)
      // Retorna um objeto com os atributos do formulário vazios.
      return new HTMLForm();

    // Retorna um novo objeto, contendo os atributos do estado atual do objeto
    // e adicionar o valor (event.value) a um atributo do objeto atual (event.name).
    return {
      ...state,
      [event.name]: event.value
    }
  }

  /**
   * Reducer 'formData': gerenciar o estado do formulário. 
   * 
   * Recursos criados pelo useReducer:
   *  -formData:    variável que armazena os dados do formulário (estado).
   *  -setFormData: nome da função que deverá ser invocada para
   *                alterar o estado do formulário. 
   * 
   * Criação do reducer: o reducer é criado por meio da função useReducer, que
   * recebe dois parâmetros:
   *  -função redutora: é a função responsável por alterar o estado do reducer
   *                    toda vez que a função 'setFormData' ser invocada.
   *  -estado inicial: um objeto, contendo os atributos que representam os
   *                   campos do formulário.
   */
  const [formData, setFormData] = useReducer(formReducer, new HTMLForm());


  /**
   * Função 'handleChange' é invocada a cada mudança de valor nos
   * campos do formulário. Esta função tem faz a solicitação de 
   * alteração de estado do formulário no reducer 'formData'.
   * 
   * @param {*} event 
   */
  const handleChange = event => {

    const isCheckbox = event.target.type === 'checkbox';

    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    });
  }

  /**
   * Função 'handleSave' é invocada para salvar os dados do formulário. 
   * O estado do formulário, armazenado no reducer 'formData' é enviado
   * para a API, por meio de uma requisição HTTP.
   * 
   * @param {*} event 
   */
  const handleSave = event => {
    console.log(event);
    console.log(formData)
    event.preventDefault();

    // Altera o estado, indicando que o formulário está sendo submetido.
    setSubmitting(true);

    // Faz a requisição HTTP, pelo método POST, através da biblioteca Axios.
    // Ao invocar a função assíncrona de requisição '.post(...)', há três funções
    // de tratamento da resposta: then (sucesso na requisição),  catch (falha na requisição) 
    // e finally (encerramento em qualquer circunstância).
    axios.post(URL, formData)
      .then((res) => {
        console.log('Resposta de sucesso da API:', res);

        setFormData({ reset: true });

        alert("Sucesso ao salvar!");
      })
      .catch(err => {
        console.log('Resposta de erro da API:', err);
        alert("Falha ao salvar!");
      })
      .finally(() => {
        setSubmitting(false);
      });

    /*
  setTimeout(() => {
    setSubmitting(false);

    setFormData({
      reset: true
    });

  }, 3000)
  */
  };

  // Retorna o JSX
  return (
    <>
      <h2>Usuário</h2>
      <p>Formulário desenvolvido em React, que submete os dados para a API https://reqres.in.</p>

      <form onSubmit={handleSave}>
        <fieldset className="form-group" disabled={submitting}>
          <label>Primeiro nome</label>
          <input type="text" name="first_name" className="form-control"
            placeholder="Fulano" onChange={handleChange} value={formData.first_name || ''} />
        </fieldset>

        <fieldset className="form-group" disabled={submitting}>
          <label>Sobrenome</label>
          <input type="text" name="last_name" className="form-control" placeholder="de Tal" onChange={handleChange} value={formData.last_name || ''} />
        </fieldset>

        <fieldset className="form-group" disabled={submitting}>
          <label>E-mail</label>
          <input type="email" name="email" className="form-control" placeholder="name@example.com" onChange={handleChange} value={formData.email || ''} />
        </fieldset>

        <div className="mt-2">
          <button type="submit" className="btn btn-success me-1" style={{ minWidth: '100px' }} disabled={submitting}>
            <i className="fas fa-check-circle"></i> Salvar
          </button>

          <button className="btn btn-light" style={{ minWidth: '100px' }} onClick={() => nav('/user')} disabled={submitting}>
            <i className="fas fa-times-circle"></i> Cancelar
          </button>
        </div>
      </form>
    </ >
  );
}