import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function Statistics() {
  const [statistic, setStatistic] = useState({});
  const [loading, setLoading] = useState(true);

  const bedsChartData = {
    series: [
      {
        name: "Patient Count",
        data: statistic?.treated_patient?.counts,
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
      labels: statistic?.treated_patient?.dates,
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
  const appointmentData = {
    series: [
      {
        name: "Patient Count",
        data: statistic?.non_treated_patient?.counts,
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
      labels: statistic?.non_treated_patient?.dates,
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

  const getStatistic = async () => {
    try {
      const response = await axios.get("api/statistic/government");
      console.log(response.data);
      setStatistic(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false in case of an error too
    }
  };

  useEffect(() => {
    getStatistic();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="row gy-3">
          <div className="col-md-6">
            <div className="c-card">
              <h3> Appointments Today</h3>
              <Chart
                className="mt-3"
                options={appointmentData.options}
                series={appointmentData.series}
                type="area"
                height="230"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="c-card">
              <div className="row">
                <div className="col-md-6">
                  <h4>Number of Hospitals</h4>
                  <h4
                    style={{
                      fontSize: "100px",

                      textAlign: "center",
                      marginTop: "60px",
                    }}
                  >
                    {statistic && statistic.hospitals_count}
                  </h4>
                </div>
                <div className="col-md-6 d-flex justify-content-centre align-items-centre flex-column">
                  <h4>Number of Doctors</h4>
                  <h3
                    style={{
                      fontSize: "100px",

                      textAlign: "center",
                      marginTop: "60px",
                    }}
                  >
                    {statistic && statistic.doctors_count}
                  </h3>
                </div>
              </div>
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
