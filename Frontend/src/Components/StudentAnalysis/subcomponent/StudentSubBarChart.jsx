import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DownloadIcon from "@mui/icons-material/Download";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

const myStyles = {
  StudAnalysisSubBar: {
    maxWidth: "600px",
    position: "relative",
  },
};

function StudentSubBarChart({ data, i, userName }) {
  // Register the plugin to all charts: to show datalabels
  ChartJS.register(ChartDataLabels);

  // Register the plugin to change the background to white before downloading img
  ChartJS.register({
    id: "bgColor",
    beforeDraw: (chartCtx) => {
      const ctx = chartCtx.canvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, chartCtx.width, chartCtx.height);
      ctx.restore();
    },
  });

  // function to download subject chart as image
  const downloadChart = () => {
    var node = document.querySelector(`.chart-${i}`);
    node.style.backgroundColor = "white";
    domtoimage.toBlob(node).then(function (blob) {
      saveAs(blob, `${userName}-subjectReport-student.png`);
    });
  };

  const options = {
    indexAxis: "y",
    bezierCurve: false,
    plugins: {
      datalabels: {
        color: "black",
        font: {
          size: "13",
        },
        //display: false,
      },
    },
    scales: {
      x: {
        // stacked: true,
        position: "top",
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        // stacked: true,
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div style={myStyles.StudAnalysisSubBar} className={`chart-${i}`}>
      <DownloadIcon
        onClick={downloadChart}
        color="primary"
        style={{
          position: "absolute",
          right: "15px",
          top: "15px",
          cursor: "pointer",
        }}
      />
      <h3 style={{ color: "whitesmoke" }}>{data.termType}</h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default StudentSubBarChart;
