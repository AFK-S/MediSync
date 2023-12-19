// MapComponent.js
import React, { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke, Circle, Fill } from "ol/style";

const MapComponent = ({ location, hospitalLocation }) => {
  console.log("Passed location:", location);
  console.log("Passed hospital location:", hospitalLocation);
  const [startLatitude, setStartLatitude] = useState(location?.latitude);
  const [startLongitude, setStartLongitude] = useState(location?.longitude);
  const [endLatitude, setEndLatitude] = useState(hospitalLocation?.latitude);
  const [endLongitude, setEndLongitude] = useState(hospitalLocation?.longitude);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [map, setMap] = useState(null);
  const [hospitals] = useState({
    latitude: hospitalLocation?.latitude,
    longitude: hospitalLocation?.longitude,
  });

  const calculateRoute = async (startCoords, endCoords) => {
    try {
      const apiKey = "5b3ce3597851110001cf62487657974046f7450b924af3f87910c744"; // Replace with your actual OpenRouteService API key
      const routeUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startCoords}&end=${endCoords}&options={"radiuses":[1000,1000]}`;

      console.log("API Request URL:", routeUrl);

      const response = await fetch(routeUrl);
      const data = await response.json();

      if (response.ok && data.features && data.features.length > 0) {
        const routeCoordinates = data.features[0].geometry.coordinates;
        const distanceInKm =
          data.features[0].properties.segments[0].distance / 1000;
        const durationInSeconds =
          data.features[0].properties.segments[0].duration;

        return {
          coordinates: routeCoordinates,
          distance: distanceInKm.toFixed(2),
          duration: Math.round(durationInSeconds / 60),
        };
      } else {
        console.error("Error in API response:", data);
        throw new Error("No features found in the API response.");
      }
    } catch (error) {
      console.error("Error fetching route:", error.message);
      throw new Error(`Error fetching route: ${error.message}`);
    }
  };

  const handleCalculateRoute = async () => {
    const startCoordinates = `${startLongitude},${startLatitude}`;
    const endCoordinates = `${endLongitude},${endLatitude}`;
    try {
      const routeDetails = await calculateRoute(
        startCoordinates,
        endCoordinates
      );
      console.log("Route details:", routeDetails);

      const newMap = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: fromLonLat(routeDetails.coordinates[0]),
          zoom: 12,
        }),
      });

      const startPoint = new Feature(
        new Point(fromLonLat(routeDetails.coordinates[0]))
      );
      const endPoint = new Feature(
        new Point(
          fromLonLat(
            routeDetails.coordinates[routeDetails.coordinates.length - 1]
          )
        )
      );

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [startPoint, endPoint],
        }),
      });

      newMap.addLayer(vectorLayer);

      const route = new Feature(
        new LineString(routeDetails.coordinates).transform(
          "EPSG:4326",
          "EPSG:3857"
        )
      );

      const routeLayer = new VectorLayer({
        source: new VectorSource({
          features: [route],
        }),
        style: new Style({
          stroke: new Stroke({
            color: "blue",
            width: 5,
          }),
        }),
      });

      newMap.addLayer(routeLayer);

      setDistance(routeDetails.distance);
      setDuration(routeDetails.duration);

      setMap(newMap);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (map && hospitals.length > 0) {
      const hospitalFeatures = hospitals.map((hospital) => {
        const coords = fromLonLat([hospital.longitude, hospital.latitude]);
        console.log("Coordinates:", coords);
        return new Feature({
          geometry: new Point(coords),
          name: hospital.name,
        });
      });
      console.log("Hospital features:", hospitalFeatures);

      const hospitalVectorLayer = new VectorLayer({
        source: new VectorSource({
          features: hospitalFeatures,
        }),
        style: new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({ color: "red" }),
            stroke: new Stroke({ color: "white", width: 2 }),
          }),
        }),
      });

      console.log("Hospital vector layer:", hospitalVectorLayer);
      map.addLayer(hospitalVectorLayer);
    }
  }, [map, hospitals]);

  useEffect(() => {
    return () => {
      if (map) {
        map.getLayers().clear();
        map.setTarget(null);
      }
    };
  }, [map]);

  useEffect(() => {
    if (
      startLatitude !== undefined &&
      startLongitude !== undefined &&
      endLatitude !== undefined &&
      endLongitude !== undefined
    ) {
      handleCalculateRoute();
    }
  }, [startLatitude, startLongitude, endLatitude, endLongitude]);

  useEffect(() => {
    setStartLatitude(location?.latitude);
    setStartLongitude(location?.longitude);
  }, [location]);

  useEffect(() => {
    setEndLatitude(hospitalLocation?.latitude);
    setEndLongitude(hospitalLocation?.longitude);
  }, [hospitalLocation]);

  return (
    <div>
      {distance !== null && duration !== null && (
        <div className="route-details">
          <p>Distance: {distance} km</p>
          <p>Estimated Travel Time: {duration} minutes</p>
        </div>
      )}
      <div
        id="map"
        style={{
          width: "700px",
          height: "600px",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      ></div>
    </div>
  );
};

export default MapComponent;
