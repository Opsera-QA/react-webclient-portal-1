import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import {
  salesforceJenkinsJobConstants
} from "components/common/list_of_values_input/tools/jenkins/jobs/sfdc/salesforceJenkinsJob.constants";
import { pipelineHelpers } from "components/common/helpers/pipelines/pipeline.helpers";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";

// TODO: Don't use these yet (outside of free trial). They're still being refined
export const salesforcePipelineHelper = {};

salesforcePipelineHelper.updateBranchForSalesforcePipelineSteps = (pipeline, gitBranch) => {
  const pipelineSteps = pipelineHelpers.getPipelineSteps(pipeline);
  const parsedBranch  = dataParsingHelper.parseString(gitBranch, undefined);

  if (!parsedBranch) {
    throw "Did not receive a Branch name";
  }

  const updatedPipelineSteps = [];

  pipelineSteps.forEach((pipelineStep) => {
    const stepToolConfiguration = pipelineStep?.tool?.configuration;

    if (!stepToolConfiguration) {
      updatedPipelineSteps.push(pipelineStep);
      return;
    }

    const jobType = stepToolConfiguration?.jobType;

    switch (jobType) {
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_CREATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_BACK_UP:
        updatedPipelineSteps.push(salesforcePipelineHelper.updateBranchInJenkinsStep(pipelineStep, gitBranch));
        break;
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_VALIDATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_UNIT_TESTING:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_DEPLOY:
        updatedPipelineSteps.push(pipelineStep);
        break;
      default:
        console.info(`Pipeline Step Identifier [${pipelineStep?.tool?.tool_identifier}] is not supported for branch update with Job Type [${jobType}]`);
        updatedPipelineSteps.push(pipelineStep);
    }
  });

  pipeline.workflow.plan = updatedPipelineSteps;
  return pipeline;
};

salesforcePipelineHelper.updateBranchInJenkinsStep = (pipelineStep, gitBranch) => {
  const parsedPipelineStep = dataParsingHelper.parseObject(pipelineStep, undefined);

  if (!parsedPipelineStep) {
    throw "Did not receive a Pipeline Step object";
  }

  const parsedBranch  = dataParsingHelper.parseString(gitBranch, undefined);

  if (!parsedBranch) {
    throw "Did not receive a Branch name string";
  }

  const stepToolConfiguration = dataParsingHelper.parseObject(parsedPipelineStep?.tool?.configuration, undefined);

  if (!stepToolConfiguration) {
    throw "The Pipeline Step did not contain a configuration object to update.";
  }

  if (parsedPipelineStep?.tool?.tool_identifier !== toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS) {
    throw `Invalid Pipeline Step given [${parsedPipelineStep?.tool?.tool_identifier}] does not match [${toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS}]`;
  }

  stepToolConfiguration.branch = parsedBranch;
  stepToolConfiguration.defaultBranch = parsedBranch;
  stepToolConfiguration.gitBranch = parsedBranch;
  parsedPipelineStep.tool.configuration = stepToolConfiguration;
  return parsedPipelineStep;
};

salesforcePipelineHelper.updateRepositoryForSalesforcePipelineSteps = (pipeline, repository) => {
  const pipelineSteps = pipelineHelpers.getPipelineSteps(pipeline);
  const parsedRepository  = dataParsingHelper.parseObject(repository, undefined);

  if (!parsedRepository) {
    throw "Did not receive a Repository object";
  }

  const updatedPipelineSteps = [];

  pipelineSteps.forEach((pipelineStep) => {
    const stepToolConfiguration = pipelineStep?.tool?.configuration;

    if (!stepToolConfiguration) {
      updatedPipelineSteps.push(pipelineStep);
      return;
    }

    const jobType = stepToolConfiguration?.jobType;

    switch (jobType) {
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_CREATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_BACK_UP:
        updatedPipelineSteps.push(salesforcePipelineHelper.updateRepositoryInJenkinsStep(pipelineStep, parsedRepository));
        break;
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_VALIDATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_UNIT_TESTING:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_DEPLOY:
        updatedPipelineSteps.push(pipelineStep);
        break;
      default:
        console.info(`Pipeline Step Identifier [${pipelineStep?.tool?.tool_identifier}] is not supported for branch update with Job Type [${jobType}]`);
        updatedPipelineSteps.push(pipelineStep);
    }
  });

  pipeline.workflow.plan = updatedPipelineSteps;
  return pipeline;
};

