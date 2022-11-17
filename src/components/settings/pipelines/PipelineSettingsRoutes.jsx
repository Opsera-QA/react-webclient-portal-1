import React from "react";
import useComponentStateReference from "hooks/useComponentStateReference";
import RoleRestrictedRoute from "temp-library-components/routes/RoleRestrictedRoute";
import PipelineSettings from "components/settings/pipelines/PipelineSettings";
import { ROLE_LEVELS } from "components/common/helpers/role-helpers";

export default function PipelineSettingsRoutes() {
  const {
    isSiteAdministrator,
    isSaasUser,
    isPowerUser,
    isOpseraAdministrator,
  } = useComponentStateReference();

  if (
    isSiteAdministrator !== true
    && isSaasUser !== true
    && isPowerUser !== true
    && isOpseraAdministrator !== true
  ) {
    return null;
  }

  return (
    <>
      {/*<RoleRestrictedRoute*/}
      {/*  path={"/settings/pipelines"}*/}
      {/*  exact={true}*/}
      {/*  component={PipelineSettings}*/}
      {/*  roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}*/}
      {/*/>*/}
      {/*<RoleRestrictedRoute*/}
      {/*  path={"/settings/pipelines/instructions"}*/}
      {/*  exact={true}*/}
      {/*  component={PipelineInstructionsManagement}*/}
      {/*  roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}*/}
      {/*/>*/}
      {/*<RoleRestrictedRoute*/}
      {/*  path={"/settings/pipelines/instructions/:pipelineInstructionsId"}*/}
      {/*  exact={true}*/}
      {/*  component={PipelineInstructionsDetailView}*/}
      {/*  roleRequirement={ROLE_LEVELS.POWER_USERS_AND_SASS}*/}
      {/*/>*/}
    </>
  );
}

