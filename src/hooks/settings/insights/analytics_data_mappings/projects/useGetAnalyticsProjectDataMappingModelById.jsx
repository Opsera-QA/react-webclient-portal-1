import {useEffect, useState} from "react";
import useGetAnalyticsProjectDataMappingModel
  from "hooks/settings/insights/analytics_data_mappings/projects/useGetAnalyticsProjectDataMappingModel";
import useGetAnalyticsProjectDataMappingById
  from "hooks/settings/insights/analytics_data_mappings/projects/useGetAnalyticsProjectDataMappingById";

export default function useGetAnalyticsProjectDataMappingModelById(analyticsDataProjectMappingId, handleErrorFunction) {
  const [analyticsProjectDataMappingModel, setAnalyticsProjectDataMappingModel] = useState(undefined);
  const {
    analyticsProjectDataMapping,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetAnalyticsProjectDataMappingById(analyticsDataProjectMappingId, handleErrorFunction);
  const getAnalyticsProjectDataMappingModel = useGetAnalyticsProjectDataMappingModel();

  useEffect(() => {
    setAnalyticsProjectDataMappingModel(undefined);

    if (analyticsProjectDataMapping) {
      setAnalyticsProjectDataMappingModel({...getAnalyticsProjectDataMappingModel(analyticsProjectDataMapping, false)});
    }
  }, [analyticsProjectDataMapping]);

  return ({
    analyticsProjectDataMappingModel: analyticsProjectDataMappingModel,
    setAnalyticsProjectDataMappingModel: setAnalyticsProjectDataMappingModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
