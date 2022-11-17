import React from "react";
import ScreenContainer from "components/common/panels/general/ScreenContainer";
import useComponentStateReference from "hooks/useComponentStateReference";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import PipelineInstructionsSubNavigationBar
  from "components/workflow/instructions/PipelineInstructionsSubNavigationBar";
import useGetPipelineInstructions from "components/workflow/instructions/hooks/useGetPipelineInstructions";
import PipelineInstructionTable from "components/workflow/instructions/PipelineInstructionTable";

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
      navigationTabContainer={<PipelineInstructionsSubNavigationBar activeTab={"pipelineInstructionsManagement"} />}
      breadcrumbDestination={"pipelineInstructionsManagement"}
      accessRoleData={accessRoleData}
      roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      // pageDescription={`
      //   The Opsera Scripts Library enables user to register a new script, give it a name and apply RBAC. The script can then be referenced in the a pipeline step.
      // `}
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