import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { funcCotacaoMoedas } from '../actions';

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
    const { siglas } = this.props;
    // console.log(this.state.currency);
    return (
      <form>
        <div>
          <input
            className="value-input"
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.onInputChange }
          />
        </div>
        <div>
          <input
            className="des_despesa"
            type="text"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.onInputChange }
          />
        </div>
        <div className="button-add">
          <button
            type="button"
            onClick={ this.informaDespesa }
          >
            Adicionar despesa
          </button>
        </div>
        <label className="moeda" htmlFor="moeda">
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
            ;

          </select>
        </label>

        <select
          className="moeda"
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ this.onInputChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          className="moeda"
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

        <table>
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
        </table>
      </form>

    );
  }
}

Form.propTypes = {
  siglas: propTypes.arrayOf(propTypes.string).isRequired,
  cotacao: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  siglas: state.wallet.currencies });

const mapDispatchToProps = (dispatch) => ({
  // adicionaDespesa: (state) => dispatch(pegarStado(state)),
  cotacao: (data) => dispatch(funcCotacaoMoedas(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
