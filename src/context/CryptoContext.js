import { createContext, useCallback, useLayoutEffect, useState } from "react";

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


  const headers = {
    "x-cg-demo-api-key": process.env.REACT_APP_COINGECKO_API_KEY,
  };

  // Fetch crypto market data
  const getCryptoData = useCallback(async () => {
    try {
      let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&page=${page}&per_page=${perPage}`;

      if (coinSearch.trim() !== "") {
        url += `&ids=${coinSearch}`;
      }

      const response = await fetch(url, {
        headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setCryptoData(data);
    } catch (error) {
      console.error("Crypto Data Error:", error);
    }
  }, [currency, sortBy, page, perPage, coinSearch]);

  // Fetch selected coin(s)
  const getCryptoId = useCallback(async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&page=1&per_page=200`,
          {
            headers,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        setCryptoId(data);
      } catch (error) {
        console.error("Crypto ID Error:", error);
      }
    }, [currency]);

  // Search coins
  const getSearchResult = async (query) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
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