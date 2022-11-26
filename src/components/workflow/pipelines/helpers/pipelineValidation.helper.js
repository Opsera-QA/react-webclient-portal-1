import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import {pipelineStepMetadataConstants} from "components/workflow/pipelines/pipelineStepMetadata.constants";
import modelHelpers from "components/common/model/modelHelpers";

export const pipelineValidationHelper = {};

pipelineValidationHelper.isPipelineStepToolValid = (pipelineStep) => {
  const parsedPipelineStep = DataParsingHelper.parseObject(pipelineStep, {});
  const configuration = DataParsingHelper.parseObject(parsedPipelineStep.configuration);
  const parsedToolIdentifier = DataParsingHelper.parseString(parsedPipelineStep.tool_identifier);

  if (!configuration || !parsedToolIdentifier) {
    return false;
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