import React, {useState, useEffect, useRef} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import Model from "core/data_model/model";
import analyticsDataFilterMetadata from "components/settings/analytics_data_entry/analytics-data-filter-metadata";
import AnalyticsDataEntryTable from "components/settings/analytics_data_entry/AnalyticsDataEntryTable";
import AnalyticsDataEntryManagementSubNavigationBar
  from "components/settings/analytics_data_entry/AnalyticsDataEntryManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useAnalyticsDataEntryActions from "hooks/settings/insights/analytics_data_entries/useAnalyticsDataEntryActions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

function AnalyticsDataEntryManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsDataEntries, setAnalyticsDataEntries] = useState([]);
  const isMounted = useRef(false);
  const [analyticsDataEntryFilterModel, setAnalyticsDataEntryFilterModel] = useState(new Model({...analyticsDataFilterMetadata.newObjectFields}, analyticsDataFilterMetadata, false));
  const analyticsDataEntryActions = useAnalyticsDataEntryActions();
  const {
    accessRoleData,
    toastContext,
  } = useComponentStateReference();

  useEffect(() => {
    isMounted.current = true;

    loadData(analyticsDataEntryFilterModel).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterModel = analyticsDataEntryFilterModel) => {
    try {
      setIsLoading(true);

      if (meetsRequirements(ROLE_LEVELS.POWER_USERS_AND_SASS, accessRoleData)) {
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
    const analyticsDataEntryList = DataParsingHelper.parseNestedArray(response, "data.data");

    if (isMounted?.current === true && analyticsDataEntryList) {
      setAnalyticsDataEntries(analyticsDataEntryList);
      filterModel.setData("totalCount", response?.data?.count);
      filterModel.setData("activeFilters", filterModel.getActiveFilters());
      setAnalyticsDataEntryFilterModel({...filterModel});
    }
  };

  return (
    <ScreenContainer
      isLoading={!accessRoleData}
      breadcrumbDestination={"analyticsDataEntryManagement"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
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


export default AnalyticsDataEntryManagement;