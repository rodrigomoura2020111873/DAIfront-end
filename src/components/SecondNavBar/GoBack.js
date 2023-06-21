import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1); // Navega para a página anterior
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto">
          <button
            className="btn btn-danger"
            style={{ marginLeft: '10px', marginRight: '10px' }}
            onClick={handleVoltar}
          >
            Voltar
          </button>
        </div>
      </div>
    </nav>
  );
};

export default GoBack;
