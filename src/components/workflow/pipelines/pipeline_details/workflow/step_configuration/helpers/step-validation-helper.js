// Helper that maps a step to a tool identifier and returns validation status based on the
//   current configuration

//IF this returns false it will flag a pipelien step as "Warning, missing configration"

const StepValidationHelper = {};


StepValidationHelper.isValidConfiguration = (stepConfig) => {
  if (!stepConfig) {
    return false;
  }

  if (!stepConfig.configuration || !stepConfig.tool_identifier) {
    return false;
  }

  const { configuration, tool_identifier } = stepConfig;

  try {
    //return true if the fields are found
    switch (tool_identifier) {
      case "jenkins":
        return configuration.toolConfigId && configuration.jobType ? true : false;

      case "nexus":
        return configuration.nexusToolConfigId && configuration.type && configuration.repositoryName && configuration.groupName ? true : false;

      case "octopus":
        return configuration.octopusToolId && configuration.spaceName ? true : false;

      default:
        return true;
    }

  } catch (err) {
    console.error("Error attempting to validate step configuration: ", tool_identifier, JSON.stringify(stepConfig));
  }
};

export default StepValidationHelper;