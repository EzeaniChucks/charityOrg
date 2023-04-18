import { useEffect } from "react";
import Chart from "chart.js/auto";

let myChart: any = null;

function Doughnut() {
  useEffect(() => {
    if (myChart !== null) {
      myChart?.destroy();
    }
    let ctx: any = document?.getElementById("myChartDoughnut");

    myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Accepted", "Pending", "Rejected"],
        datasets: [
          {
            data: [70, 10, 6],
            borderColor: [
              "rgb(75, 192, 192)",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
            backgroundColor: [
              "rgb(75, 192, 192 )",
              "rgb(255, 205, 86)",
              "rgb(255, 99, 132)",
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    });
  }, []);

  return (
    <>
      {/* Doughnut chart */}
      <h2 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">
        Last 10 transactions
      </h2>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto  shadow-xl pb-2">
          <canvas id="myChartDoughnut"></canvas>
        </div>
      </div>
    </>
  );
}

export default Doughnut;
