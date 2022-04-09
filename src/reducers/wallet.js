// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],

};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LEVA_INFO':
  {
    delete action.data.USDT;
    console.log(action.data);
    const moedas = Object.keys(action.data);
    console.log(moedas);

    return { ...state, currencies: moedas };
  }

  case 'COTACAO':
    return { ...state,
      expenses:
      [...state.expenses, action.data],
    };

  case 'INICIANDO':
  {
    return state;
  }

  default:
    return state;
  }
}
export default wallet;

// EXTRUTURA DO REDUX

// const INITIAL_STATE = {
//   state: '',
// };

// function myReducer(state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case 'NEW_ACTION':
//       return { state: action.state };
//     default:
//       return state;
//   }
// }
