import React from "react";
import { useParams } from "react-router-dom";
import ProjectDataMappingDetailPanel from "components/settings/data_mapping/projects/details/ProjectDataMappingDetailPanel";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetAnalyticsProjectDataMappingModelById
  from "hooks/settings/insights/analytics_data_mappings/projects/useGetAnalyticsProjectDataMappingModelById";
import {
  analyticsProjectDataMappingHelper
} from "components/settings/data_mapping/projects/analyticsProjectDataMapping.helper";
import DeleteAnalyticsProjectDataMappingActionBarButton
  from "components/settings/data_mapping/projects/actions/DeleteAnalyticsProjectDataMappingActionBarButton";
import projectDataMappingMetadata from "../projectDataMapping.metadata";

function ProjectDataMappingDetailView() {
  const { projectMappingId } = useParams();
  const {
    analyticsProjectDataMappingModel,
    setAnalyticsProjectDataMappingModel,
    error,
    isLoading,
  } = useGetAnalyticsProjectDataMappingModelById(projectMappingId);
  const {
    accessRoleData,
  } = useComponentStateReference();

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton
            path={analyticsProjectDataMappingHelper.getManagementScreenLink()}
          />
        </div>
        <div>
          <DeleteAnalyticsProjectDataMappingActionBarButton
            analyticsProjectDataMappingModel={analyticsProjectDataMappingModel}
            relocationPath={analyticsProjectDataMappingHelper.getManagementScreenLink()}
          />
        </div>
      </ActionBarContainer>
    );
  };

  return (
    <DetailScreenContainer
      navigationTabContainer={<DataMappingManagementSubNavigationBar activeTab={"projectTagViewer"} />}
      breadcrumbDestination={"projectTaggingDetailView"}
      accessDenied={!accessRoleData?.PowerUser && !accessRoleData?.Administrator && !accessRoleData?.OpseraAdministrator &&  !accessRoleData?.SassPowerUser}
      metadata={projectDataMappingMetadata}
      dataObject={analyticsProjectDataMappingModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <ProjectDataMappingDetailPanel
          projectDataMappingModel={analyticsProjectDataMappingModel}
          setProjectDataMappingModel={setAnalyticsProjectDataMappingModel}
        />
      }
    />
  );
}

export default ProjectDataMappingDetailView;
