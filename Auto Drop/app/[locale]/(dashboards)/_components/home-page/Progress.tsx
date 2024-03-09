"use client";
import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface ProgressProps {
  gradientType?: string;
  height?: string;
  value?: number;
}

export default function Progress(props: ProgressProps) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  let gradientType = "blue";
  if (props.gradientType) {
    gradientType = props.gradientType;
  }
  let value = 70;

  if (props.value) {
    value = props.value;
  }
  let gradArr = ["#5bb0ff", "#3c8ef6"];
  if (gradientType === "blue") {
    gradArr = ["#5bb0ff", "#3c8ef6"];
  } else if (gradientType === "orange") {
    gradArr = ["#ff8723", "#ffb374"];
  } else if (gradientType === "green") {
    gradArr = ["#39e35e", "#a0ffb5"];
  } else if (gradientType === "red") {
    gradArr = ["#fd5c52", "#ff8877"];
  }

  useEffect(() => {
    if (chartRef.current) {
      // If there's a previous chart instance, destroy it
      if (chartInstance.current) {
        //@ts-ignore
        chartInstance.current.destroy();
      }

      var options = {
        chart: {
          height: 110,
          type: "radialBar",
        },
        series: [value],
        colors: [gradArr[0]],

        plotOptions: {
          radialBar: {
            hollow: {
              // size of the radial progress here
              size: "15%",
            },
            track: {
              background: "#f1f1f1", // Set the background color of the unprogressed part
            },
            dataLabels: {
              name: {
                show: false, // Hide the name label
              },
              value: {
                show: false, // Hide the value label
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: gradArr,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
      };

      // Create a new chart and save its instance
      //@ts-ignore
      chartInstance.current = new ApexCharts(chartRef.current, options);
      //@ts-ignore
      chartInstance.current.render();
    }

    // Clean up function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        //@ts-ignore
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <div ref={chartRef} className=" -my-12"></div>;
}
