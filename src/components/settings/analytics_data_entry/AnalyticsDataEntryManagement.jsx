import React, {useState, useEffect} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import Model from "core/data_model/model";
import analyticsDataFilterMetadata from "components/settings/analytics_data_entry/analytics-data-filter-metadata";
import AnalyticsDataEntryTable from "components/settings/analytics_data_entry/AnalyticsDataEntryTable";
import AnalyticsDataEntryManagementSubNavigationBar
  from "components/settings/analytics_data_entry/AnalyticsDataEntryManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useAnalyticsDataEntryActions from "hooks/settings/insights/analytics_data_entries/useAnalyticsDataEntryActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import AnalyticsDataEntryRoleHelper
  from "@opsera/know-your-role/roles/settings/analytics_data_entries/analyticsDataEntryRole.helper";

export default function AnalyticsDataEntryManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsDataEntries, setAnalyticsDataEntries] = useState([]);
  const [analyticsDataEntryFilterModel, setAnalyticsDataEntryFilterModel] = useState(new Model({...analyticsDataFilterMetadata.newObjectFields}, analyticsDataFilterMetadata, false));
  const analyticsDataEntryActions = useAnalyticsDataEntryActions();
  const {
    accessRoleData,
    toastContext,
    userData,
    isMounted,
  } = useComponentStateReference();

  useEffect(() => {
    loadData(analyticsDataEntryFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });
  }, []);

  const loadData = async (filterModel = analyticsDataEntryFilterModel) => {
    try {
      if (AnalyticsDataEntryRoleHelper.canGetAnalyticsDataEntryList(userData) === true) {
        setIsLoading(true);
        await getAnalyticsDataEntries(filterModel);
      }
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getAnalyticsDataEntries = async (filterModel = analyticsDataEntryFilterModel) => {
    let response = await analyticsDataEntryActions.getAnalyticsDataEntries(filterModel);
    const analyticsDataEntryList = DataParsingHelper.parseNestedArray(response, "data.data", []);
    if (isMounted?.current === true && Array.isArray(analyticsDataEntryList)) {
      setAnalyticsDataEntries(analyticsDataEntryList);
      filterModel.setData("totalCount", response?.data?.count);
      filterModel.setData("activeFilters", filterModel.getActiveFilters());
      setAnalyticsDataEntryFilterModel({...filterModel});
    }
  };

  if (AnalyticsDataEntryRoleHelper.canGetAnalyticsDataEntryList(userData) !== true) {
    return null;
  }

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      breadcrumbDestination={"analyticsDataEntryManagement"}
      navigationTabContainer={<AnalyticsDataEntryManagementSubNavigationBar activeTab={"analyticsDataEntries"} />}
    >
      <AnalyticsDataEntryTable
        isLoading={isLoading}
        loadData={loadData}
        analyticsDataEntries={analyticsDataEntries}
        isMounted={isMounted}
        analyticsDataEntryFilterModel={analyticsDataEntryFilterModel}
        setAnalyticsDataEntryFilterModel={setAnalyticsDataEntryFilterModel}
      />
    </ScreenContainer>
  );
}
