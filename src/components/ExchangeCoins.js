import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinList } from "../redux/action/action";
import selectIcon from "../assets/select-icon.svg";

export const ExchangeCoins = () => {
  const dispatch = useDispatch();
  const exchangeData = useSelector((state) => state.exchange);

  const coin = exchangeData.coinList?.rates || {};

  const [text1, setText1] = useState(1);
  const [text2, setText2] = useState(1);
  const [units, setUnits] = useState("");

  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(1);

  useEffect(() => {
    if (!exchangeData.coinList?.rates) {
      dispatch(fetchCoinList());
    }
  }, [dispatch, exchangeData.coinList]);

  const convert = () => {
    if (!coin || Object.keys(coin).length === 0) return;

    const unit = Object.values(coin).find(
      (item) => Number(item.value) === Number(value2)
    );

    if (!unit) return;

    setUnits(unit.unit);

    const result = (Number(value2) / Number(value1)) * Number(text1);

    setText2(result);
  };

  return (
    <div className="px-4 py-4 font-body bg-white bg-opacity-10 backdrop-blur-md rounded-lg border border-gray-200 shadow-lg items-center">
      <h4 className="text-white text-lg font-semibold ml-5">
        Exchange Coins
      </h4>

      <div className="flex flex-row mt-8">
        <div className="pr-4 items-center">

          {/* SELL */}
          <div className="flex my-1 content-center items-center py-1 px-2 lg:ml-3">
            <p className="text-red-500 font-semibold mr-3 text-xs">Sell</p>

            <select
              value={value1}
              onChange={(e) => setValue1(Number(e.target.value))}
              className="lg:pl-8 w-[130px] h-[2rem] font-semibold rounded-lg p-1 text-white bg-gray-100 bg-opacity-30 backdrop-blur-md focus:ring-2 focus:outline-none px-5 inline-flex cursor-pointer"
            >
              {Object.values(coin).map((d) => (
                <option
                  key={d.name}
                  value={d.value}
                  className="text-gray-600"
                >
                  {d.name}
                </option>
              ))}
            </select>

            <img
              src={selectIcon}
              alt="select"
              className="w-[0.7rem] h-auto relative lg:right-[0.9rem] md:right-[1rem] sm:right-[1rem] right-4 pointer-events-none"
            />
          </div>

          {/* BUY */}
          <div className="flex my-2 content-center items-center py-1 px-2 lg:ml-3">
            <p className="text-green-300 font-semibold mr-3 text-xs">Buy</p>

            <select
              value={value2}
              onChange={(e) => setValue2(Number(e.target.value))}
              className="lg:pl-8 w-[130px] h-[2rem] font-semibold rounded-lg text-white bg-gray-100 bg-opacity-30 backdrop-blur-md focus:ring-2 focus:outline-none px-5 items-center cursor-pointer"
            >
              {Object.values(coin).map((d) => (
                <option
                  key={d.name}
                  value={d.value}
                  className="text-gray-600"
                >
                  {d.name}
                </option>
              ))}
            </select>

            <img
              src={selectIcon}
              alt="select"
              className="w-[0.7rem] h-auto relative lg:right-[0.9rem] right-[1rem] sm:right-[1rem] pointer-events-none"
            />
          </div>
        </div>

        <div className="-mt-5 mr-3 lg:pl-10">
          <label className="text-xs text-gray-200">
            Enter value
          </label>

          <div className="mr-[90px] lg:w-[90px] md:w-full sm:w-[90px] w-full py-2">
            <input
              type="number"
              value={text1}
              onChange={(e) => setText1(Number(e.target.value))}
              className="appearance-none block w-full bg-gray-100 bg-opacity-20 backdrop-blur-md text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 rounded border border-gray-400 px-3 py-1 text-sm outline-none pt-2 pb-2"
            />
          </div>

          <p className="mt-4 text-green-400 text-sm capitalize">
            {Number(text2).toFixed(6)} {units}
          </p>
        </div>
      </div>

      <div className="text-center mt-4 pb-4">
        <button
          onClick={convert}
          className="bg-gray-500 backdrop-blur-md rounded-lg text-sm py-2 px-6 text-white font-semibold hover:bg-gray-600 border border-white"
        >
          Exchange
        </button>
      </div>
    </div>
  );
};