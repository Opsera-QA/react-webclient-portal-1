import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {pipelineStepMetadataConstants} from "components/workflow/pipelines/pipelineStepMetadata.constants";
import modelHelpers from "components/common/model/modelHelpers";
import toolIdentifierConstants from "@opsera/definitions/constants/tool_identifiers/toolIdentifier.constants";

export const pipelineValidationHelper = {};

pipelineValidationHelper.isPipelineStepToolValid = (pipelineStep) => {
  const parsedPipelineStep = DataParsingHelper.parseObject(pipelineStep, {});
  const configuration = DataParsingHelper.parseObject(parsedPipelineStep.configuration);
  const parsedToolIdentifier = DataParsingHelper.parseString(parsedPipelineStep.tool_identifier);

  if (!configuration || !parsedToolIdentifier) {
    return false;
  }

  // Manually disabling specific step validation for now
  // Do not add to this list. This is only here until these steps can be addressed
  const disabledPipelineStepIdentifiers = [
    toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS,
    toolIdentifierConstants.TOOL_IDENTIFIERS.FORTIFY,
    toolIdentifierConstants.TOOL_IDENTIFIERS.GITSCRAPER,
    toolIdentifierConstants.TOOL_IDENTIFIERS.COVERITY,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER,
    toolIdentifierConstants.TOOL_IDENTIFIERS.PMD,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SONAR,
    toolIdentifierConstants.TOOL_IDENTIFIERS.JUNIT,
    toolIdentifierConstants.TOOL_IDENTIFIERS.NUNIT,
    toolIdentifierConstants.TOOL_IDENTIFIERS.XUNIT,
    toolIdentifierConstants.TOOL_IDENTIFIERS.DATABRICKS_NOTEBOOK,
    toolIdentifierConstants.TOOL_IDENTIFIERS.GIT_OPERATION,
    toolIdentifierConstants.TOOL_IDENTIFIERS.LIQUIBASE,
    toolIdentifierConstants.TOOL_IDENTIFIERS.PROVAR,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SELENIUM,
    toolIdentifierConstants.TOOL_IDENTIFIERS.BLACKDUCK,
    toolIdentifierConstants.TOOL_IDENTIFIERS.TERRASCAN,
    toolIdentifierConstants.TOOL_IDENTIFIERS.ANCHORE_SCAN,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SERVICE_NOW,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SPINNAKER,
  ];

  if (disabledPipelineStepIdentifiers.includes(parsedToolIdentifier)) {
    return true;
  }

  try {
    const metadata = pipelineStepMetadataConstants.getMetadataForIdentifier(parsedToolIdentifier);

    if (metadata) {
      return modelHelpers.isDataValid(configuration, metadata) === true;
    }

    return true;
  } catch (error) {
    console.error("Error attempting to validate step configuration: ", parsedToolIdentifier, JSON.stringify(pipelineStep));
  }
};

pipelineValidationHelper.isPipelineSourceRepositoryValidForDynamicSettings = (pipeline) => {
  const pipelineSourceRepository = DataParsingHelper.parseNestedObject(pipeline, "workflow.source");

  if (!pipelineSourceRepository) {
    return false;
  }

  const dynamicSettingsEnabled  = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.source.dynamicSettings");

  if (dynamicSettingsEnabled !== true) {
    return;
  }

  const repository = DataParsingHelper.parseNestedString(pipeline, "workflow.source.repoId");
  const service = DataParsingHelper.parseNestedString(pipeline, "workflow.source.service");
  const toolId = DataParsingHelper.parseNestedString(pipeline, "workflow.source.accountId");
  const workspace = DataParsingHelper.parseNestedString(pipeline, "workflow.source.workspace");

  if (!repository || !toolId) {
    return false;
  }

  if (service === toolIdentifierConstants.TOOL_IDENTIFIERS.BITBUCKET && !workspace) {
    return false;
  }

  return true;
};