import {toolIdentifierConstants} from "components/admin/tools/identifiers/toolIdentifier.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

const StepValidationHelper = {};

StepValidationHelper.isValidConfiguration = (pipelineStep) => {
  const parsedPipelineStep = DataParsingHelper.parseObject(pipelineStep);

  if (!parsedPipelineStep) {
    return false;
  }

  if (!parsedPipelineStep.configuration || !parsedPipelineStep.tool_identifier) {
    return false;
  }

  const { configuration, tool_identifier } = parsedPipelineStep;

  try {
    //return true if the fields are found
    switch (tool_identifier) {
      case "jenkins":
        return configuration.toolConfigId && configuration.jobType ? true : false;

      case "nexus":
        return configuration.nexusToolConfigId && configuration.type && configuration.repositoryName ? true : false;

      case "octopus":
        return configuration.octopusToolId && configuration.spaceName ? true : false;

      case "jfrog_artifactory_maven":
        return configuration.jfrogToolConfigId && configuration.type && 
          configuration.repositoryName && configuration.repositoryFormat  && 
          configuration.artifactStepId ? true : false;

      case toolIdentifierConstants.TOOL_IDENTIFIERS.SALESFORCE_CODE_ANALYZER:
        return configuration.toolConfigId && configuration.qualityGateIds &&
        configuration.sfdxScanToolId && configuration.stepIdXML ? true : false;

      default:
        return true;
    }

  } catch (err) {
    console.error("Error attempting to validate step configuration: ", tool_identifier, JSON.stringify(pipelineStep));
  }
};

export default StepValidationHelper;