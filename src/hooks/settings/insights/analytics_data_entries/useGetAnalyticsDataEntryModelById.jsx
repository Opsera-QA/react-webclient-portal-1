import useGetAnalyticsDataEntryById from "hooks/settings/insights/analytics_data_entries/useAnalyticsDataEntryById";
import useGetAnalyticsDataEntryModel from "components/settings/analytics_data_entry/useGetAnalyticsDataEntryModel";
import {useEffect, useState} from "react";

export default function useGetAnalyticsDataEntryModelById(analyticsDataEntryId, handleErrorFunction) {
  const [analyticsDataEntryModel, setAnalyticsDataEntryModel] = useState(undefined);
  const {
    analyticsDataEntry,
    isLoading,
    error,
    setError,
    loadData,
  } = useGetAnalyticsDataEntryById(analyticsDataEntryId, handleErrorFunction);
  const getAnalyticsDataEntryModel = useGetAnalyticsDataEntryModel();

  useEffect(() => {
    setAnalyticsDataEntryModel(undefined);

    if (analyticsDataEntry) {
      setAnalyticsDataEntryModel({...getAnalyticsDataEntryModel(analyticsDataEntry, false)});
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
