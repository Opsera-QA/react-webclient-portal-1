import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useAnalyticsPipelineDataMappingActions
  from "hooks/settings/insights/analytics_data_mappings/pipelines/useAnalyticsPipelineDataMappingActions";

export default function useGetAnalyticsPipelineDataMappingById(analyticsPipelineDataMappingId, handleErrorFunction) {
  const analyticsPipelineDataMappingActions = useAnalyticsPipelineDataMappingActions();
  const [analyticsPipelineDataMapping, setAnalyticsPipelineDataMapping] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAnalyticsPipelineDataMapping(undefined);

    if (isMongoDbId(analyticsPipelineDataMappingId) && loadData) {
      loadData(getAnalyticsPipelineDataMappingById, handleErrorFunction).catch(() => {});
    }
  }, [analyticsPipelineDataMappingId]);

  const getAnalyticsPipelineDataMappingById = async () => {
    setAnalyticsPipelineDataMapping(undefined);
    const response = await analyticsPipelineDataMappingActions.getPipelineDataMappingById(analyticsPipelineDataMappingId);
    const newAnalyticsDataEntry = DataParsingHelper.parseNestedObject(response, "data.data");

    if (ObjectHelper.areObjectsEqualLodash(analyticsPipelineDataMapping, newAnalyticsDataEntry) !== true) {
      setAnalyticsPipelineDataMapping({...newAnalyticsDataEntry});
    }
  };

  return ({
    analyticsPipelineDataMapping: analyticsPipelineDataMapping,
    setAnalyticsPipelineDataMapping: setAnalyticsPipelineDataMapping,
    loadData: () => loadData(getAnalyticsPipelineDataMappingById, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
