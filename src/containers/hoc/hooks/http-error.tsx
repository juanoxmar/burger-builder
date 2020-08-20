import { useState, useEffect } from 'react';
import { AxiosInstance } from 'axios';

export default (axios: AxiosInstance) => {
  const [error, setError] = useState<Error>(null!);

  const reqInter = axios.interceptors.request.use((req) => {
    setError(null!);
    return req;
  });

  const resInter = axios.interceptors.response.use(
    (res) => res,
    (error) => {
      setError(error);
    }
  );

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInter);
      axios.interceptors.response.eject(resInter);
    };
  }, [reqInter, resInter, axios]);

  const errorConfirmedHandler = () => {
    setError(null!);
  };

  return { error: error, errorConfirmedHandler: errorConfirmedHandler };
};
