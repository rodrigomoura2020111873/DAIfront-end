import React from 'react';

const MainNavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e6e6e6' }}>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav mx-auto">
          <a className="nav-item nav-link text-dark font-weight-bold" href="/" style={{ fontSize: '20px', margin: '1px' }}>Baldes</a>
          <a className="nav-item nav-link text-dark font-weight-bold" href="/mapa" style={{ fontSize: '20px', margin: '1px' }}>Mapa</a>
          <a className="nav-item nav-link text-dark font-weight-bold" href="/funcionarios" style={{ fontSize: '20px', margin: '1px' }}>Funcionários</a>
          <a className="nav-item nav-link text-dark font-weight-bold" href="/camioes" style={{ fontSize: '20px', margin: '1px' }}>Camiões</a>
        </div>
      </div>
    </nav>
  );
};

export default MainNavBar;