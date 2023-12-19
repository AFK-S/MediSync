import React, { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import HospitalIcon from "./pin.png";
import axios from "axios";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [hospitalVectorLayer, setHospitalVectorLayer] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [isShown, setIsShown] = useState(false);

  const getCords = async () => {
    try {
      const { data } = await axios.get("/api/hospitals");

      const hospitalCoords = data.map((hospital) => ({
        latitude: hospital.coordinates.latitude,
        longitude: hospital.coordinates.longitude,
      }));

      setHospitals(hospitalCoords);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!map) {
      const newMap = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
      });

      setMap(newMap);

      const hospitalVectorLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          image: new Icon({
            src: HospitalIcon,
            anchor: [0.5, 1],
            scale: 0.05,
          }),
        }),
      });

      newMap.addLayer(hospitalVectorLayer);

      setHospitalVectorLayer(hospitalVectorLayer);
    }
    getCords();
  }, [map]);

  useEffect(() => {
    if (hospitalVectorLayer && hospitals.length > 0) {
      const hospitalFeatures = hospitals.map((hospital) => {
        const coords = fromLonLat([hospital.longitude, hospital.latitude]);
        return new Feature({
          geometry: new Point(coords),
          name: hospital.name,
        });
      });

      hospitalVectorLayer.getSource().clear();
      hospitalVectorLayer.getSource().addFeatures(hospitalFeatures);

      const avgLat =
        hospitals.reduce((acc, curr) => acc + curr.latitude, 0) /
        hospitals.length;
      const avgLon =
        hospitals.reduce((acc, curr) => acc + curr.longitude, 0) /
        hospitals.length;

      map.getView().setCenter(fromLonLat([avgLon, avgLat]));
      map.getView().setZoom(12);
    }
  }, [hospitals, hospitalVectorLayer, map]);

  return (
    <div className="map-container" style={{ width: "1200px", height: "500px" }}>
      <div
        id="map"
        className="map"
        style={{ width: "1300px", height: "800px" }}
      ></div>
    </div>
  );
};

export default MapComponent;
