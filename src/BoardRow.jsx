import { useState, useEffect } from 'react';

const BoardRow = ({ station, arrivalUnix, headerUnix, delaySeconds, line, viewMode }) => {
  const [displayTime, setDisplayTime] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);

  const calculateResult = () => {
    const arrivalWithDelay = arrivalUnix + delaySeconds;

    // MODO RELOJ (HH:mm)
    if (viewMode === 'clock') {
      const date = new Date(arrivalWithDelay * 1000);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    // MODO CUENTA REGRESIVA (Lo que ya teníamos)
    const diffInSeconds = arrivalWithDelay - headerUnix;
    const minutes = Math.floor(diffInSeconds / 60);

    if (diffInSeconds < 30) return "ANDÉN";
    if (diffInSeconds < 60) return "ENTRA";
    return `${minutes} MIN`;
  };

  // El useEffect se queda igual, pero agregamos viewMode a las dependencias
  useEffect(() => {
    const newTime = calculateResult();
    if (newTime !== displayTime) {
      setIsFlipping(true);
      const timeout = setTimeout(() => {
        setDisplayTime(newTime);
        setIsFlipping(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [arrivalUnix, delaySeconds, headerUnix, viewMode]); // <--- Importante agregar viewMode acá

  // ... el resto del return igual
  return (
    <div className={`board-row line-${line}`}>
      <div className="station-name">
        <span className={`line-dot ${line}`}>{line}</span>
        {station.toUpperCase()}
      </div>
      
      <div className={`flap-container ${isFlipping ? 'flipping' : ''}`}>
        <span className="flap-number">{displayTime || "--"}</span>
      </div>
    </div>
  );
};

export default BoardRow;