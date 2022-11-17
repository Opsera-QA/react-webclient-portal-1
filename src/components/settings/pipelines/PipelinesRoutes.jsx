import React from "react";
import RoleRestrictedRoute from "temp-library-components/routes/RoleRestrictedRoute";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";
import PipelineInstructionsManagement from "components/workflow/instructions/PipelineInstructionsManagement";
import PipelineInstructionsDetailView from "components/workflow/instructions/details/PipelineInstructionsDetailView";

export default function PipelinesRoutes() {
  return (
    <>
      <RoleRestrictedRoute
        path={"/workflow/instructions"}
        exact={true}
        component={PipelineInstructionsManagement}
        roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={"/workflow/instructions/:pipelineInstructionsId"}
        exact={true}
        component={PipelineInstructionsDetailView}
        roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}
      />
    </>
  );
}

