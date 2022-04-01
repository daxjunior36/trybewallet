import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import submitForm from '../actions';

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
    const { email, password } = this.props;
    const { boleano } = this.state;
    return (
      <div>
        email
        <input
          className="input_email"
          id=""
          type="text"
          name="email"
          value={ email }
          onChange={ this.onInputChange }
          data-testid="email-input"
        />
        password
        <input
          className="input_password"
          id=""
          type="text"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ this.onInputChange }
        />
        <div className="button-sub">
          <button
            type="button"
            disabled={ boleano }
            onClick={ this.handleClickSubimit }
          >
            Entrar
          </button>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  email: propTypes.string.isRequired,
  password: propTypes.string.isRequired,
  enviaEmail: propTypes.func.isRequired,
  history: propTypes.shape.isRequired,

};
const mapDispatchToProps = (dispatch) => ({
  enviaEmail: (parametro) => dispatch(submitForm(parametro)),
});
export default connect(null, mapDispatchToProps)(Login);

// const mapDispatchToProps = (dispatch) => ({

// });

// export default connect(null, mapDispatchToProps)(Login);
