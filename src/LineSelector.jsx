
const LineSelector = ({ onSelectLine }) => {
  const lineas = [
    { id: 'A', name: 'Línea A', color: '#00afce' },
    { id: 'B', name: 'Línea B', color: '#db0024' },
    { id: 'C', name: 'Línea C', color: '#003a8c' },
    { id: 'D', name: 'Línea D', color: '#008146' },
    { id: 'E', name: 'Línea E', color: '#6e2b85' },
    { id: 'H', name: 'Línea H', color: '#ffcc00' },
  ];

  return (
    <div className="home-screen">
      <header className="home-header">
        <h1>PRÓXIMO SUBTE</h1>
        <p>Seleccioná tu línea para ver los arribos</p>
        
      </header>

      <div className="menu-grid">
        {lineas.map((linea) => (
          <button
            key={linea.id}
            className={`menu-button btn-${linea.id}`}
            style={{ borderLeft: `10px solid ${linea.color}` }} // Un detalle de diseño
            onClick={() => onSelectLine(linea.id)}
          >
           {/*  <span className="line-letter">{linea.id}</span> */}
            <span className="line-name">{linea.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LineSelector;