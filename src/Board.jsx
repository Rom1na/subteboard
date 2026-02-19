// Board.jsx
import BoardRow from './BoardRow';


const Board = ({ data, direccionId, lineaNombre, viewMode,timestamp}) => {
  const CABECERAS = {
    "A": { 0: "PLAZA DE MAYO", 1: "SAN PEDRITO" },
    "B": { 0: "LEANDRO N. ALEM", 1: "J.M. DE ROSAS" },
    "C": { 0: "RETIRO", 1: "CONSTITUCION" },
    "D": { 0: "CATEDRAL", 1: "CONGRESO DE TUCUMAN" },
    "E": { 0: "RETIRO", 1: "PLAZA DE LOS VIRREYES" },
    "H": { 0: "FACULTAD DE DERECHO", 1: "HOSPITALES" }
  };

  // Si no hay datos para esta dirección, no renderizamos nada
  /* if (data.length === 0) return null; */
  
 const headerTime =timestamp; 
  const ultimaActualizacion = new Date(headerTime * 1000).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  });





  return (

    
    <div className="board-direction-section">
       
       <p className="update-tag">ÚLTIMA INFORMACIÓN: {ultimaActualizacion} HS</p>
  
      <h3 className="direction-header">
        HACIA {CABECERAS[lineaNombre]?.[direccionId]}
        
      </h3>
       {data.length === 0 &&<h3>No hay información disponible</h3>}
      <div className="board-rows-container">
        {data.map((item) => (
          <BoardRow 
            key={item.uniqueId}
            line={item.linea}
            station={item.nombre}
            arrivalUnix={item.arribo}
            headerUnix={item.headerTime}
            delaySeconds={item.delay}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;