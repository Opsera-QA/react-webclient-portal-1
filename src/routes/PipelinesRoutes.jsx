import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Pipeline from "components/pipeline";
import PipelineCatalogLibrary from "components/workflow/catalog/PipelineCatalogLibrary";
import Pipelines from "components/workflow/pipelines/Pipelines";
import PipelineDetailView from "components/workflow/pipelines/pipeline_details/PipelineDetailView";
import RoleRestrictedRoute from "temp-library-components/routes/RoleRestrictedRoute";
import PipelineInstructionsManagement from "components/workflow/instructions/PipelineInstructionsManagement";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import PipelineInstructionsDetailView from "components/workflow/instructions/details/PipelineInstructionsDetailView";

export default function PipelinesRoutes() {
  return (
    <>
      <SecureRoute path="/pipeline" component={Pipeline} />
      <SecureRoute path="/workflow/catalog/library" exact component={PipelineCatalogLibrary} />
      <SecureRoute path="/workflow/:tab?" exact component={Pipelines} />
      <SecureRoute path="/workflow/details/:id/:tab?" exact component={PipelineDetailView} />

      <RoleRestrictedRoute
        path={"/workflow/catalog/instructions"}
        exact={true}
        component={PipelineInstructionsManagement}
        roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      />
      <RoleRestrictedRoute
        path={"/workflow/catalog/instructions/:pipelineInstructionsId"}
        exact={true}
        component={PipelineInstructionsDetailView}
        roleRequirement={ROLE_LEVELS.USERS_AND_SASS}
      />
    </>
  );
}

PipelinesRoutes.propTypes = {};

