import constantsHelper from "@opsera/definitions/constants/constants.helper";

export const pipelineTemplateIdentifierConstants = {};

pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIERS = {
  FREE_TRIAL_ORGANIZATION_SYNC_PIPELINE: "free-trial-organization-sync-pipeline",
};

pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIER_LABELS = {
  FREE_TRIAL_ORGANIZATION_SYNC_PIPELINE: "Salesforce Organization Sync",
};

pipelineTemplateIdentifierConstants.getLabelForTaskTemplateIdentifier = (workspaceIdentifier) => {
  return constantsHelper.getLabelForValue(
    pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIERS,
    pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIER_LABELS,
    workspaceIdentifier,
  );
};