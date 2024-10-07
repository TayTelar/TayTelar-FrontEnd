import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import "../../../assets/affiliated/sass/dashboard/_report.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Report: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 450);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data: ChartData<"line"> = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Earnings",
        data: [1200, 1500, 1800, 2000, 2200, 2500, 2800],
        borderColor: "#F2A009",
        backgroundColor: "rgba(242, 160, 9, 0.2)",
        fill: true,
      },
      {
        label: "Orders",
        data: [30, 45, 50, 65, 80, 90, 100],
        borderColor: "#008800",
        backgroundColor: "rgba(0, 136, 0, 0.2)",
        fill: true,
      },
      {
        label: "Traffic",
        data: [1000, 1500, 2000, 1800, 2200, 2400, 2700],
        borderColor: "#01B8C1",
        backgroundColor: "rgba(1, 184, 193, 0.2)",
        fill: true,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Montserrat, sans-serif",
          },
          boxWidth: 20,
          boxHeight: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
        bodyFont: {
          family: "Montserrat, sans-serif",
        },
        titleFont: {
          family: "Montserrat, sans-serif",
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "Montserrat, sans-serif",
          },
          display: !isSmallScreen, 
        },
        title: {
          display: !isSmallScreen, 
          text: 'Days of the Week',
          font: {
            family: 'Montserrat, sans-serif',
          },
        },
      },
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 3500,
        ticks: {
          font: {
            family: "Montserrat, sans-serif",
          },
          display: !isSmallScreen, 
        },
        title: {
          display: !isSmallScreen, 
          text: 'Values',
          font: {
            family: 'Montserrat, sans-serif',
          },
        },
      },
    },
  };

  return (
    <div className="report-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default Report;
