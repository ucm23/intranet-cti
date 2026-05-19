import { useDailyCheck } from "../hooks/useDailyCheck";


export const CheckHistory = () => {
  const { checkData, hasCheckedToday, lastCheckDate } = useDailyCheck();
  //console.log("🚀 ~ CheckHistory ~ checkData:", checkData)

  //if (!hasCheckedToday) return null;

  return (
    <div>
      <details>
        <summary>📋 Último registro</summary>
        <div className="history-details">
          <p>📅 Fecha: {checkData.date}</p>
          <p>⏰ Hora: {checkData.timestamp && new Date(checkData.timestamp).toLocaleTimeString()}</p>
          <p>📍 Ubicación: 
            {checkData.coordinates.latitude && 
              `${checkData.coordinates.latitude.toFixed(6)}, ${checkData.coordinates.longitude.toFixed(6)}`
            }
          </p>
          <p>🎯 Precisión: {checkData.coordinates.accuracy} metros</p>
          {checkData.photo && (
            <div>
              <p>📸 Foto registrada:</p>
              <img src={checkData.photo} alt="Check" style={{ maxWidth: '200px', borderRadius: '10px' }} />
            </div>
          )}
        </div>
      </details>
    </div>
  );
};