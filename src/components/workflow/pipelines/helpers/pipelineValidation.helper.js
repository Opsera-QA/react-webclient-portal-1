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
    toolIdentifierConstants.TOOL_IDENTIFIERS.ELASTIC_BEANSTALK,
    toolIdentifierConstants.TOOL_IDENTIFIERS.CYPRESS,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SFDC_CONFIGURATOR,
    toolIdentifierConstants.TOOL_IDENTIFIERS.COMMAND_LINE,
    toolIdentifierConstants.TOOL_IDENTIFIERS.NPM,
    toolIdentifierConstants.TOOL_IDENTIFIERS.TEAMCITY,
    toolIdentifierConstants.TOOL_IDENTIFIERS.JMETER,
    toolIdentifierConstants.TOOL_IDENTIFIERS.TWISTLOCK,
    toolIdentifierConstants.TOOL_IDENTIFIERS.AWS_DEPLOY,
    toolIdentifierConstants.TOOL_IDENTIFIERS.GCP_DEPLOY,
    toolIdentifierConstants.TOOL_IDENTIFIERS.S3,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SSH_UPLOAD,
    toolIdentifierConstants.TOOL_IDENTIFIERS.DOCKER_PUSH,
    toolIdentifierConstants.TOOL_IDENTIFIERS.ARGO,
    toolIdentifierConstants.TOOL_IDENTIFIERS.ANCHORE_INTEGRATOR,
    toolIdentifierConstants.TOOL_IDENTIFIERS.ANSIBLE,
    toolIdentifierConstants.TOOL_IDENTIFIERS.NEXUS,
    toolIdentifierConstants.TOOL_IDENTIFIERS.OCTOPUS,
    toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM,
    toolIdentifierConstants.TOOL_IDENTIFIERS.TERRAFORM_VCS,
    toolIdentifierConstants.TOOL_IDENTIFIERS.CONDITIONAL_OPERATOR,
    toolIdentifierConstants.TOOL_IDENTIFIERS.POWERSHELL,
    toolIdentifierConstants.TOOL_IDENTIFIERS.DOT_NET,
    toolIdentifierConstants.TOOL_IDENTIFIERS.DOT_NET_CLI,
    toolIdentifierConstants.TOOL_IDENTIFIERS.JFROG_ARTIFACTORY_DOCKER,
    toolIdentifierConstants.TOOL_IDENTIFIERS.JFROG_ARTIFACTORY_MAVEN,
    toolIdentifierConstants.TOOL_IDENTIFIERS.KAFKA_CONNECT,
    toolIdentifierConstants.TOOL_IDENTIFIERS.AWS_ECS_DEPLOY,
    toolIdentifierConstants.TOOL_IDENTIFIERS.COVERITY,
    toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ACR_PUSH,
    toolIdentifierConstants.TOOL_IDENTIFIERS.AWS_LAMDA,
    toolIdentifierConstants.TOOL_IDENTIFIERS.MONGODB_REALM,
    toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_AKS_DEPLOY,
    toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_FUNCTIONS,
    toolIdentifierConstants.TOOL_IDENTIFIERS.FLYWAY_DATABASE_MIGRATOR,
    toolIdentifierConstants.TOOL_IDENTIFIERS.INFORMATICA,
    toolIdentifierConstants.TOOL_IDENTIFIERS.PMD,
    toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_ZIP_DEPLOYMENT,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SENTINEL,
    toolIdentifierConstants.TOOL_IDENTIFIERS.BUILDKITE,
    toolIdentifierConstants.TOOL_IDENTIFIERS.PACKER,
    toolIdentifierConstants.TOOL_IDENTIFIERS.APIGEE,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SNAPLOGIC,
    toolIdentifierConstants.TOOL_IDENTIFIERS.SAP_CPQ,
    toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_WEBAPPS,
    toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_CLI,
    toolIdentifierConstants.TOOL_IDENTIFIERS.BOOMI,
    toolIdentifierConstants.TOOL_IDENTIFIERS.INFORMATICA_IDQ,
    toolIdentifierConstants.TOOL_IDENTIFIERS.DOCKER_CLI,
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
  const dynamicSettingsEnabled  = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.source.dynamicSettings");

  if (dynamicSettingsEnabled !== true) {
    return false;
  }

  const uiAllowed  = DataParsingHelper.parseNestedBoolean(pipeline, "workflow.source.allowDynamicSettingsInUi");

  if (uiAllowed !== true) {
    return false;
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