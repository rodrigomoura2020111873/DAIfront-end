import React from 'react';
import styled from 'styled-components';


const MainNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="#">Home</a>
      <a className="nav-item nav-link" href="#">Mapa</a>
      <a className="nav-item nav-link" href="#">Funcionários</a>
      <a className="nav-item nav-link" href="#">Camioes</a>
    </div>
  </div>
</nav>
  );
};

export default MainNavBar;