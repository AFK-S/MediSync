// import React, { useEffect, useState } from "react";
// import "ol/ol.css";
// import Map from "ol/Map";
// import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
// import Feature from "ol/Feature";
// import Point from "ol/geom/Point";
// import { fromLonLat } from "ol/proj";
// import { Vector as VectorLayer } from "ol/layer";
// import { Vector as VectorSource } from "ol/source";
// import { Style, Icon } from "ol/style";
// import HospitalIcon from "./pin.png";
// import axios from "axios";

// const MapComponent = () => {
//   const [map, setMap] = useState(null);
//   const [hospitalVectorLayer, setHospitalVectorLayer] = useState(null);
//   const [hospitals, setHospitals] = useState([]);

//   const getCords = async () => {
//     try {
//       const { data } = await axios.get("/api/hospitals");
//       const hospitalCoords = data.map((hospital) => ({
//         latitude: hospital.coordinates.latitude,
//         longitude: hospital.coordinates.longitude,
//       }));
//       setHospitals(hospitalCoords);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const createHospitalCircle = (coordinates) => {
//     return new Feature({
//       geometry: new Point(coordinates),
//     });
//   };

//   useEffect(() => {
//     if (!map) {
//       const newMap = new Map({
//         target: "map",
//         layers: [
//           new TileLayer({
//             source: new OSM(),
//           }),
//         ],
//       });
//       setMap(newMap);

//       const hospitalVectorLayer = new VectorLayer({
//         source: new VectorSource(),
//         style: new Style({
//           image: new Icon({
//             src: HospitalIcon,
//             anchor: [0.5, 1],
//             scale: 0.05,
//           }),
//         }),
//       });
//       newMap.addLayer(hospitalVectorLayer);
//       setHospitalVectorLayer(hospitalVectorLayer);
//     }

//     getCords();
//   }, [map]);

//   useEffect(() => {
//     if (hospitalVectorLayer && hospitals.length > 0) {
//       const hospitalCircleFeatures = hospitals.map((hospital) => {
//         const coords = fromLonLat([hospital.longitude, hospital.latitude]);
//         return createHospitalCircle(coords);
//       });

//       hospitalVectorLayer.getSource().clear();
//       hospitalVectorLayer.getSource().addFeatures(hospitalCircleFeatures);

//       const avgLat =
//         hospitals.reduce((acc, curr) => acc + curr.latitude, 0) /
//         hospitals.length;
//       const avgLon =
//         hospitals.reduce((acc, curr) => acc + curr.longitude, 0) /
//         hospitals.length;

//       map.getView().setCenter(fromLonLat([avgLon, avgLat]));
//       map.getView().setZoom(12);
//     }
//   }, [hospitals, hospitalVectorLayer, map]);

//   return (
//     <div className="map-container" style={{ width: "1200px", height: "500px" }}>
//       <div
//         id="map"
//         className="map"
//         style={{ width: "1300px", height: "800px" }}
//       ></div>
//     </div>
//   );
// };

// export default MapComponent;
import React, { useEffect, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Circle from "ol/geom/Circle";
import { fromLonLat } from "ol/proj";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon, Fill, Stroke } from "ol/style";
import axios from "axios";
import { Select } from "@mantine/core";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [hospitalVectorLayer, setHospitalVectorLayer] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [disease, setDisease] = useState("");

  // const getCords = async () => {
  //   try {
  //     const { data } = await axios.get("/api/hospitals");
  //     const hospitalCoords = data.map((hospital) => ({
  //       latitude: hospital.coordinates.latitude,
  //       longitude: hospital.coordinates.longitude,
  //     }));
  //     setHospitals(hospitalCoords);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleDiseaseCoordinates = async (disease) => {
    try {
      const { data } = await axios.get(`/api/appointment/disease/${disease}`);
      console.log(data);
      const hospitalCoords = data.map((hospital) => ({
        latitude: hospital.coordinates.latitude,
        longitude: hospital.coordinates.longitude,
      }));
      setHospitals(hospitalCoords);
    } catch (error) {
      console.error(error);
    }
  };

  const createHospitalHotspot = (coordinates) => {
    const center = fromLonLat(coordinates);
    const circle = new Circle(center, 2000); // 20 meters radius
    return new Feature({
      geometry: circle,
    });
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
          fill: new Fill({
            color: "rgba(255, 0, 0, 0.1)", // Red fill with opacity
          }),
        }),
      });

      newMap.addLayer(hospitalVectorLayer);
      setHospitalVectorLayer(hospitalVectorLayer);
    }

    // getCords();
  }, [map]);

  useEffect(() => {
    if (hospitalVectorLayer) {
      hospitalVectorLayer.getSource().clear();

      if (hospitals.length > 0) {
        const hospitalHotspotFeatures = hospitals.map((hospital) => {
          const coords = [hospital.longitude, hospital.latitude];
          return createHospitalHotspot(coords);
        });

        hospitalVectorLayer.getSource().addFeatures(hospitalHotspotFeatures);

        const avgLat =
          hospitals.reduce((acc, curr) => acc + curr.latitude, 0) /
          hospitals.length;
        const avgLon =
          hospitals.reduce((acc, curr) => acc + curr.longitude, 0) /
          hospitals.length;

        map.getView().setCenter(fromLonLat([avgLon, avgLat]));
        map.getView().setZoom(12);
      } else {
        const defaultCoordinates = fromLonLat([
          76.64587720492064, 12.30806772160426,
        ]);
        map.getView().setCenter(defaultCoordinates);
        map.getView().setZoom(12);
      }
    }
  }, [hospitals, hospitalVectorLayer, map]);

  // useEffect(() => {
  //   if (hospitalVectorLayer && hospitals.length > 0) {
  //     const hospitalHotspotFeatures = hospitals.map((hospital) => {
  //       const coords = [hospital.longitude, hospital.latitude];
  //       return createHospitalHotspot(coords);
  //     });

  //     hospitalVectorLayer.getSource().clear();
  //     hospitalVectorLayer.getSource().addFeatures(hospitalHotspotFeatures);

  //     const avgLat =
  //       hospitals.reduce((acc, curr) => acc + curr.latitude, 0) /
  //       hospitals.length;
  //     const avgLon =
  //       hospitals.reduce((acc, curr) => acc + curr.longitude, 0) /
  //       hospitals.length;

  //     map.getView().setCenter(fromLonLat([avgLon, avgLat]));
  //     map.getView().setZoom(12);
  //   }
  // }, [hospitals, hospitalVectorLayer, map]);

  return (
    <>
      <Select
        my="lg"
        label="Select Disease"
        placeholder="Select Disease"
        data={[
          { label: "Influenza (Flu)", value: "flu" },
          { label: "Common Cold", value: "Common Cold" },
          { label: "COVID-19", value: "COVID-19" },
          { label: "Measles", value: "Measles" },
          { label: "Chickenpox", value: "Chickenpox" },
        ]}
        value={disease}
        onChange={(value) => {
          setDisease(value);
          handleDiseaseCoordinates(value);
        }}
      />{" "}
      <div
        className="map-container"
        style={{ width: "1300px", height: "600px" }}
      >
        <div
          id="map"
          className="map"
          style={{ width: "1300px", height: "600px" }}
        ></div>
      </div>
    </>
  );
};

export default MapComponent;
