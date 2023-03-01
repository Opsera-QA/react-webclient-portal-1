import { useCallback, useEffect, useState } from "react";

export default function useLoadData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {}, []);

  const loadData = useCallback(async (loadDataFunction, handleErrorFunction) => {
    try {
      setIsLoading(true);
      setError(undefined);

      if (loadDataFunction) {
        const response = await loadDataFunction();
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }

      setError(error);
      setIsLoading(false);
    }
  }, []);

  return ({
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    error: error,
    setError: setError,
    loadData: loadData,
  });
}
