import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../styles/header.css';

class Header extends React.Component {
  render() {
    const { pegarEmail, mudarCotacao } = this.props;
    console.log(mudarCotacao);
    return (

      <header className="header_container">
        <h1>TrybeWallet!</h1>
        <div className="header_user">
          <span data-testid="email-field">
            {`${pegarEmail}`}
          </span>
          <div className="header_info">
            {mudarCotacao.length > 0 && mudarCotacao !== undefined ? (
              <span data-testid="total-field">
                { mudarCotacao.map((element) => {
                  console.log(element.exchangeRates);
                  const askNumber = element.exchangeRates[element.currency].ask;
                  return Number(askNumber) * Number(element.value);
                }).reduce((soma, i) => (soma + i)).toFixed(2)}
              </span>
            )
              : <span data-testid="total-field">0</span>}

            <span data-testid="header-currency-field">
              BRL
            </span>
          </div>
        </div>
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
  mudarCotacao: propTypes.arrayOf(propTypes.object).isRequired,
};
export default connect(mapStateToProps, null)(Header);
