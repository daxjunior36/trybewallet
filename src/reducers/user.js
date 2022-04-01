const INITIAL_STATE = { email: '' };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SUBMIT':
    return { email: action.payload };
  default:
    return state;
  }
};

export default user;
// Esse reducer será responsável por tratar as informações da pessoa usuária
