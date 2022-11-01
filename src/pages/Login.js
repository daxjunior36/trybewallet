import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { submitForm } from '../actions';
import '../styles/login.css';

const CARACTER = 6;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      email: '',
      boleano: true,
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => { this.validacao(); });
  }

  validacao = () => {
    const { email, password } = this.state;
    const valRegex = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (valRegex && password.length >= CARACTER) {
      this.setState({
        boleano: false,
      });
    } else {
      this.setState({
        boleano: true,
      });
    }
  }

  handleClickSubimit = () => {
    const { enviaEmail, history } = this.props;
    const { email } = this.state;
    enviaEmail(email);
    history.push('/carteira');
  }
  // validarEmail = (email) => {
  //   const valido =
  //   return valido.test(email);
  // }

  // redirecionar = () => {
  //   this.setState({
  //     redirecao: true,
  //   });
  // }

  render() {
    const { boleano, email, password } = this.state;
    return (
      <div className="login_main_container">
        <div className="login_main">
          <h1> Trybe Wallet</h1>
          <input
            placeholder="E-mail"
            className="input_email login_input"
            id=""
            type="text"
            name="email"
            value={ email }
            onChange={ this.onInputChange }
            data-testid="email-input"
          />
          <input
            placeholder="Password"
            className="input_password login_input"
            id=""
            type="text"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.onInputChange }
          />

          <button
            className="button-sub"
            type="button"
            disabled={ boleano }
            onClick={ this.handleClickSubimit }
          >
            Login
          </button>

        </div>
      </div>

    );
  }
}

Login.propTypes = {
  enviaEmail: propTypes.func.isRequired,
  history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired,

};
const mapDispatchToProps = (dispatch) => ({
  enviaEmail: (parametro) => dispatch(submitForm(parametro)),
});
export default connect(null, mapDispatchToProps)(Login);
