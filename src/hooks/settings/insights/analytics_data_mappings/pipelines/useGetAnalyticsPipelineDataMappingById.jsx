import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useAnalyticsProjectDataMappingActions
  from "hooks/settings/insights/analytics_data_mappings/projects/useAnalyticsProjectDataMappingActions";

export default function useGetAnalyticsPipelineDataMappingById(analyticsProjectDataMappingId, handleErrorFunction) {
  const analyticsProjectDataMappingActions = useAnalyticsProjectDataMappingActions();
  const [analyticsProjectDataMapping, setAnalyticsProjectDataMapping] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAnalyticsProjectDataMapping(undefined);

    if (isMongoDbId(analyticsProjectDataMappingId) && loadData) {
      loadData(getAnalyticsProjectDataMappingById, handleErrorFunction).catch(() => {});
    }
  }, [analyticsProjectDataMappingId]);

  const getAnalyticsProjectDataMappingById = async () => {
    setAnalyticsProjectDataMapping(undefined);
    const response = await analyticsProjectDataMappingActions.getProjectDataMappingById(analyticsProjectDataMappingId);
    const newAnalyticsDataEntry = DataParsingHelper.parseNestedObject(response, "data.data");

    if (ObjectHelper.areObjectsEqualLodash(analyticsProjectDataMapping, newAnalyticsDataEntry) !== true) {
      setAnalyticsProjectDataMapping({...newAnalyticsDataEntry});
    }
  };

  return ({
    analyticsProjectDataMapping: analyticsProjectDataMapping,
    setAnalyticsProjectDataMapping: setAnalyticsProjectDataMapping,
    loadData: () => loadData(getAnalyticsProjectDataMappingById, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
