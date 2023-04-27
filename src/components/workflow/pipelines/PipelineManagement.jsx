import React, {useEffect} from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";
import PipelineTableCardView from "components/workflow/pipelines/PipelineTableCardView";
import PipelinesHelpDocumentation from "../../common/help/documentation/pipelines/PipelinesHelpDocumentation";
import auditLogTypeConstants from "@opsera/definitions/constants/audit-logs/types/auditLogType.constants";
import useGetPipelines from "hooks/workflow/pipelines/useGetPipelines";

const pipelineFields = [
  "type",
  "_id",
  "name",
  "owner",
  "workflow.last_step",
  "workflow.run_count",
  "workflow.last_run",
  "createdAt",
  "updatedAt",
];

function PipelineManagement() {
  const {
    pipelines,
    isLoading,
    error,
    pipelineFilterModel,
    setPipelineFilterModel,
    loadData,
    subscribedPipelineIds
  } = useGetPipelines(
    pipelineFields,
    true,
    true,
  );

  useEffect(() => {}, []);

  return (
    <ScreenContainer
      breadcrumbDestination={"pipelines"}
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"pipelines"}/>}
      pageDescription={"Select a Pipeline to view details."}
      auditLogType={auditLogTypeConstants.USER_ACTIVITY_LOG_TYPES.PIPELINE}
      helpComponent={
        <PipelinesHelpDocumentation/>
      }
    >
      <PipelineTableCardView
        pipelines={pipelines}
        isLoading={isLoading}
        pipelineFilterModel={pipelineFilterModel}
        setPipelineFilterModel={setPipelineFilterModel}
        loadData={loadData}
        subscribedPipelineIds={subscribedPipelineIds}
      />
    </ScreenContainer>
  );

}

export default PipelineManagement;
