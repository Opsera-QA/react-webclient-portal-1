import React from "react";
import { SecureRoute } from "@okta/okta-react";
import Pipeline from "components/pipeline";
import PipelineCatalogLibrary from "components/workflow/catalog/PipelineCatalogLibrary";
import Pipelines from "components/workflow/pipelines/Pipelines";
import PipelineDetailView from "components/workflow/pipelines/pipeline_details/PipelineDetailView";

export default function PipelinesRoutes() {
  return (
    <>
      <SecureRoute path="/pipeline" component={Pipeline} />
      <SecureRoute path="/workflow/catalog/library" exact component={PipelineCatalogLibrary} />
      <SecureRoute path="/workflow/:tab?" exact component={Pipelines} />
      <SecureRoute path="/workflow/details/:id/:tab?" exact component={PipelineDetailView} />
    </>
  );
}

PipelinesRoutes.propTypes = {};

