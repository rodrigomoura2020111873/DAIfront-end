import React from 'react';


const SecondNavFuncionarios = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
  <div className="navbar-nav ml-auto">
  <a href="/funcionarios/add" className="btn btn-primary" style={{ marginLeft: '10px', marginRight: '10px' }}>Novo Funcionário</a>
    </div>
  </div>
</nav>
  );
};

export default SecondNavFuncionarios;