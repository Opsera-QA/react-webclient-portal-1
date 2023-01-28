import React from "react";
import {useParams} from "react-router-dom";
import LoadingDialog from "components/common/status_notifications/loading";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import analyticsDataEntryMetadata
  from "@opsera/definitions/constants/settings/analytics_data_entries/analyticsDataEntry.metadata";
import AnalyticsDataEntryDetailPanel from "components/settings/analytics_data_entry/detail_view/AnalyticsDataEntryDetailPanel";
import AnalyticsDataEntryManagementSubNavigationBar
  from "components/settings/analytics_data_entry/AnalyticsDataEntryManagementSubNavigationBar";
import useGetAnalyticsDataEntryModelById
  from "hooks/settings/insights/analytics_data_entries/useGetAnalyticsDataEntryModelById";
import useComponentStateReference from "hooks/useComponentStateReference";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import {analyticsDataEntryHelper} from "components/settings/analytics_data_entry/analyticsDataEntry.helper";
import DeleteAnalyticsDataEntryActionBarButton
  from "components/settings/analytics_data_entry/actions/DeleteAnalyticsDataEntryActionBarButton";

function AnalyticsDataEntryDetailView() {
  const {id} = useParams();
  const {
    analyticsDataEntryModel,
    setAnalyticsDataEntryModel,
    isLoading,
    error,
  } = useGetAnalyticsDataEntryModelById(
    id,
  );
  const {
    accessRoleData,
  } = useComponentStateReference();

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton path={analyticsDataEntryHelper.getManagementScreenLink()}/>
        </div>
        <div>
          <DeleteAnalyticsDataEntryActionBarButton
            analyticsDataEntryModel={analyticsDataEntryModel}
            className={"ml-3"}
          />
        </div>
      </ActionBarContainer>
    );
  };

  const getBody = () => {
    if (isLoading === true) {
      return (
        <CenterLoadingIndicator
          type={"Analytics Data Entry"}
        />
      );
    }

    return (
      <AnalyticsDataEntryDetailPanel
        analyticsDataEntry={analyticsDataEntryModel}
      />
    );
  };

  if (!accessRoleData) {
    return (<LoadingDialog size="sm"/>);
  }

  return (
    <DetailScreenContainer
      breadcrumbDestination={"analyticsDataEntryDetailView"}
      metadata={analyticsDataEntryMetadata}
      dataObject={analyticsDataEntryModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS}
      navigationTabContainer={<AnalyticsDataEntryManagementSubNavigationBar activeTab={"analyticsDataEntryViewer"} />}
      detailPanel={getBody()}
    />
  );
}

export default AnalyticsDataEntryDetailView;