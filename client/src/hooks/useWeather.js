import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../contexts/index.js';

import { toast } from 'react-hot-toast';

import { apiFetch } from '../api/index.js';

// ------------------------------------------
const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);

  // Wrapping fetchWeatherData in useCallback
  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch('/weather/data', {
        authToken,
        method: 'GET',
      });
      console.log(data);
      setWeatherData(data);
    } catch (err) {
      setError(err.message || 'Error al obtener los datos meteorológicos.');
      toast.error(err.message || 'Error al obtener los datos meteorológicos.');
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return { weatherData, loading, error, refresh: fetchWeatherData };
};

export default useWeather;
