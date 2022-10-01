import { useEffect, useState } from "react";

const loadData = async (
  loadDataFunction,
  setIsLoading,
  handleErrorFunction,
  setError,
) => {
  try {
    setIsLoading(true);
    await loadDataFunction();
  } catch (error) {
    if (handleErrorFunction) {
      handleErrorFunction(error);
    }

    setError(error);
  } finally {
    setIsLoading(false);
  }
};

export default function useLoadData(loadDataFunction, handleErrorFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async () => {
      await loadData(
        loadDataFunction,
        setIsLoading,
        handleErrorFunction,
        setError,
      );
    })();
  }, []);

  return ({
    isLoading: isLoading,
    error: error,
    loadData: loadData,
  });
}
