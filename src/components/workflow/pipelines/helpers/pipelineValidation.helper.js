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

  // Manually disabling jenkins validation for now
  // if (parsedToolIdentifier === toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS) {
  //   return true;
  // }

  // try {
    // const metadata = pipelineStepMetadataConstants.getMetadataForIdentifier(parsedToolIdentifier);
    //
    // if (metadata) {
    //   return modelHelpers.isDataValid(configuration, metadata) === true;
    // }

    return true;
  // } catch (error) {
  //   console.error("Error attempting to validate step configuration: ", parsedToolIdentifier, JSON.stringify(pipelineStep));
  // }
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