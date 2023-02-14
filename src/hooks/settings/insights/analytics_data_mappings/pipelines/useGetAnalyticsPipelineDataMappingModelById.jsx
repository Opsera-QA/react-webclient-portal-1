import {useEffect, useState} from "react";
import useGetAnalyticsPipelineDataMappingModel
  from "hooks/settings/insights/analytics_data_mappings/pipelines/useGetAnalyticsPipelineDataMappingModel";
import useGetAnalyticsPipelineDataMappingById
  from "hooks/settings/insights/analytics_data_mappings/pipelines/useGetAnalyticsPipelineDataMappingById";

export default function useGetAnalyticsPipelineDataMappingModelById(analyticsDataPipelineMappingId, handleErrorFunction) {
  const [analyticsPipelineDataMappingModel, setAnalyticsPipelineDataMappingModel] = useState(undefined);
  const {
    analyticsPipelineDataMapping,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetAnalyticsPipelineDataMappingById(analyticsDataPipelineMappingId, handleErrorFunction);
  const getAnalyticsPipelineDataMappingModel = useGetAnalyticsPipelineDataMappingModel();

  useEffect(() => {
    setAnalyticsPipelineDataMappingModel(undefined);

    if (analyticsPipelineDataMapping) {
      setAnalyticsPipelineDataMappingModel({...getAnalyticsPipelineDataMappingModel(analyticsPipelineDataMapping, false)});
    }
  }, [analyticsPipelineDataMapping]);

  return ({
    analyticsPipelineDataMappingModel: analyticsPipelineDataMappingModel,
    setAnalyticsPipelineDataMappingModel: setAnalyticsPipelineDataMappingModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
