import {faBallotCheck, faDraftingCompass, faHexagon} from "@fortawesome/pro-light-svg-icons";
import {pipelinesPaths} from "components/workflow/pipelines.paths";

export const pipelinesTrails = {};

// Catalog
pipelinesTrails.catalog = {
  parent: undefined,
  name: "catalog",
  path: pipelinesPaths.catalog,
  title: "Pipeline Catalogs",
  linkText: "Pipeline Catalogs",
  icon: faHexagon,
  pageDescription: "To begin building your pipeline, choose one of the pipeline templates provided in the Pipeline Marketplace or Shared Templates Catalogs.",
};

pipelinesTrails.customerPipelineTemplateDetailView = {
  parent: "pipelines",
  name: "customerPipelineTemplateDetailView",
  path: pipelinesPaths.customerPipelineTemplateDetailView,
  title: "Pipeline Template Details",
  linkText: "Pipeline Template Details",
  icon: faHexagon,
};

// Pipelines
pipelinesTrails.pipelines = {
  parent: undefined,
  name: "pipelines",
  path: pipelinesPaths.pipelines,
  title: "Pipelines",
  linkText: "Pipelines",
  icon: faDraftingCompass,
};

pipelinesTrails.pipelineDetailView = {
  parent: "pipelines",
  name: "pipelineDetailView",
  path: pipelinesPaths.pipelineDetailView,
  title: "Pipeline Details",
  linkText: "Pipeline Details",
  icon: faDraftingCompass,
};

// Pipeline Instructions
pipelinesTrails.pipelineInstructionsManagement = {
  parent: "pipelineSettings",
  name: "pipelineInstructionsManagement",
  path: pipelinesPaths.pipelineInstructionsManagement,
  title: "Pipeline Instructions",
  linkText: "Pipeline Instructions",
  icon: faBallotCheck,
  pageDescription: "Create and Manage Instructions to be followed during a Pipeline's execution",
};

pipelinesTrails.pipelineInstructionsDetailView = {
  parent: "pipelineInstructionsManagement",
  name: "pipelineInstructionsDetailView",
  path: pipelinesPaths.pipelineInstructionsManagement,
  title: "Pipeline Instructions Details",
  linkText: "Pipeline Instructions Details",
  icon: faBallotCheck,
};
