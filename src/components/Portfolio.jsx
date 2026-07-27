import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "right",
      labels: {
        color: "white",
        pointStyleWidth: 15,
        usePointStyle: true,
        pointStyle: "circle",
        padding: 20,
      },
    },
  },
};

export const Portfolio = () => {
  const coins = useSelector((state) => state.default.coinList);

  const [totalVolume, setTotalVolume] = useState(0);

  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Market Cap",
        data: [],
        backgroundColor: ["#0077b6", "#ef476f", "#00afb9"],
        borderColor: ["white"],
        borderWidth: 0,
        hoverOffset: 10,
        hoverBorderWidth: 4,
      },
    ],
  });

  useEffect(() => {
    if (!coins || coins.length === 0) return;

    const portfolioCoins = coins.filter((coin) =>
      ["bitcoin", "ethereum", "tether"].includes(coin.id)
    );

    const labels = portfolioCoins.map((coin) => coin.name);
    const values = portfolioCoins.map((coin) => coin.market_cap);

    setData({
      labels,
      datasets: [
        {
          label: "Market Cap",
          data: values,
          backgroundColor: ["#0077b6", "#ef476f", "#00afb9"],
          borderColor: ["white"],
          borderWidth: 0,
          hoverOffset: 10,
          hoverBorderWidth: 4,
        },
      ],
    });

    setTotalVolume(values.reduce((sum, value) => sum + value, 0));
  }, [coins]);

  return (
    <>
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-gray-100 rounded-lg shadow-lg">
        <div className="mt-3">
          <span className="text-lg text-white font-semibold pt-6 ml-8">
            Portfolio
          </span>

          <span className="text-gray-300 lg:ml-[80px] xl:ml-[120px] text-sm md:ml-[70px] sm:ml-[10px] ml-[50px]">
            Total Value
          </span>

          <span className="text-xs font-semibold text-gray-100">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalVolume)}
          </span>
        </div>

        <div className="xl:w-[240px] xl:h-[180px] md:w-[240px] md:h-[20px] xl:ml-[100px] md:ml-[70px] w-[230px] h-[170px] ml-[60px] -mt-[15px]">
          <Pie data={data} options={options} />
        </div>

        <div className="mt-7"></div>
      </div>
    </>
  );
};