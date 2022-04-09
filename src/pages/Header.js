import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { pegarEmail, mudarCotacao } = this.props;
    console.log(mudarCotacao[0]);
    return (
      <header>
        {/* { mudarCotacao !== undefined ? } */}
        <p data-testid="email-field">
          {pegarEmail}
        </p>

        {mudarCotacao.length > 0 && mudarCotacao !== undefined ? (
          <p data-testid="total-field">
            { mudarCotacao.map((element) => {
              console.log(element.exchangeRates);
              const askNumber = element.exchangeRates[element.currency].ask;
              return Number(askNumber) * Number(element.value);
            }).reduce((soma, i) => (soma + i)).toFixed(2)}
          </p>
        )
          : <p data-testid="total-field">0</p>}

        <p data-testid="header-currency-field">
          BRL
        </p>

      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  pegarEmail: state.user.email,
  mudarCotacao: state.wallet.expenses,
});
Header.propTypes = {
  pegarEmail: propTypes.string.isRequired,
  mudarCotacao: propTypes.arrayOf.isRequired,
};
export default connect(mapStateToProps, null)(Header);
