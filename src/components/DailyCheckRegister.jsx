// components/DailyCheckRegister.jsx
import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './DailyCheckRegister.css';
import { SUPABASE_REST_URL, supabaseHeaders } from '../config/supabaseApi';

const DailyCheckRegister = ({ userId }) => {
    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [previewPhoto, setPreviewPhoto] = useState(null);

    // Función para verificar si ya registró hoy (usando RPC)
    const verificarRegistroHoy = async () => {
        try {
            console.log("🚀 ~ verificarRegistroHoy ~ userId:", userId)
            const response = await fetch(`${SUPABASE_REST_URL}/rpc/verificar_hoy`, {
                method: 'POST',
                headers: supabaseHeaders,
                body: JSON.stringify({
                    p_user_id: userId
                })
            });
            console.log("🚀 ~ verificarRegistroHoy ~ response:", response)

            const data = await response.json();
            console.log('Verificar registro:', data);

            return data
        } catch (error) {
            console.error('Error al verificar check:', error);
            return false;
        }
    };

    // Función para registrar el check en Supabase (usando RPC)
    const registrarCheck = async (checkData) => {
        console.log('Enviando a Supabase:', {
            p_user_id: checkData.userId,
            p_photo_base64: checkData.photoBase64 ? 'BASE64_PRESENTE' : 'NO_HAY_FOTO',
            p_latitude: checkData.latitude,
            p_longitude: checkData.longitude,
            p_accuracy: checkData.accuracy,
            p_ip_address: checkData.ipAddress,
            p_user_agent: checkData.userAgent
        });

        try {
            const response = await fetch(`${SUPABASE_REST_URL}/rpc/registrar_check`, {
                method: 'POST',
                headers: supabaseHeaders,
                body: JSON.stringify({
                    p_user_id: checkData.userId,
                    p_photo_base64: checkData.photoBase64,
                    p_latitude: checkData.latitude,
                    p_longitude: checkData.longitude,
                    p_accuracy: checkData.accuracy,
                    p_ip_address: checkData.ipAddress,
                    p_user_agent: checkData.userAgent
                })
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            return data;

        } catch (error) {
            console.error('Error en registrarCheck:', error);
            throw error;
        }
    };

    // Obtener coordenadas GPS
    const getCoordinates = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocalización no soportada'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                    });
                },
                (error) => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        });
    };

    // Obtener IP del usuario
    const getIpAddress = async () => {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.warn('No se pudo obtener IP:', error);
            return null;
        }
    };

    // Tomar foto y registrar
    const handleTakePhotoAndRegister = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Verificar que la cámara esté lista
            if (!webcamRef.current) {
                throw new Error('Cámara no disponible');
            }

            // 2. Tomar la foto
            const photoBase64 = webcamRef.current.getScreenshot();
            if (!photoBase64) {
                throw new Error('No se pudo capturar la foto');
            }

            // Mostrar preview
            setPreviewPhoto(photoBase64);

            // 3. Obtener coordenadas GPS
            const coordinates = await getCoordinates();

            // 4. Obtener IP
            const ipAddress = await getIpAddress();

            // 5. Registrar en Supabase
            const result = await registrarCheck({
                userId: userId,
                photoBase64: photoBase64,
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                accuracy: coordinates.accuracy,
                ipAddress: ipAddress,
                userAgent: navigator.userAgent
            });

            // 6. Procesar respuesta
            if (result.exito) {
                console.log('✅ Check registrado:', result);
                //setHasChecked(true);
                setShowCamera(false);
                setPreviewPhoto(null);
                alert('¡Registro completado con éxito!');
            } else {
                throw new Error(result.mensaje || 'Error al registrar');
            }

        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
            setPreviewPhoto(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Verificar si ya hizo check hoy al cargar el componente
    useEffect(() => {
        const checkStatus = async () => {
            if (userId) {
                const registrado = await verificarRegistroHoy();
                console.log("🚀 ~ checkStatus ~ registrado:", registrado)
                //setHasChecked(registrado);
            }
        };
        checkStatus();
    }, [userId]);

    const handleUserMedia = () => {
        setIsCameraReady(true);
        console.log('Cámara lista');
    };

    const handleUserMediaError = (error) => {
        console.error('Error de cámara:', error);
        setError('No se pudo acceder a la cámara. Verifica los permisos.');
        setIsCameraReady(false);
    };

    // Si ya hizo check
    /*if (hasChecked) {
        return (
            <div className="check-completed">
                <div className="check-badge">
                    ✅ Registro completado hoy
                </div>
            </div>
        );
    }*/

    return (
        <div className="daily-check-container">
            {!showCamera ? (
                <button
                    onClick={() => setShowCamera(true)}
                    className="register-btn"
                >
                    📸 Registrar Check Diario
                </button>
            ) : (
                <div className="camera-modal">
                    <div className="camera-container">
                        <div className="camera-header">
                            <h3>Registro Diario</h3>
                            <button onClick={() => {
                                setShowCamera(false);
                                setPreviewPhoto(null);
                                setError(null);
                            }} className="close-btn">
                                ✕
                            </button>
                        </div>

                        <div className="webcam-wrapper">
                            {!previewPhoto ? (
                                <>
                                    <Webcam
                                        ref={webcamRef}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        screenshotQuality={0.8}
                                        videoConstraints={{
                                            width: 500,
                                            height: 400,
                                            facingMode: "user"
                                        }}
                                        onUserMedia={handleUserMedia}
                                        onUserMediaError={handleUserMediaError}
                                        className="webcam-preview"
                                    />

                                    {!isCameraReady && (
                                        <div className="loading-overlay">
                                            <div className="spinner"></div>
                                            <p>Inicializando cámara...</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="photo-preview">
                                    <img src={previewPhoto} alt="Preview" />
                                    {isLoading && (
                                        <div className="loading-overlay">
                                            <div className="spinner"></div>
                                            <p>Guardando registro...</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="camera-footer">
                            {!previewPhoto ? (
                                <>
                                    <button
                                        onClick={handleTakePhotoAndRegister}
                                        className="capture-btn"
                                        disabled={!isCameraReady || isLoading}
                                    >
                                        <div className="button-inner">
                                            <div className="red-button"></div>
                                            <span>TOMAR FOTO</span>
                                        </div>
                                    </button>

                                    <p className="info-text">
                                        📸 Presiona el botón rojo para tomar la foto<br />
                                        📍 Se registrarán automáticamente tus coordenadas GPS<br />
                                        ✅ Se guardará la fecha y hora exacta
                                    </p>
                                </>
                            ) : (
                                <div className="success-message">
                                    <div className="check-animation">✅</div>
                                    <p>¡Foto tomada! Guardando registro...</p>
                                </div>
                            )}

                            {error && (
                                <div className="error-container">
                                    <p className="error-text">❌ {error}</p>
                                    <button onClick={() => setError(null)} className="retry-btn">
                                        Reintentar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyCheckRegister;