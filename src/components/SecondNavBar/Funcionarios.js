import React from 'react';


const SecondNavFuncionarios = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" 
    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
  <div className="navbar-nav ml-auto">
  <a href="/funcionarios/add" className="btn btn-success" style={{ marginLeft: '10px', marginRight: '10px', fontWeight:'bold'}}>Novo Funcionário</a>
    </div>
  </div>
</nav>
  );
};

export default SecondNavFuncionarios;