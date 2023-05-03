import { useCallback, useEffect, useState } from "react";
import useApiState from "hooks/general/api/useApiState";

export default function useLoadData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const { apiState, apiStateFunctions } = useApiState();

  useEffect(() => {}, []);

  const loadData = useCallback(async (loadDataFunction, handleErrorFunction) => {
    try {
      apiStateFunctions.setBusyState();
      setIsLoading(true);
      setError(undefined);

      if (loadDataFunction) {
        await loadDataFunction();
        apiStateFunctions.setSuccessState();
      }
    } catch (error) {
      console.error(error);
      if (handleErrorFunction) {
        handleErrorFunction(error);
      }

      apiStateFunctions.setErrorState();
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return ({
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    error: error,
    setError: setError,
    loadData: loadData,
    apiState: apiState,
  });
}
