// components/CameraPermissionChecker.jsx
import { useState, useEffect } from 'react';

const CameraPermissionChecker = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
      } catch (error) {
        setHasPermission(false);
        console.error('Sin permiso de cámara:', error);
      }
    };

    checkPermission();
  }, []);

  if (hasPermission === false) {
    return (
      <div className="permission-warning">
        ⚠️ Se necesita acceso a la cámara para el registro diario
        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  return null;
};

export default CameraPermissionChecker;