import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@mantine/core";

const Info = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    const options = {
      method: "GET",
      url: "https://medical-articles-live.p.rapidapi.com/journals/hidradenitis",
      headers: {
        "X-RapidAPI-Key": "c438f3d78cmshcff37074471d64ep10289bjsn3ec189e74f34",
        "X-RapidAPI-Host": "medical-articles-live.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setNews(response.data);
      setLoading(false); // Set loading to false when data is loaded
    } catch (error) {
      console.error(error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getInfo();
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6">
            <div
              className="c-card"
              style={{ maxHeight: "40vh", overflow: "auto", padding: "14px" }}
            >
              <h4 className="mb-3">News</h4>

              {loading ? (
                <p>Loading...</p>
              ) : (
                news?.map((item) => (
                  <>
                    <div key={item.id} className="my-4">
                      <h5
                        style={{
                          fontSize: "12px",
                          fontWeight: "700",
                          color: "#0A0059",
                        }}
                      >
                        {item.source}
                      </h5>
                      <h5 style={{ fontSize: "16px", marginTop: "6px" }}>
                        {item.title}
                      </h5>
                      <p>{item.abstract}</p>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: "12px" }}
                      >
                        Read More
                      </a>
                    </div>
                    <Divider my="sm" />
                  </>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
