import React, { useState } from 'react';

const api = {
  key: "f86bb73e5e12b7c8a46fc1ffbd46962f",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [clima, setClima] = useState({});

  const Busca = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setClima(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const criaData = (d) => {
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let dias = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    let dia = dias[d.getDay()];
    let data = d.getDate();
    let mes = meses[d.getMonth()];
    let ano = d.getFullYear();

    return `${dia} ${data} ${mes} ${ano}`
  }

  return (
    <div className={(typeof setClima.main != "undefined") ? ((setClima.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
     <main>
        <div className="caixa-de-pesquisa">
          <input 
            type="text"
            className="barra-de-pesquisa"
            placeholder="Busque..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={Busca}
          />
        </div>
        {(typeof clima.main != "undefined") ? (
        <div>
          <div className="caixa-de-localizacao">
            <div className="localizacao">{clima.name}, {clima.sys.country}</div>
            <div className="data">{criaData(new Date())}</div>
          </div>
          <div className="caixa-do-clima">
            <div className="temp">
              {Math.round(clima.main.temp)}°c
            </div>
            <div className="clima">{clima.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
