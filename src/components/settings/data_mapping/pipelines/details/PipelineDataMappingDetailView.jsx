import React from "react";
import { useParams } from "react-router-dom";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import DataMappingManagementSubNavigationBar
  from "components/settings/data_mapping/DataMappingManagementSubNavigationBar";
import PipelineDataMappingDetailPanel
  from "components/settings/data_mapping/pipelines/details/PipelineDataMappingDetailPanel";
import useGetAnalyticsPipelineDataMappingModelById
  from "hooks/settings/insights/analytics_data_mappings/pipelines/useGetAnalyticsPipelineDataMappingModelById";
import useComponentStateReference from "hooks/useComponentStateReference";
import {
  analyticsPipelineDataMappingHelper
} from "components/settings/data_mapping/pipelines/analyticsPipelineDataMapping.helper";
import pipelineDataMappingMetadata
  from "@opsera/definitions/constants/settings/data_mapping/pipeline/pipelineDataMapping.metadata";
import DeleteAnalyticsPipelineDataMappingActionBarButton
  from "components/settings/data_mapping/pipelines/actions/DeleteAnalyticsPipelineDataMappingActionBarButton";

function PipelineDataMappingDetailView() {
  const { pipelineDataMappingId } = useParams();
  const {
    accessRoleData,
  } = useComponentStateReference();
  const {
    analyticsPipelineDataMappingModel,
    setAnalyticsPipelineDataMappingModel,
    isLoading,
    error,
  } = useGetAnalyticsPipelineDataMappingModelById(pipelineDataMappingId);

  const getActionBar = () => {
    return (
      <ActionBarContainer>
        <div>
          <ActionBarBackButton
            path={analyticsPipelineDataMappingHelper.getManagementScreenLink()}
          />
        </div>
        <div>
          <DeleteAnalyticsPipelineDataMappingActionBarButton
            analyticsPipelineDataMappingModel={analyticsPipelineDataMappingModel}
            className={"ml-3"}
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
      metadata={pipelineDataMappingMetadata}
      dataObject={analyticsPipelineDataMappingModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <PipelineDataMappingDetailPanel
          pipelineDataMappingModel={analyticsPipelineDataMappingModel}
          setPipelineDataMappingModel={setAnalyticsPipelineDataMappingModel}
        />
      }
    />
  );
}

export default PipelineDataMappingDetailView;
