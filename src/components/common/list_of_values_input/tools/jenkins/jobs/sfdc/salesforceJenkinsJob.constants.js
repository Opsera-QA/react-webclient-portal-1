import { constantsHelper } from "temp-library-components/helpers/constants.helper";

export const salesforceJenkinsJobConstants = {};

salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES = {
  SFDC_CREATE_PACKAGE_XML: "SFDC CREATE PACKAGE XML",
  SFDC_PROFILE_DEPLOY: "SFDC PROFILE DEPLOY",
  SFDC_VALIDATE_PACKAGE_XML: "SFDC VALIDATE PACKAGE XML",
  SFDC_BACK_UP: "SFDC BACK UP",
  SFDC_DEPLOY: "SFDC DEPLOY",
  SFDC_UNIT_TESTING: "SFDC UNIT TESTING",
  SFDC_PUSH_ARTIFACTS: "SFDC PUSH ARTIFACTS",
  SFDC_DATA_TRANSFORM: "SFDC DATA TRANSFORM",
};

salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPE_LABELS = {
  SFDC_CREATE_PACKAGE_XML: "Salesforce Create XML Package",
  SFDC_PROFILE_DEPLOY: "Salesforce Profile Migration",
  SFDC_VALIDATE_PACKAGE_XML: "Salesforce Validate XML Package",
  SFDC_BACK_UP: "Salesforce Backup",
  SFDC_DEPLOY: "Salesforce Deploy",
  SFDC_UNIT_TESTING: "Salesforce Unit Test",
  SFDC_PUSH_ARTIFACTS: "Salesforce Push Artifacts",
  SFDC_DATA_TRANSFORM: "Salesforce MetaData Transformer",
};

salesforceJenkinsJobConstants.isSalesforceJobTypeValid = (jobType) => {
  return constantsHelper.isValueValid(salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES, jobType);
};

salesforceJenkinsJobConstants.getLabelForSalesforceJobType = (jobType) => {
  return constantsHelper.getLabelForValue(
    salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES,
    salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPE_LABELS,
    jobType,
  );
};

salesforceJenkinsJobConstants.getSelectOptionForSalesforceJenkinsJobType = (jobType) => {
  if (salesforceJenkinsJobConstants.isSalesforceJobTypeValid(jobType) !== true) {
    return null;
  }

  return ({
    text: salesforceJenkinsJobConstants.getLabelForSalesforceJobType(jobType),
    value: jobType,
  });
};

salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPE_SELECT_OPTIONS = [
  salesforceJenkinsJobConstants.getSelectOptionForSalesforceJenkinsJobType(salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_CREATE_PACKAGE_XML),
  salesforceJenkinsJobConstants.getSelectOptionForSalesforceJenkinsJobType(salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_PROFILE_DEPLOY),
  salesforceJenkinsJobConstants.getSelectOptionForSalesforceJenkinsJobType(salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_VALIDATE_PACKAGE_XML),
  salesforceJenkinsJobConstants.getSelectOptionForSalesforceJenkinsJobType(salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_BACK_UP),
  salesforceJenkinsJobConstants.getSelectOptionForSalesforceJenkinsJobType(salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_DEPLOY),
  salesforceJenkinsJobConstants.getSelectOptionForSalesforceJenkinsJobType(salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_UNIT_TESTING),
  salesforceJenkinsJobConstants.getSelectOptionForSalesforceJenkinsJobType(salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_PUSH_ARTIFACTS),
  salesforceJenkinsJobConstants.getSelectOptionForSalesforceJenkinsJobType(salesforceJenkinsJobConstants.SALESFORCE_JENKINS_JOB_TYPES.SFDC_DATA_TRANSFORM),
];