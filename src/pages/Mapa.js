import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import MainNavBar from '../components/NavBar/MainNavBar';


const containerStyle = {
  height: '800px',
  width: '100%'
};

const center = {
  lat: 0, //37.74611218769027,
  lng: 0 //-25.662894527435547
};

const Mapa = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8080/api/balde');
            const json = await response.json();
            setData(json.data.baldes);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

      const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
      };
    
      const handleCloseInfoWindow = () => {
        setSelectedMarker(null);
      };
    
    
  return (
    <>
    <MainNavBar />
    <LoadScript googleMapsApiKey="AIzaSyAtPh6llWn2OSoWEDmS7oiTmtV5eDMLEiE">
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
      {data.map((balde) => (
            <Marker 
            key={balde.id} 
            position={{ lat: balde.localizacao[0], lng: balde.localizacao[1] }}
            onClick={() => handleMarkerClick(balde)}
             />
          ))}
      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.localizacao[0], lng: selectedMarker.localizacao[1] }}
          onCloseClick={handleCloseInfoWindow}
        >
          <div>
            <h6>{selectedMarker.conselho}</h6>
            <h6>{selectedMarker.freguesia}</h6>
            <p>Latitude: {selectedMarker.localizacao[0]} Longitude: {selectedMarker.localizacao[1]}</p>
            <p>Tipo: {selectedMarker.tipo}</p>
            <p>Capacidade: {selectedMarker.percentagem_lixo} % </p>
          </div>
        </InfoWindow>
      )}
        </GoogleMap>
    </LoadScript>
    </>
  );
};

export default Mapa;