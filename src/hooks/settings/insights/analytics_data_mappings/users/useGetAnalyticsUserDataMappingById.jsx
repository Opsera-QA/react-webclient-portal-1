import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useAnalyticsUserDataMappingActions
  from "hooks/settings/insights/analytics_data_mappings/users/useAnalyticsUserDataMappingActions";

export default function useGetAnalyticsUserDataMappingById(analyticsUserDataMappingId, handleErrorFunction) {
  const analyticsUserDataMappingActions = useAnalyticsUserDataMappingActions();
  const [analyticsUserDataMapping, setAnalyticsUserDataMapping] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAnalyticsUserDataMapping(undefined);

    if (isMongoDbId(analyticsUserDataMappingId) && loadData) {
      loadData(getAnalyticsUserDataMappingById, handleErrorFunction).catch(() => {});
    }
  }, [analyticsUserDataMappingId]);

  const getAnalyticsUserDataMappingById = async () => {
    setAnalyticsUserDataMapping(undefined);
    const response = await analyticsUserDataMappingActions.getUserDataMappingById(analyticsUserDataMappingId);
    const newAnalyticsDataEntry = DataParsingHelper.parseNestedObject(response, "data.data");

    if (ObjectHelper.areObjectsEqualLodash(analyticsUserDataMapping, newAnalyticsDataEntry) !== true) {
      setAnalyticsUserDataMapping({...newAnalyticsDataEntry});
    }
  };

  return ({
    analyticsUserDataMapping: analyticsUserDataMapping,
    setAnalyticsUserDataMapping: setAnalyticsUserDataMapping,
    loadData: () => loadData(getAnalyticsUserDataMappingById, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
