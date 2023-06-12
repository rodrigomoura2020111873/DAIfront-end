import React from 'react';
import styled from 'styled-components';


const MainNavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link" href="#">Home</a>
      <a class="nav-item nav-link" href="#">Mapa</a>
      <a class="nav-item nav-link" href="#">Funcionários</a>
      <a class="nav-item nav-link" href="#">Camioes</a>
    </div>
  </div>
</nav>
  );
};

export default MainNavBar;