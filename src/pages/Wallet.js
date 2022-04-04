import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Header from './Header';
import { armazenaSiglas } from '../actions';
import Form from './Form';

class Wallet extends React.Component {
  componentDidMount() {
    const { enviaSiglas } = this.props;
    console.log(this.props);
    enviaSiglas(); // enviando a action armazenaSiglas
  }

  render() {
    return (
      <div>
        <Header />
        <Form />
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  enviaSiglas: (parametro) => dispatch(armazenaSiglas(parametro)),
});

Wallet.propTypes = {
  enviaSiglas: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);

// ( const mapState = (state) => { }) - ela funcionará da mesma maneira.
