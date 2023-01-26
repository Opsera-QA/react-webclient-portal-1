import {useEffect, useState} from "react";
import modelHelpers from "components/common/model/modelHelpers";
import useGetAnalyticsDataEntryById from "hooks/settings/insights/analytics_data_entries/useAnalyticsDataEntryById";
import analyticsDataEntryMetadata
  from "@opsera/definitions/constants/settings/analytics_data_entries/analyticsDataEntry.metadata";

export default function useGetAnalyticsDataEntryModelById(analyticsDataEntryId, handleErrorFunction) {
  const [analyticsDataEntryModel, setAnalyticsDataEntryModel] = useState(undefined);
  const {
    analyticsDataEntry,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetAnalyticsDataEntryById(analyticsDataEntryId, handleErrorFunction);

  useEffect(() => {
    setAnalyticsDataEntryModel(undefined);

    if (analyticsDataEntry) {
      setAnalyticsDataEntryModel({...modelHelpers.parseObjectIntoModel(analyticsDataEntry, analyticsDataEntryMetadata)});
    }
  }, [analyticsDataEntry]);

  return ({
    analyticsDataEntryModel: analyticsDataEntryModel,
    setAnalyticsDataEntryModel: setAnalyticsDataEntryModel,
    loadData: loadData,
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
