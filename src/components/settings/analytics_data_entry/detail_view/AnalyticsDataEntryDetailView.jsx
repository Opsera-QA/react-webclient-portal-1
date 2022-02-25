import React, {useContext, useState, useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import {AuthContext} from "contexts/AuthContext";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import axios from "axios";
import {meetsRequirements, ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarDeleteButton2 from "components/common/actions/buttons/ActionBarDeleteButton2";
import analyticsDataActions from "components/settings/analytics_data_entry/analytics-data-actions";
import {analyticsDataEntryMetadata} from "components/settings/analytics_data_entry/analyticsDataEntry.metadata";
import AnalyticsDataEntryDetailPanel from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryDetailPanel";
import AnalyticsDataEntryManagementSubNavigationBar
  from "components/settings/analytics_data_entry/AnalyticsDataEntryManagementSubNavigationBar";
import ScreenContainer from "components/common/panels/general/ScreenContainer";

function AnalyticsDataEntryDetailView() {
  const {id} = useParams();
  const toastContext = useContext(DialogToastContext);
  const [accessRoleData, setAccessRoleData] = useState(undefined);
  const { getUserRecord, setAccessRoles, getAccessToken } = useContext(AuthContext);
  const [analyticsDataEntry, setAnalyticsDataEntry] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [canDelete, setCanDelete] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await getAnalyticsDataEntry(cancelSource);
    }
    catch (error) {
      if (isMounted.current === true && !error?.error?.message?.includes(404)) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    }
    finally {
      if (isMounted.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getAnalyticsDataEntry = async (cancelSource = cancelTokenSource) => {
    const user = await getUserRecord();
    const userRoleAccess = await setAccessRoles(user);

    if (userRoleAccess) {
      setAccessRoleData(userRoleAccess);

      if (meetsRequirements(ROLE_LEVELS.POWER_USERS, userRoleAccess)) {
        const response = await analyticsDataActions.getAnalyticsDataEntryV2(getAccessToken, cancelSource, id);
        const analyticsData = response?.data;

        if (isMounted.current === true && analyticsData) {
          setAnalyticsDataEntry(new Model(analyticsData, analyticsDataEntryMetadata, false));
          setCanDelete(meetsRequirements(ROLE_LEVELS.ADMINISTRATORS, userRoleAccess) || analyticsData.owner === user?._id);
        }
      }
    }
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  const getActionBar = () => {
    if (analyticsDataEntry != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={`/settings/analytics-data-entries`} />
          </div>
          <div>
            {canDelete && <ActionBarDeleteButton2 relocationPath={`/settings/analytics-data-entries`} dataObject={analyticsDataEntry} handleDelete={deleteOrganization}/>}
          </div>
        </ActionBarContainer>
      );
    }
  };

  const deleteOrganization = () => {
    return analyticsDataActions.deleteAnalyticsDataEntryV2(getAccessToken, cancelTokenSource, analyticsDataEntry?.getData("_id"));
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"analyticsDataEntryDetailView"}
      metadata={analyticsDataEntryMetadata}
      dataObject={analyticsDataEntry}
      isLoading={isLoading}
      actionBar={getActionBar()}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS}
      navigationTabContainer={<AnalyticsDataEntryManagementSubNavigationBar activeTab={"analyticsDataEntryViewer"} />}
      detailPanel={<AnalyticsDataEntryDetailPanel analyticsDataEntry={analyticsDataEntry} />}
    />
  );
}

export default AnalyticsDataEntryDetailView;