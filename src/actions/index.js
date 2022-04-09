export const submitForm = (state) => ({ type: 'SUBMIT', payload: state });

const siglas = () => ({ type: 'INICIANDO' });
const enviaSiglas = (data) => ({ type: 'LEVA_INFO', data });
const cotacaoMoedas = (data) => ({ type: 'COTACAO', data });
const enviaCotacaoMoedas = () => ({ type: 'INICIANDO' });

export const armazenaSiglas = () => async (dispatch) => {
  dispatch(siglas());
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await request.json();
  dispatch(enviaSiglas(data));
};
export const funcCotacaoMoedas = (state) => async (dispatch) => {
  dispatch(enviaCotacaoMoedas());
  const request = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await request.json();
  dispatch(cotacaoMoedas({ ...state, exchangeRates }));
};

// export const pegarStado = (state) => ({ type: 'PEGARSTATE', payload: state });
