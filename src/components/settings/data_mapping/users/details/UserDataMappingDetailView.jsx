import React from "react";
import { useParams } from "react-router-dom";
import UserDataMappingDetailPanel from "components/settings/data_mapping/users/details/UserDataMappingDetailPanel";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import DeleteAnalyticsUserDataMappingActionBarButton
  from "components/settings/data_mapping/users/actions/DeleteAnalyticsUserDataMappingActionBarButton";
import {analyticsUserDataMappingHelper} from "components/settings/data_mapping/users/analyticsUserDataMapping.helper";
import useGetAnalyticsUserDataMappingModelById
  from "hooks/settings/insights/analytics_data_mappings/users/useGetAnalyticsUserDataMappingModelById";
import userDataMappingMetadata from "@opsera/definitions/constants/settings/data_mapping/user/userDataMapping.metadata";

function UserDataMappingDetailView() {
  const { usersMappingId } = useParams();
  const {
    analyticsUserDataMappingModel,
    setAnalyticsUserDataMappingModel,
    error,
    isLoading,
  } = useGetAnalyticsUserDataMappingModelById(usersMappingId);

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton
            path={analyticsUserDataMappingHelper.getManagementScreenLink()}
          />
        </div>
        <div>
          <DeleteAnalyticsUserDataMappingActionBarButton
            analyticsUserDataMappingModel={analyticsUserDataMappingModel}
            className={"ml-3"}
          />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"userTaggingDetailView"}
      metadata={userDataMappingMetadata}
      navigationTabContainer={<DataMappingManagementSubNavigationBar activeTab={"userTagViewer"} />}
      dataObject={analyticsUserDataMappingModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <UserDataMappingDetailPanel
          userDataMappingModel={analyticsUserDataMappingModel}
          setUserDataMappingModel={setAnalyticsUserDataMappingModel}
        />
      }
    />
  );
}

export default UserDataMappingDetailView;
