import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";
import useAnalyticsDataEntryActions from "hooks/settings/insights/analytics_data_entries/useAnalyticsDataEntryActions";

export default function useGetAnalyticsProjectDataMappingById(analyticsDataEntryId, handleErrorFunction) {
  const analyticsDataEntryActions = useAnalyticsDataEntryActions();
  const [analyticsDataEntry, setAnalyticsDataEntry] = useState(undefined);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();

  useEffect(() => {
    setAnalyticsDataEntry(undefined);

    if (isMongoDbId(analyticsDataEntryId) && loadData) {
      loadData(getAnalyticsDataEntryById, handleErrorFunction).catch(() => {});
    }
  }, [analyticsDataEntryId]);

  const getAnalyticsDataEntryById = async () => {
    setAnalyticsDataEntry(undefined);
    const response = await analyticsDataEntryActions.getAnalyticsDataEntryById(analyticsDataEntryId);
    const newAnalyticsDataEntry = DataParsingHelper.parseNestedObject(response, "data.data");

    if (ObjectHelper.areObjectsEqualLodash(analyticsDataEntry, newAnalyticsDataEntry) !== true) {
      setAnalyticsDataEntry({...newAnalyticsDataEntry});
    }
  };

  return ({
    analyticsDataEntry: analyticsDataEntry,
    setAnalyticsDataEntry: setAnalyticsDataEntry,
    loadData: () => loadData(getAnalyticsDataEntryById, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
