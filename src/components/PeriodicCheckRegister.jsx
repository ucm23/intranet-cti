// components/PeriodicCheckRegister.jsx
import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { usePeriodicCheck } from '../hooks/usePeriodicCheck';
import './PeriodicCheckRegister.css';

const PeriodicCheckRegister = ({ config }) => {
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(null);
  
  const { 
    needsCheck, 
    performCheck, 
    timeUntilNextCheck,
    checkData,
    lastCheckTime
  } = usePeriodicCheck(config);

  // Si no necesita check, mostrar estado
  if (!needsCheck) {
    const getStatusMessage = () => {
      if (lastCheckTime) {
        return `✅ Próximo check en: ${timeUntilNextCheck}`;
      }
      return `⏰ Esperando próximo check (${timeUntilNextCheck})`;
    };
    
    return (
      <div className="check-status">
        <div className="status-badge">
          {getStatusMessage()}
        </div>
        {checkData.timestamp && (
          <div className="last-check-info">
            <small>Último check: {new Date(checkData.timestamp).toLocaleString()}</small>
          </div>
        )}
      </div>
    );
  }

  const handleStartRegistration = () => {
    setShowCamera(true);
    setError(null);
    
    if (config.requirePhoto) {
      let counter = 3;
      setCountdown(counter);
      
      const interval = setInterval(() => {
        counter--;
        setCountdown(counter);
        
        if (counter === 0) {
          clearInterval(interval);
          handleTakePhoto();
        }
      }, 1000);
    } else {
      handleTakePhoto();
    }
  };

  const handleTakePhoto = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await performCheck(config.requirePhoto ? webcamRef : undefined);
      setShowCamera(false);
      setCountdown(null);
    } catch (err) {
      setError(err.message || 'Error al realizar el registro');
      setShowCamera(false);
      setCountdown(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCamera(false);
    setCountdown(null);
    setError(null);
  };

  return (
    <div className="periodic-check-container">
      {!showCamera ? (
        <button 
          onClick={handleStartRegistration}
          className="register-btn"
        >
          📸 Realizar Check
          <small>{config.requirePhoto ? 'Se tomará foto' : 'Solo registro'}</small>
          {config.requireGPS && <small>📍 Con ubicación</small>}
        </button>
      ) : (
        <div className="camera-modal">
          <div className="camera-container">
            <div className="camera-header">
              <h3>Registro Periódico</h3>
              <button onClick={handleCancel} className="close-btn">✕</button>
            </div>
            
            {config.requirePhoto && (
              <div className="webcam-wrapper">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 400,
                    height: 300,
                    facingMode: "user"
                  }}
                  className="webcam-preview"
                />
                
                {countdown !== null && countdown > 0 && (
                  <div className="countdown-overlay">
                    <div className="countdown-number">{countdown}</div>
                  </div>
                )}
                
                {isLoading && (
                  <div className="loading-overlay">
                    <div className="spinner"></div>
                    <p>Registrando...</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="camera-footer">
              <p className="info-text">
                {config.requireGPS && "📍 Se registrarán tus coordenadas GPS\n"}
                {config.requirePhoto && "📸 Se guardará la foto\n"}
                ⏱️ Próximo check en: {timeUntilNextCheck}
              </p>
              {error && <p className="error-text">❌ {error}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodicCheckRegister;