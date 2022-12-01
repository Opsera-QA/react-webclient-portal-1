import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPipelineInstructions from "components/workflow/instructions/hooks/useGetPipelineInstructions";
import PipelineInstructionsTable from "components/workflow/instructions/PipelineInstructionsTable";
import WorkflowSubNavigationBar from "components/workflow/WorkflowSubNavigationBar";

export default function PipelineInstructionsManagement() {
  const {
    accessRoleData,
  } = useComponentStateReference();
  const {
    pipelineInstructions,
    pipelineInstructionsFilterModel,
    setPipelineInstructionsFilterModel,
    loadData,
    isLoading,
  } = useGetPipelineInstructions();

  return (
    <ScreenContainer
      navigationTabContainer={<WorkflowSubNavigationBar currentTab={"pipelineInstructionsManagement"} />}
      breadcrumbDestination={"pipelineInstructionsManagement"}
      accessRoleData={accessRoleData}
    >
      <PipelineInstructionsTable
        isLoading={isLoading}
        loadData={loadData}
        pipelineInstructions={pipelineInstructions}
        pipelineInstructionsFilterModel={pipelineInstructionsFilterModel}
        setPipelineInstructionsFilterModel={setPipelineInstructionsFilterModel}
      />
    </ScreenContainer>
  );
}

PipelineInstructionsManagement.propTypes = {};