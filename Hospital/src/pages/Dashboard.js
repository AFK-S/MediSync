import React from "react";
import { Divider, Group, Text } from "@mantine/core";
import Chart from "react-apexcharts";

const Dashboard = () => {
  const bedsChartData = {
    series: [40, 60],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Male", "Female"],
      colors: ["#228be6", "#9ebed8"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: false,
          },
        },
      ],
      legend: false,
    },
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row gy-3">
          <div className="col-md-4 ">
            <div className="c-card">
              <h4>Day Satistics</h4>
              <div className="row mt-3">
                <div className="col-6 text-capitalize">
                  <p className="fw-600 ">Appointments Booked</p>
                  <h1 className="mt-2">90</h1>
                </div>
                <div className="col-6 text-capitalize">
                  <p className="fw-600 ">Appointments Completed</p>
                  <h1 className="mt-2">21</h1>
                </div>
              </div>
              <div className=" text-capitalize d-flex align-items-center mt-3 fw-600">
                <h5 className=" ">Doctors Available : </h5>
                <h5 className="ms-3">21</h5>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="c-card">
              <h4>Beds Available</h4>
              <Chart
                className="mt-3"
                options={bedsChartData.options}
                series={bedsChartData.series}
                type="donut"
                height="230"
              />
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="c-card">
              <h4>Doctors Available today</h4>
              <h1 className="text-center mt-2" style={{ fontSize: "1200%" }}>
                30
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
