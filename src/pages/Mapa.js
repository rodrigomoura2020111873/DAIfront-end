import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import MainNavBar from '../components/NavBar/MainNavBar';
import { Link } from 'react-router-dom';

const containerStyle = {
  height: '800px',
  width: '100%'
};

const center = {
  lat: 37.74611218769027,
  lng: -25.662894527435547
};

const Mapa = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/balde');
        const json = await response.json();
        setData(json.data.baldes);
        setLoading(false);
        console.log(json.data.baldes)
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

  const handleDirectionsLoad = (result) => {
    setDirections(result);
  };

  const handleDirectionsError = (error) => {
    console.error('Error fetching directions:', error);
  };

  const handleGenerateRoute = () => {
    const filteredBaldes = data.filter((balde) => balde.percentagem_lixo > 75);
    const waypoints = filteredBaldes.map((balde) => ({
      location: { lat: balde.localizacao[0], lng: balde.localizacao[1] }
    }));

    if (waypoints.length < 2) {
      alert('Não há baldes suficientes para gerar a rota de recolha.');
      return;
    }

    setDirections(null);

    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    const directionsServiceOptions = {
      destination: destination,
      origin: origin,
      waypoints: waypoints,
      travelMode: 'DRIVING'
    };

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      directionsServiceOptions,
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.error('Error generating directions:', status);
        }
      }
    );
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
                <p>Capacidade: {selectedMarker.percentagem_lixo}%</p>
                <button
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '10px',
                    border: 'none',
                    borderRadius: '5px',
                    marginRight: '10px',
                  }}
                  onClick={handleGenerateRoute}
                >
                  Gerar Rota de Recolha
                </button>
                <Link to={`/manutencao/${selectedMarker._id}/add`}>
                  <button
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      padding: '10px',
                      border: 'none',
                      borderRadius: '5px',
                      marginRight: '10px',
                    }}
                  >
                    Manutenção
                  </button>
                </Link>
                <Link to={`/recolha/${selectedMarker._id}/add`}>
                  <button
                    style={{
                      backgroundColor: 'green',
                      color: 'white',
                      padding: '10px',
                      border: 'none',
                      borderRadius: '5px',
                      marginRight: '10px',
                    }}
                  >
                    Recolhas
                  </button>
                </Link>
              </div>
            </InfoWindow>
          )}

          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions,
                polylineOptions: {
                  strokeColor: '#008000',
                  strokeOpacity: 0.7,
                  strokeWeight: 4
                }
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Mapa;