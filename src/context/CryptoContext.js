import { createContext, useCallback, useLayoutEffect, useState } from "react";
import api from "../api/coingecko";

// Create context object
export const CryptoContext = createContext({});



export const CryptoProvider = ({ children }) => {
  const [cryptoId, setCryptoId] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages] = useState(350);
  const [perPage, setPerPage] = useState(8);
  const [searchData, setSearchData] = useState([]);
  const [coinSearch, setCoinSearch] = useState("");


  

  // Fetch crypto market data
  const getCryptoData = useCallback(async () => {
    try {
      const params = {
        vs_currency: currency,
        order: sortBy,
        page,
        per_page: perPage,
      };

      if (coinSearch.trim() !== "") {
        params.ids = coinSearch;
      }

      const { data } = await api.get("/coins/markets", {
        params,
      });

      setCryptoData(data);
    } catch (error) {
      console.error("Crypto Data Error:", error);
    }
  }, [currency, sortBy, page, perPage, coinSearch]);

  // Fetch selected coin(s)
  const getCryptoId = useCallback(async () => {
    try {
      const { data } = await api.get("/coins/markets", {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          page: 1,
          per_page: 200,
        },
      });

      setCryptoId(data);
    } catch (error) {
      console.error("Crypto ID Error:", error);
    }
  }, [currency]);

  // Search coins
  const getSearchResult = async (query) => {
    try {
      const { data } = await api.get("/search", {
        params: {
          query,
        },
      });

      setSearchData(data.coins);
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  const resetFunction = () => {
    setPage(1);
    setCoinSearch("");
    setSortBy("market_cap_desc");
  };

  useLayoutEffect(() => {
  getCryptoData();
}, [getCryptoData]);

  useLayoutEffect(() => {
  getCryptoId();
}, [getCryptoId]);

  return (
    <CryptoContext.Provider
      value={{
        cryptoId,
        cryptoData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        setPerPage,
        perPage,
        searchData,
        getSearchResult,
        setCoinSearch,
        setSearchData,
        resetFunction,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};