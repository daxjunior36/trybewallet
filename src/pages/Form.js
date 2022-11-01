import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { funcCotacaoMoedas } from '../actions';
import '../styles/Wallet.css';

const ALIMENTACAO = 'Alimentação';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
      id: 0,

      // expenses: [],

    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  informaDespesa = () => {
    // const { state } = this;
    this.setState((prevState) => ({ id: prevState.id + 1 }));
    const { value, description, currency, method, tag, id } = this.state;
    const { cotacao } = this.props;
    // adicionaDespesa({ value, description, currency, method, tag, id, exchangeRates });
    cotacao({ value, description, currency, method, tag, id });

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTACAO,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { siglas, nomeMoeda } = this.props;
    console.log(nomeMoeda);
    return (
      <div className="wallet_container">
        <form className="form">
          <div>
            <input
              placeholder="Desc_Despesa"
              className="input_despesa"
              type="text"
              name="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.onInputChange }
            />
            <select
              className="input_tag"
              data-testid="tag-input"
              value={ tag }
              name="tag"
              onChange={ this.onInputChange }
            >
              <option value={ ALIMENTACAO }>Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <select
              className="input_method"
              data-testid="method-input"
              name="method"
              value={ method }
              onChange={ this.onInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>

          </div>
          <input
            placeholder="Valor"
            id="value-input"
            className="input_value"
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.onInputChange }
          />
          <label className="input_moeda" htmlFor="moeda">
            Moeda
            <select
              data-testid="currency-input"
              value={ currency }
              id="moeda"
              name="currency"
              onChange={ this.onInputChange }
            >
              {siglas.map((element) => (
                <option
                  value={ element }
                  key={ element }
                >
                  {element}
                </option>
              ))}

            </select>
          </label>

          <div className="button-add">
            <button
              type="button"
              onClick={ this.informaDespesa }
            >
              Adicionar despesa
            </button>
          </div>
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {nomeMoeda.map((element) => (
              <tr
                key={ element }
              >

                <td>
                  {element.description}
                </td>
                <td>
                  {element.tag}
                </td>
                <td>
                  {element.method}
                </td>
                <td>
                  {Number(element.value).toFixed(2)}
                </td>
                <td>
                  {element.exchangeRates[element.currency].name.split('/Real Brasileiro')}
                </td>
                <td>
                  {Number(element.exchangeRates[element.currency].ask).toFixed(2)}
                </td>
                <td>
                  {(Number(element.exchangeRates[element.currency].ask)
                * Number(element.value)).toFixed(2)}
                </td>
                <td> Real</td>
                <td>
                  <button type="button"> Editar/Excluir </button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

Form.propTypes = {
  siglas: propTypes.arrayOf(propTypes.string).isRequired,
  cotacao: propTypes.func.isRequired,
  nomeMoeda: propTypes.arrayOf(propTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  siglas: state.wallet.currencies,
  nomeMoeda: state.wallet.expenses,

});

const mapDispatchToProps = (dispatch) => ({
  cotacao: (data) => dispatch(funcCotacaoMoedas(data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
