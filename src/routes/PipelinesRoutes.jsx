import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Pipeline from "components/pipeline";
import PipelineCatalogLibrary from "components/workflow/catalog/PipelineCatalogLibrary";
import PipelineManagement from "components/workflow/pipelines/PipelineManagement";
import PipelineDetailView from "components/workflow/pipelines/pipeline_details/PipelineDetailView";
import RoleRestrictedRoute from "temp-library-components/routes/RoleRestrictedRoute";
import PipelineInstructionsManagement from "components/workflow/instructions/PipelineInstructionsManagement";
import {ROLE_LEVELS} from "components/common/helpers/role-helpers";
import PipelineInstructionsDetailView from "components/workflow/instructions/details/PipelineInstructionsDetailView";
import CustomerPipelineTemplateDetailView
  from "components/workflow/catalog/private/details/CustomerPipelineTemplateDetailView";
import PlatformPipelineTemplateDetailView
  from "components/workflow/catalog/platform/details/PlatformPipelineTemplateDetailView";

export default function PipelinesRoutes() {
  return (
    <>
      <SecureRoute path="/pipeline" component={Pipeline} />
      <SecureRoute path="/workflow/catalog/library" exact component={PipelineCatalogLibrary} />
      <SecureRoute
        path="/workflow/catalog/customer/:id"
        exact
        component={CustomerPipelineTemplateDetailView}
      />
      <SecureRoute
        path="/workflow/catalog/platform/:id"
        exact
        component={PlatformPipelineTemplateDetailView}
      />
      <SecureRoute path="/workflow/" exact component={PipelineManagement} />
      <SecureRoute path="/workflow/owner" exact component={PipelineManagement} />
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

