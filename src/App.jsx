import { useState, useEffect } from 'react'
import './App.css'
import LineSelector from './LineSelector'
import Board from './Board'
function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState('countdown'); // 'countdown' o 'clock'
  const [lineaSeleccionada, setLineaSeleccionada] = useState(null); // null = Home
  const [serverTime,setServerTime] =useState();


const CABECERAS = {
  "LineaA": { 0: "Plaza de Mayo", 1: "San Pedrito" },
  "LineaB": { 0: "Leandro N. Alem", 1: "J.M. de Rosas" },
  "LineaC": { 0: "Retiro", 1: "Constitución" },
  "LineaD": { 0: "Catedral", 1: "Congreso de Tucumán" },
  "LineaE": { 0: "Retiro", 1: "Plaza de los Virreyes" },
  "LineaH": { 0: "Facultad de Derecho", 1: "Hospitales" }
};





const procesarData = (rawJson) => {
  // 1. Validaciones de seguridad para no romper el código
  if (!rawJson || !rawJson.Entity || !Array.isArray(rawJson.Entity)) {
    console.error("Los duendes dicen: El JSON no tiene el formato esperado", rawJson);
    return [];
  }

  const allStations = [];
  // Usamos el timestamp del Header de la API (es el tiempo oficial del subte)
  const serverTime = rawJson.Header?.timestamp;
  setServerTime(serverTime);

  rawJson.Entity.forEach((servicio) => {
    // Extraemos la info del servicio (ej: LineaA_A13)
    const infoLinea = servicio.Linea;
    if (!infoLinea || !infoLinea.Estaciones) return;

    // Limpiamos el nombre de la línea (De "LineaA" a solo "A")
    const nombreLinea = infoLinea.Route_Id ? infoLinea.Route_Id.replace("Linea", "") : "?";
    const direccion = infoLinea.Direction_ID

    infoLinea.Estaciones.forEach((estacion) => {
      // Calculamos el arribo real sumando el delay
      const arriboTeorico = estacion.arrival?.time || 0;
      const delay = estacion.arrival?.delay || 0;
      const arriboReal = arriboTeorico + delay;

      // FILTRO: Solo agregamos estaciones donde el tren no haya pasado hace más de 1 min
      if (arriboReal >= serverTime - 60) {
        allStations.push({
          // ID único para que React no se queje en el .map()
          uniqueId: `${servicio.ID}-${estacion.stop_id}-${arriboTeorico}`,
          linea: nombreLinea,
          nombre: estacion.stop_name,
          arribo: arriboTeorico,
          delay: delay,
          headerTime: serverTime,
          direccion :direccion
        });
      }
    });
  });

  // 2. Ordenamos por tiempo de arribo (el más cercano primero)
  /* const estacionesOrdenadas = allStations.sort((a, b) => 
    (a.arribo + a.delay) - (b.arribo + b.delay)
  ); */
 
  console.log("✅ Estaciones listas para el board:", /* estacionesOrdenadas.lengt h*/);
  return allStations;
};




const fetchSubte = async () => {
  setLoading(true);
  try {

   const URL =`/api-subte/subtes/${import.meta.env.VITE_consulta_status_subte}`;
    
    const response = await fetch(URL);
    const rawJson = await response.json();
  
    // 1. Procesamos la data usando tu lógica
    const estacionesProcesadas = procesarData(rawJson);

    // 2. GUARDAMOS en el estado (esto es lo que dispara el render)
    setData(estacionesProcesadas);
    
    console.log("Datos actualizados por los duendes:", estacionesProcesadas.length);
  } catch (error) {
    console.error("Error en el túnel:", error);
  } finally {
    setLoading(false);
  }
};


const onClickSube = (id)=>{
   setLineaSeleccionada(id);
   fetchSubte();

};



 

  
  return (
    
    <div className="board-container">
      <header className="board-header">
        <div className="logo">SUBTE TERMINAL</div>
       

  <div className="controls">
  <button onClick={fetchSubte} className="refresh-btn">ACTUALIZAR</button>
  <button 
    onClick={() => setViewMode(viewMode === 'countdown' ? 'clock' : 'countdown')}
    className="mode-switch-btn"
  >
    {viewMode === 'countdown' ? 'VER HORARIOS' : 'VER MINUTOS'}
  </button>
</div>
        

      </header>
     <div className="main-layout">
      <div className="app-container">

       <div className="layout-container">
         

      {!lineaSeleccionada ? (
        // Si no hay línea, mostramos el componente nuevo
        <LineSelector onSelectLine={(id) => onClickSube(id)} />
      ) : (
        // Si hay línea, mostramos el tablero
        <div className="board-view">
                <div className="board-view">
        <button onClick={() => setLineaSeleccionada(null)} className="back-btn">
          ← VOLVER AL MENÚ
        </button>

        <h2>TABLERO LÍNEA {lineaSeleccionada}</h2>

        {/* SENTIDO 0: Hacia una cabecera */}
        <Board 
          data={data.filter(item => item.linea === lineaSeleccionada && item.direccion === 0)} 
          direccionId={0}
          lineaNombre={lineaSeleccionada}
          viewMode={viewMode}
          timestamp={serverTime}
        />

        {/* SENTIDO 1: Hacia la otra cabecera */}
        <Board 
          data={data.filter(item => item.linea === lineaSeleccionada && item.direccion === 1)} 
          direccionId={1}
          lineaNombre={lineaSeleccionada}
          viewMode={viewMode}
          timestamp={serverTime}
        />

        

      </div>
       
        </div>
      )}

          <aside className="column-map">
        <div className="map-wrapper">

            <iframe
        width="85vw"
        height="450"
        frameBorder="0" 
        scrolling="no" 
        marginHeight="0" 
        marginWidth="0" 
        src="https://www.openstreetmap.org/export/embed.html?bbox=-58.4284%2C-34.6285%2C-58.3551%2C-34.5804&amp;layer=t"
        className="subte-map-embed"
      ></iframe>
          
        </div>
      </aside> 
         




    </div>

    </div>

        
     
     
    </div>
        <footer className="footer-credits">
      <div className="status-badge">
        <span className="blink-dot"></span> PROYECTO EN DESARROLLO (BETA)
      </div>
      <p>
        Información en tiempo real proporcionada por el 
        <strong> Programa de Datos Abiertos de la Ciudad de Buenos Aires</strong>.
      </p>
      <p className="legal">
        Desarrollado con fines educativos y de consulta.
      </p>
    </footer>
    </div>

      



  )
}

export default App