salesforcePipelineHelper.updateRepositoryInJenkinsStep = (pipelineStep, repository) => {
  const parsedPipelineStep = dataParsingHelper.parseObject(pipelineStep, undefined);

  if (!parsedPipelineStep) {
    throw "Did not receive a Pipeline Step object";
  }

  const parsedRepository  = dataParsingHelper.parseObject(repository, undefined);

  if (!parsedRepository) {
    throw "Did not receive a Repository object";
  }

  const stepToolConfiguration = dataParsingHelper.parseObject(parsedPipelineStep?.tool?.configuration, undefined);

  if (!stepToolConfiguration) {
    throw "The Pipeline Step did not contain a configuration object to update.";
  }

  if (parsedPipelineStep?.tool?.tool_identifier !== toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS) {
    throw `Invalid Pipeline Step given [${parsedPipelineStep?.tool?.tool_identifier}] does not match [${toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS}]`;
  }

  const repoId = parsedRepository?._id || parsedRepository?.id || parsedRepository?.repositoryId || "";
  const gitUrl = parsedRepository?.httpUrl || parsedRepository?.remoteUrl || "";
  const sshUrl = parsedRepository?.sshUrl || parsedRepository?.configuration?.sshUrl || "";
  stepToolConfiguration.repository = parsedRepository?.name;
  stepToolConfiguration.repoId = repoId;
  stepToolConfiguration.projectId = repoId;
  stepToolConfiguration.gitUrl = gitUrl;
  stepToolConfiguration.sshUrl = sshUrl;
  stepToolConfiguration.branch = "";
  stepToolConfiguration.defaultBranch = "";
  stepToolConfiguration.gitBranch = "";
  stepToolConfiguration.workspace = "";
  parsedPipelineStep.tool.configuration = stepToolConfiguration;
  return parsedPipelineStep;
};

salesforcePipelineHelper.updateGitToolIdForSalesforcePipelineSteps = (pipeline, isTaskFlag, gitToolId, service) => {

  if (isMongoDbId(gitToolId) !== true && gitToolId !== "") {
    throw "Invalid Git Tool ID given";
  }

  if (hasStringValue(service) === false) {
    throw "Did not include a service.";
  }

  if (isTaskFlag && pipeline.type === "sync-sfdc-repo") {
    pipeline.configuration.gitToolId = gitToolId;
    pipeline.configuration.service = service;
    return pipeline;
  }

  const pipelineSteps = pipelineHelpers.getPipelineSteps(pipeline);

  const updatedPipelineSteps = [];

  pipelineSteps.forEach((pipelineStep) => {
    const stepToolConfiguration = pipelineStep?.tool?.configuration;

    if (!stepToolConfiguration) {
      updatedPipelineSteps.push(pipelineStep);
      return;
    }

    const jobType = stepToolConfiguration?.jobType;

    switch (jobType) {
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_CREATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_BACK_UP:
        updatedPipelineSteps.push(salesforcePipelineHelper.updateGitToolIdInJenkinsStep(pipelineStep, gitToolId, service));
        break;
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_VALIDATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_UNIT_TESTING:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_DEPLOY:
        updatedPipelineSteps.push(pipelineStep);
        break;
      default:
        console.info(`Pipeline Step Identifier [${pipelineStep?.tool?.tool_identifier}] is not supported for branch update with Job Type [${jobType}]`);
        updatedPipelineSteps.push(pipelineStep);
    }
  });

  pipeline.workflow.plan = updatedPipelineSteps;
  return pipeline;
};

salesforcePipelineHelper.updateGitToolIdInJenkinsStep = (pipelineStep, gitToolId, service) => {
  const parsedPipelineStep = dataParsingHelper.parseObject(pipelineStep, undefined);

  if (!parsedPipelineStep) {
    throw "Did not receive a Pipeline Step object";
  }

  if (isMongoDbId(gitToolId) !== true && gitToolId !== "") {
    throw "Invalid Git Tool ID given";
  }

  if (hasStringValue(service) === false) {
    throw "Did not include a service.";
  }

  const stepToolConfiguration = dataParsingHelper.parseObject(parsedPipelineStep?.tool?.configuration, undefined);

  if (!stepToolConfiguration) {
    throw "The Pipeline Step did not contain a configuration object to update.";
  }

  if (parsedPipelineStep?.tool?.tool_identifier !== toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS) {
    throw `Invalid Pipeline Step given [${parsedPipelineStep?.tool?.tool_identifier}] does not match [${toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS}]`;
  }

  const jobType = stepToolConfiguration?.jobType;
  console.log(`Job Type [${jobType}] gitToolId before: ${stepToolConfiguration.gitToolId}`);
  stepToolConfiguration.gitToolId = gitToolId;
  console.log(`Job Type [${jobType}] gitToolId after: ${stepToolConfiguration.gitToolId}`);
  stepToolConfiguration.service = service;
  stepToolConfiguration.repository = "";
  stepToolConfiguration.repoId = "";
  stepToolConfiguration.projectId = "";
  stepToolConfiguration.gitUrl = "";
  stepToolConfiguration.sshUrl = "";
  stepToolConfiguration.branch = "";
  stepToolConfiguration.defaultBranch = "";
  stepToolConfiguration.gitBranch = "";
  stepToolConfiguration.workspace = "";
  parsedPipelineStep.tool.configuration = stepToolConfiguration;
  return parsedPipelineStep;
};

