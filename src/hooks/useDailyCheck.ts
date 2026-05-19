// hooks/useDailyCheck.ts
import { useState, useEffect } from 'react';

interface CheckData {
    photo: string | null;
    coordinates: {
        latitude: number | null;
        longitude: number | null;
        accuracy: number | null;
    };
    timestamp: string | null;
    date: string | null;
}

interface DailyCheckState {
    hasCheckedToday: boolean;
    lastCheckDate: string | null;
    checkData: CheckData;
}

export const useDailyCheck = () => {
    const [checkState, setCheckState] = useState<DailyCheckState>({
        hasCheckedToday: false,
        lastCheckDate: null,
        checkData: {
            photo: null,
            coordinates: {
                latitude: null,
                longitude: null,
                accuracy: null,
            },
            timestamp: null,
            date: null,
        },
    });

    // Verificar si hoy es día hábil (lunes a sábado)
    const isWeekday = (date: Date): boolean => {
        const day = date.getDay();
        return day >= 1 && day <= 6;
    };

    // Verificar si ya pasaron las 8:00 AM
    const isAfterEightAM = (): boolean => {
        const now = new Date();
        return now.getHours() >= 8;
    };

    // Cargar estado desde localStorage al iniciar
    useEffect(() => {
        const stored = localStorage.getItem('dailyCheck');
        const today = new Date().toISOString().split('T')[0];

        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.lastCheckDate !== today) {
                localStorage.removeItem('dailyCheck');
                setCheckState({
                    hasCheckedToday: false,
                    lastCheckDate: null,
                    checkData: {
                        photo: null,
                        coordinates: { latitude: null, longitude: null, accuracy: null },
                        timestamp: null,
                        date: null,
                    },
                });
            } else {
                setCheckState(parsed);
            }
        }
    }, []);

    // Obtener coordenadas GPS
    const getCoordinates = (): Promise<{ latitude: number; longitude: number; accuracy: number }> => {
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

    // Capturar foto desde la cámara - VERSIÓN CORREGIDA
    const capturePhoto = (videoElement: HTMLVideoElement | null): Promise<string> => {
        return new Promise((resolve, reject) => {
            if (!videoElement) {
                reject(new Error('Cámara no disponible: elemento de video no encontrado'));
                return;
            }

            // Verificar que el video tenga dimensiones válidas
            if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
                reject(new Error('Cámara no lista: el video aún no se ha inicializado'));
                return;
            }

            try {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.videoWidth;
                canvas.height = videoElement.videoHeight;
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    const photoData = canvas.toDataURL('image/jpeg', 0.8);
                    resolve(photoData);
                } else {
                    reject(new Error('No se pudo obtener el contexto del canvas'));
                }
            } catch (error) {
                reject(new Error(`Error al capturar la imagen: ${error}`));
            }
        });
    };

    // Realizar el check completo - VERSIÓN CORREGIDA
    const performCheck = async (videoRef: React.RefObject<HTMLVideoElement>): Promise<boolean> => {
        const now = new Date();
        const todayStr = now.toISOString().split('T')[0];

        // Validaciones
        if (!isWeekday(now)) {
            console.warn('Domingo: no se requiere check');
            return false;
        }

        if (!isAfterEightAM()) {
            console.warn('Antes de las 8:00 AM');
            return false;
        }

        if (checkState.hasCheckedToday) {
            console.warn('Ya se realizó el check hoy');
            return false;
        }

        try {
            // Obtener coordenadas
            const coords = await getCoordinates();

            // Esperar a que el video esté listo y capturar foto
            let photo = null;
            if (videoRef.current) {
                // Pequeña pausa para asegurar que el video esté listo
                await new Promise(resolve => setTimeout(resolve, 500));
                photo = await capturePhoto(videoRef.current);
            } else {
                throw new Error('Referencia de cámara no disponible');
            }

            // Guardar datos
            const newCheckData = {
                photo,
                coordinates: coords,
                timestamp: now.toISOString(),
                date: todayStr,
            };

            const newState = {
                hasCheckedToday: true,
                lastCheckDate: todayStr,
                checkData: newCheckData,
            };

            localStorage.setItem('dailyCheck', JSON.stringify(newState));
            setCheckState(newState);

            console.log('✅ Check completado:', {
                fecha: todayStr,
                hora: now.toLocaleTimeString(),
                coordenadas: coords,
            });

            return true;
        } catch (error) {
            console.error('Error al realizar el check:', error);
            throw error;
        }
    };

    const canCheckToday = !checkState.hasCheckedToday &&
        isWeekday(new Date()) &&
        isAfterEightAM();

    return {
        ...checkState,
        performCheck,
        canCheckToday,
        isWeekday: isWeekday(new Date()),
        isAfterEightAM: isAfterEightAM(),
    };
};