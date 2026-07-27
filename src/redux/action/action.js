import api from "../../api/coingecko";
import actionTypes from "./types";

// Fetch top coins
export const fetchCoins = () => {
  return (dispatch) => {
    api
      .get("/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          page: 1,
          per_page: 9,
        },
      })
      .then((response) => {
        dispatch({
          type: actionTypes.COIN_API_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.error(error);

        dispatch({
          type: actionTypes.COIN_API_ERROR,
          payload:
            error.response?.data?.status?.error_message || error.message,
        });
      });
  };
};

// Fetch exchange rates
export const fetchCoinList = () => {
  return async (dispatch) => {
    try {
      const response = await api.get("/exchange_rates");

      dispatch({
        type: actionTypes.EXCHANGE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);

      dispatch({
        type: actionTypes.EXCHANGE_ERROR,
        payload:
          error.response?.data?.status?.error_message || error.message,
      });
    }
  };
};