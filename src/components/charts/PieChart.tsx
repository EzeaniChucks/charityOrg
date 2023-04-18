import { useEffect } from "react";
import Chart from "chart.js/auto";

let myChart: any = null;

function Example() {
  useEffect(() => {
    if (myChart !== null) {
      myChart?.destroy();
    }
    let ctx: any = document?.getElementById("myChart");

    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        datasets: [
          {
            data: [669, 144, 768, 320, 398, 1000, 249],
            label: "Income",
            // borderColor: "rgb(109, 253, 181)",
            backgroundColor: "rgb(109, 253, 181,0.5)",
            borderWidth: 2,
          },
          {
            data: [406, 1070, 464, 703, 970, 817, 234],
            label: "Debit",
            // borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(185, 12, 12, 0.5)",
            borderWidth: 2,
          },
          //   {
          //     data: [20, 24, 50, 34],
          //     label: "Pending",
          //     borderColor: "rgb(255, 205, 86)",
          //     backgroundColor: "rgb(255, 205, 86,0.5)",
          //     borderWidth: 2,
          //   },
          //   {
          //     data: [6, 20, 52, 12],
          //     label: "Rejected",
          //     borderColor: "rgb(255, 99, 132)",
          //     backgroundColor: "rgb(255, 99, 132,0.5)",
          //     borderWidth: 2,
          //   },
        ],
      },
    });
  }, []);

  return (
    <>
      {/* Bar chart */}
      <h2>Last 10 transactions</h2>
      <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
        <canvas style={{ height: "150px" }} id="myChart"></canvas>
      </div>
    </>
  );
}

export default Example;
