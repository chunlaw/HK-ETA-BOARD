import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext, useMemo } from "react";
import { Line } from "react-chartjs-2";
import AppContext from "../../AppContext";
import { getWaitTime } from "../../utils";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "ETA chart against time",
    },
  },
};

export function EtaChart() {
  const { data } = useContext(AppContext);

  const _data = useMemo(
    () => ({
      labels: data.map(({ ts }) => format(ts, "HH:mm aaa")),
      datasets: [
        {
          label: "1st ETA",
          data: data
            .map(({ etas, ts }) => {
              const waitTime = getWaitTime(etas[0], ts);
              return waitTime;
            })
            .filter((wt) => wt !== ""),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "2nd ETA",
          data: data
            .map(({ etas, ts }) => {
              const waitTime = getWaitTime(etas[1], ts);
              return waitTime;
            })
            .filter((wt) => wt !== ""),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "3rd ETA",
          data: data
            .map(({ etas, ts }) => {
              const waitTime = getWaitTime(etas[2], ts);
              return waitTime;
            })
            .filter((wt) => wt !== ""),
          borderColor: "rgb(162, 255, 53)",
          backgroundColor: "rgba(162, 255, 53, 0.5)",
        },
      ],
    }),
    [data],
  );

  return <Line options={options} data={_data} />;
}

export default EtaChart;
