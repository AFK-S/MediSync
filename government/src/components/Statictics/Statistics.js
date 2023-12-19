import React from "react";
import Chart from "react-apexcharts";

function Statistics() {
  const bedsChartData = {
    series: [
      {
        name: "Patient Count",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Patients",
        align: "left",
      },
      labels: [
        "01 Jan 2001",
        "02 Jan 2001",
        "03 Jan 2001",
        "04 Jan 2001",
        "05 Jan 2001",
        "06 Jan 2001",
        "07 Jan 2001",
        "08 Jan 2001",
        "09 Jan 2001",
      ],
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row gy-3">
          <div className="col-md-6">
            <div className="c-card">
              <h3> Appointments Today</h3>
              <Chart
                className="mt-3"
                options={bedsChartData.options}
                series={bedsChartData.series}
                type="area"
                height="230"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="c-card">
              <h3 className="text-center">Number of Live Hospitals</h3>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="c-card ">
              <h3 className="text-center">Number of Patients Treated</h3>
              <Chart
                className="mt-3"
                options={bedsChartData.options}
                series={bedsChartData.series}
                type="bar"
                height="380"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
