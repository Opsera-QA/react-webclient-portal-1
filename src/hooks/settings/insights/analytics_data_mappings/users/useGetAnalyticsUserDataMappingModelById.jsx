import {useEffect, useState} from "react";
import useGetAnalyticsUserDataMappingModel
  from "hooks/settings/insights/analytics_data_mappings/users/useGetAnalyticsUserDataMappingModel";
import useGetAnalyticsUserDataMappingById
  from "hooks/settings/insights/analytics_data_mappings/users/useGetAnalyticsUserDataMappingById";

export default function useGetAnalyticsUserDataMappingModelById(analyticsDataUserMappingId, handleErrorFunction) {
  const [analyticsUserDataMappingModel, setAnalyticsUserDataMappingModel] = useState(undefined);
  const {
    analyticsUserDataMapping,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetAnalyticsUserDataMappingById(analyticsDataUserMappingId, handleErrorFunction);
  const getAnalyticsUserDataMappingModel = useGetAnalyticsUserDataMappingModel();

  useEffect(() => {
    setAnalyticsUserDataMappingModel(undefined);

    if (analyticsUserDataMapping) {
      setAnalyticsUserDataMappingModel({...getAnalyticsUserDataMappingModel(analyticsUserDataMapping, false)});
    }
  }, [analyticsUserDataMapping]);

  return ({
    analyticsUserDataMappingModel: analyticsUserDataMappingModel,
    setAnalyticsUserDataMappingModel: setAnalyticsUserDataMappingModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
