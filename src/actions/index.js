export const submitForm = (state) => ({ type: 'SUBMIT', payload: state });

const siglas = () => ({ type: 'INICIANDO' });
const enviaSiglas = (data) => ({ type: 'LEVA_INFO', data });

export const armazenaSiglas = () => async (dispatch) => {
  dispatch(siglas());
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await request.json();
  dispatch(enviaSiglas(data));
};
