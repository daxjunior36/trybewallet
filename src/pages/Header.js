import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { pegarEmail } = this.props;
    console.log(pegarEmail);
    return (
      <header>
        <p data-testid="email-field">
          {pegarEmail}
        </p>
        <p data-testid="total-field">
          0
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  pegarEmail: state.user.email,
});
Header.propTypes = {
  pegarEmail: propTypes.string.isRequired,
};
export default connect(mapStateToProps, null)(Header);
