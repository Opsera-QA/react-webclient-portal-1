import React from "react";
import {useParams} from "react-router-dom";
import ActionBarContainer from "components/common/actions/ActionBarContainer";
import ActionBarBackButton from "components/common/actions/buttons/ActionBarBackButton";
import DetailScreenContainer from "components/common/panels/detail_view_container/DetailScreenContainer";
import pipelineTemplateMetadata from "components/admin/pipeline_templates/pipelineTemplate.metadata";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import PlatformPipelineTemplateDetailPanel
  from "components/workflow/catalog/platform/details/PlatformPipelineTemplateDetailPanel";
import useGetPlatformPipelineTemplateModelById
  from "hooks/workflow/catalog/platform/useGetPlatformPipelineTemplateModelById";

export default function PlatformPipelineTemplateDetailView() {
  const {id} = useParams();
  const {
    pipelineTemplateModel,
    setPipelineTemplateModel,
    isLoading,
  } = useGetPlatformPipelineTemplateModelById(id);

  const getActionBar = () => {
    if (pipelineTemplateModel != null) {
      return (
        <ActionBarContainer>
          <div>
            <ActionBarBackButton path={"/workflow/catalog/library"}/>
          </div>
        </ActionBarContainer>
      );
    }
  };

  return (
    <DetailScreenContainer
      breadcrumbDestination={"platformPipelineTemplateDetailView"}
      metadata={pipelineTemplateMetadata}
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"platformPipelineTemplateDetailView"}/>}
      dataObject={pipelineTemplateModel}
      isLoading={isLoading}
      actionBar={getActionBar()}
      detailPanel={
        <PlatformPipelineTemplateDetailPanel
          pipelineTemplateModel={pipelineTemplateModel}
          setPipelineTemplateModel={setPipelineTemplateModel}
        />
      }
    />
  );
}