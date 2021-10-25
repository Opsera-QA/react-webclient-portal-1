import React, {useState, useEffect, useContext, useRef} from "react";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import axios from "axios";
import Model from "core/data_model/model";
import analyticsDataFilterMetadata from "components/settings/analytics_data_entry/analytics-data-filter-metadata";
import analyticsDataActions from "components/settings/analytics_data_entry/analytics-data-actions";
import AnalyticsDataEntryTable from "components/settings/analytics_data_entry/AnalyticsDataEntryTable";
import AnalyticsDataEntryManagementSubNavigationBar
  from "components/settings/analytics_data_entry/AnalyticsDataEntryManagementSubNavigationBar";

function AnalyticsDataEntryManagement() {
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const {getUserRecord, setAccessRoles, getAccessToken} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsDataEntries, setAnalyticsDataEntries] = useState([]);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [analyticsDataEntryFilterModel, setAnalyticsDataEntryFilterModel] = useState(new Model({...analyticsDataFilterMetadata.newObjectFields}, analyticsDataFilterMetadata, false));

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(analyticsDataEntryFilterModel, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (filterModel = analyticsDataEntryFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getRoles(filterModel, cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        toastContext.showLoadingErrorDialog(error);
        console.error(error);
      }
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getAnalyticsDataEntries = async (filterModel = analyticsDataEntryFilterModel, cancelSource = cancelTokenSource) => {
    let response = await analyticsDataActions.getAnalyticsDataEntriesV2(getAccessToken, cancelSource, filterModel);
    const analyticsDataEntryList = response?.data?.data;

    if (isMounted?.current === true && analyticsDataEntryList) {
      setAnalyticsDataEntries(analyticsDataEntryList);
      let newFilterModel = filterModel;
      newFilterModel.setData("totalCount", response?.data?.count);
      newFilterModel.setData("activeFilters", newFilterModel.getActiveFilters());
      setAnalyticsDataEntryFilterModel({...newFilterModel});
    }
  };

  const getRoles = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (isMounted?.current === true && userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.POWER_USERS_AND_SASS, userRoleAccess)) {
        await getAnalyticsDataEntries(cancelSource);
      }
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