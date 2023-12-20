import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@mantine/core";

const Info = () => {
  const [news, setNews] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getNews = async () => {
    const newsOptions = {
      method: "GET",
      url: "https://medical-articles-live.p.rapidapi.com/journals/hidradenitis",
      headers: {
        "X-RapidAPI-Key": "c438f3d78cmshcff37074471d64ep10289bjsn3ec189e74f34",
        "X-RapidAPI-Host": "medical-articles-live.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(newsOptions);
      console.log(response.data);
      setNews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRecipes = async () => {
    const recipeOptions = {
      method: "GET",
      url: "https://edamam-recipe-search.p.rapidapi.com/api/recipes/v2",
      params: {
        type: "public",
        co2EmissionsClass: "A+",
        "field[0]": "uri",
        beta: "true",
        random: "true",
        "cuisineType[0]": "American",
        "imageSize[0]": "LARGE",
        "mealType[0]": "Breakfast",
        "health[0]": "alcohol-cocktail",
        "diet[0]": "balanced",
        "dishType[0]": "Biscuits and cookies",
      },
      headers: {
        "Accept-Language": "en",
        "X-RapidAPI-Key": "c49244b646msh4410a3f6bdddea5p14946ajsn911700e6f8e3",
        "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(recipeOptions);
      console.log(response.data);
      setRecipes(response.data.hits);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getNews(), getRecipes()]);
      setLoading(false); // Set loading to false when data is loaded
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
              style={{ maxHeight: "60vh", overflow: "auto", padding: "14px" }}
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
          <div className="col-md-6">
            <div
              className="c-card"
              style={{ maxHeight: "60vh", overflow: "auto", padding: "14px" }}
            >
              <h4 className="mb-3 ">Recipes</h4>

              {loading ? (
                <p>Loading...</p>
              ) : (
                recipes?.map((recipe) => (
                  <>
                    <div key={recipe.recipe.uri} className="my-4">
                      <h5
                        className="mb-3"
                        style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#0A0059",
                        }}
                      >
                        {recipe.recipe.label}
                      </h5>
                      <div
                        className=""
                        style={{
                          backgroundImage: `url(${recipe.recipe.image})`,
                          width: "100%",
                          height: "200px",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "10px",
                          marginBottom: "10px",
                        }}
                      ></div>

                      <a
                        href={recipe.recipe.url}
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
      <div
        className="container-fluid mt-5 p-3 d-flex align-items-center justify-content-center"
        style={{ borderRadius: "16px", color: "#fff", background: "#0a0059" }}
      >
        <h4 style={{ color: "#fff", fontWeight: "bolder" }}>
          <a
            target="_blank"
            href="https://www.myscheme.gov.in/find-scheme"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Find Your Right Scheme
          </a>
        </h4>
      </div>
    </div>
  );
};

export default Info;