salesforcePipelineHelper.updateSourceSalesforceToolIdForSalesforcePipelineSteps = (pipeline, isTaskFlag, salesforceToolId) => {

  if (isMongoDbId(salesforceToolId) !== true && salesforceToolId !== "") {
    throw "Invalid Source Salesforce Tool ID given";
  }

  if(isTaskFlag && pipeline.type === "sync-sfdc-repo") {
    pipeline.configuration.sfdcToolId = salesforceToolId;
    return pipeline;
  }

  const pipelineSteps = pipelineHelpers.getPipelineSteps(pipeline);

  const updatedPipelineSteps = [];

  pipelineSteps.forEach((pipelineStep) => {
    const stepToolConfiguration = pipelineStep?.tool?.configuration;

    if (!stepToolConfiguration) {
      updatedPipelineSteps.push(pipelineStep);
      return;
    }

    const jobType = stepToolConfiguration?.jobType;

    switch (jobType) {
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_CREATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_BACK_UP:
        updatedPipelineSteps.push(salesforcePipelineHelper.updateSalesforceToolIdInJenkinsStep(pipelineStep, salesforceToolId));
        break;
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_VALIDATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_UNIT_TESTING:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_DEPLOY:
        updatedPipelineSteps.push(pipelineStep);
        break;
      default:
        console.info(`Pipeline Step Identifier [${pipelineStep?.tool?.tool_identifier}] is not supported for source salesforce tool ID update with Job Type [${jobType}]`);
        updatedPipelineSteps.push(pipelineStep);
    }
  });

  pipeline.workflow.plan = updatedPipelineSteps;
  return pipeline;
};

salesforcePipelineHelper.updateDeploymentSalesforceToolIdForSalesforcePipelineSteps = (pipeline, salesforceToolId) => {
  const pipelineSteps = pipelineHelpers.getPipelineSteps(pipeline);

  if (isMongoDbId(salesforceToolId) !== true && salesforceToolId !== "") {
    throw "Invalid Deployment Salesforce Tool ID given";
  }

  const updatedPipelineSteps = [];

  pipelineSteps.forEach((pipelineStep) => {
    const stepToolConfiguration = pipelineStep?.tool?.configuration;

    if (!stepToolConfiguration) {
      updatedPipelineSteps.push(pipelineStep);
      return;
    }

    const jobType = stepToolConfiguration?.jobType;

    switch (jobType) {
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_VALIDATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_UNIT_TESTING:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_DEPLOY:
        updatedPipelineSteps.push(salesforcePipelineHelper.updateSalesforceToolIdInJenkinsStep(pipelineStep, salesforceToolId));
        break;
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_CREATE_PACKAGE_XML:
      case salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_BACK_UP:
        updatedPipelineSteps.push(pipelineStep);
        break;
      default:
        console.info(`Pipeline Step Identifier [${pipelineStep?.tool?.tool_identifier}] is not supported for salesforce tool ID update with Job Type [${jobType}]`);
        updatedPipelineSteps.push(pipelineStep);
    }
  });

  pipeline.workflow.plan = updatedPipelineSteps;
  return pipeline;
};

salesforcePipelineHelper.updateSalesforceToolIdInJenkinsStep = (pipelineStep, salesforceToolId) => {
  const parsedPipelineStep = dataParsingHelper.parseObject(pipelineStep, undefined);

  if (!parsedPipelineStep) {
    throw "Did not receive a Pipeline Step object";
  }

  if (isMongoDbId(salesforceToolId) !== true && salesforceToolId !== "") {
    throw "Invalid Source Salesforce Tool ID given";
  }

  const stepToolConfiguration = dataParsingHelper.parseObject(parsedPipelineStep?.tool?.configuration, undefined);

  if (!stepToolConfiguration) {
    throw "The Pipeline Step did not contain a configuration object to update.";
  }

  if (parsedPipelineStep?.tool?.tool_identifier !== toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS) {
    throw `Invalid Pipeline Step given [${parsedPipelineStep?.tool?.tool_identifier}] does not match [${toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS}]`;
  }

  const jobType = stepToolConfiguration?.jobType;
  console.log(`Job Type [${jobType}] sfdcToolId before: ${stepToolConfiguration.sfdcToolId}`);
  stepToolConfiguration.sfdcToolId = salesforceToolId;
  console.log(`Job Type [${jobType}] sfdcToolId after: ${stepToolConfiguration.sfdcToolId}`);
  parsedPipelineStep.tool.configuration = stepToolConfiguration;
  return parsedPipelineStep;
};

salesforcePipelineHelper.getSalesforceCreatePackageStepFromPipeline = (pipeline) => {
  const pipelineSteps = pipelineHelpers.getPipelineSteps(pipeline);

  return pipelineSteps.find((pipelineStep) => {
    const jobType = pipelineStep?.tool?.configuration?.jobType;
    return jobType === salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_CREATE_PACKAGE_XML;
  });
};