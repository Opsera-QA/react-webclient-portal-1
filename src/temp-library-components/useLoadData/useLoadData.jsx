import { useState } from "react";

export default function useLoadData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const loadData = async (loadDataFunction) => {
    try {
      setIsLoading(true);
      await loadDataFunction();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return ({
    isLoading: isLoading,
    error: error,
    loadData: loadData,
  });
}
