import React from 'react';

const SecondNavBaldes = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <a href="/baldes/add" className="btn btn-success" style={{ marginLeft: '20px', marginRight: '20px', fontWeight: 'bold' }}>Novo Balde</a>
        </div>
      </div>
    </nav>
  );
};

export default SecondNavBaldes;