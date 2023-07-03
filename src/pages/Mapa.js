import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MainNavBar from '../components/NavBar/MainNavBar';


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
    
    
  return (
    <>
    <MainNavBar />
    <LoadScript googleMapsApiKey="AIzaSyAtPh6llWn2OSoWEDmS7oiTmtV5eDMLEiE">
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {baldes.map((balde) => (
            <Marker
              key={balde.id}
              position={{
                lat: balde.latitude,
                lng: balde.longitude,
              }}
            />
          ))}
        </GoogleMap>
    </LoadScript>
    </>
  );
};

export default Mapa;