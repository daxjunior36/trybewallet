import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      valDespesa: '',
      descDespesa: '',
      // moeda: '',
      // metodoPagamento: '',
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => { this.validacao(); });
  }

  render() {
    const { valDespesa, descDespesa } = this.state;
    const { siglas } = this.props;
    console.log(siglas);
    return (
      <form>
        <div>
          <input
            className="value-input"
            type="number"
            name="valor-despesa"
            data-testid="value-input"
            value={ valDespesa }
            onChange={ this.onInputChange }
          />
        </div>
        <div>
          <input
            className="des_despesa"
            type="text"
            name="desc_despesa"
            data-testid="description-input"
            value={ descDespesa }
            onChange={ this.onInputChange }
          />
        </div>
        <label htmlFor="moeda">
          Moeda
          <select
            data-testid="currency-input"
            id="moeda"
          >

            {siglas.map((element) => <option key={ element }>{element}</option>)}
            ;

          </select>
        </label>

        <select data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazera">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

      </form>
    );
  }
}

Form.propTypes = {
  siglas: propTypes.arrayOf(propTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  siglas: state.wallet.currencies });

export default connect(mapStateToProps, null)(Form);
