import { faBallotCheck, faDraftingCompass } from "@fortawesome/pro-light-svg-icons";
import { pipelineSettingsPaths } from "components/settings/pipelines/pipelineSettings.paths";

export const pipelineSettingsTrails = {};

pipelineSettingsTrails.pipelineSettings = {
  parent: undefined,
  name: "pipelineSettings",
  path: pipelineSettingsPaths.pipelineSettings,
  title: "Pipeline Settings",
  linkText: "Pipeline Settings",
  icon: faDraftingCompass,
};

pipelineSettingsTrails.pipelineInstructionsManagement = {
  parent: "pipelineSettings",
  name: "pipelineInstructionsManagement",
  path: pipelineSettingsPaths.pipelineInstructionsManagement,
  title: "Pipeline Instructions",
  linkText: "Pipeline Instructions",
  icon: faBallotCheck,
  pageDescription: "Create and Manage Instructions to be followed during a Pipeline's execution",
};

pipelineSettingsTrails.pipelineDetailView = {
  parent: "pipelineInstructionsManagement",
  name: "pipelineInstructionsManagement",
  path: pipelineSettingsPaths.pipelineInstructionsManagement,
  title: "Pipeline Instructions Details",
  linkText: "Pipeline Instructions Details",
  icon: faBallotCheck,
};
