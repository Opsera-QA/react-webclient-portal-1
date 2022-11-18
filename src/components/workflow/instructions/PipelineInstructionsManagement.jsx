import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import useGetPipelineInstructions from "components/workflow/instructions/hooks/useGetPipelineInstructions";
import PipelineInstructionTable from "components/workflow/instructions/PipelineInstructionTable";
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
      <PipelineInstructionTable
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