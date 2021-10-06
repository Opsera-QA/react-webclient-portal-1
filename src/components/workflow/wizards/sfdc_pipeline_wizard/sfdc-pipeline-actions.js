import baseActions from "utils/actionsBase";
import {axiosApiService} from "api/apiService";
import pipelineActivityActions
  from "components/workflow/pipelines/pipeline_details/pipeline_activity/logs/pipeline-activity-actions";
import {parsePackageXml} from "components/common/helpers/code-helpers";

const sfdcPipelineActions = {};

sfdcPipelineActions.getComponentTypesV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/get_component_types`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.updateSelectedComponentTypesV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    selectedComponentTypes:  pipelineWizardModel?.getData("selectedComponentTypes"),
    fromDate: pipelineWizardModel.getData("fromDate"),
    toDate: pipelineWizardModel.getData("toDate"),
    includedComponentTypes: pipelineWizardModel.getData("includedComponentTypes"),
    nameSpacePrefix: pipelineWizardModel.getData("namespacePrefix"),
    excludeDependencies: pipelineWizardModel.getData("includeDependencies") === false,
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/update_selected_component_types`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.triggerSfdcFilesPullV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/trigger_sfdc_files_pull`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.getSfdcFilesV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel, newFilterDto) => {
  const postBody = {
    rules: pipelineWizardModel?.getData("sfdcModifiedRuleList"),
    page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
    size: newFilterDto ? newFilterDto.getData("pageSize") : 3000,
    search: newFilterDto ? newFilterDto.getData("search") : "",
    componentFilter: newFilterDto ? newFilterDto.getData("componentFilter") : "",
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/get_sfdc_files_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.getSelectedFileList = async (getAccessToken, cancelTokenSource, pipelineWizardModel, newFilterDto) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/get_selected_file_list`;
  const urlParams = {
    params: {
      page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
      size: newFilterDto ? newFilterDto.getData("pageSize") : 3000,
      search: newFilterDto ? newFilterDto.getData("search") : "",
      componentFilter: newFilterDto ? newFilterDto.getData("componentFilter") : "",
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

sfdcPipelineActions.getValidatedFileList = async (getAccessToken, cancelTokenSource, pipelineWizardModel, newFilterDto) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/get_validated_file_list`;
  const urlParams = {
    params: {
      page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
      size: newFilterDto ? newFilterDto.getData("pageSize") : 3000,
      search: newFilterDto ? newFilterDto.getData("search") : "",
      componentFilter: newFilterDto ? newFilterDto.getData("componentFilter") : "",
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

sfdcPipelineActions.setSfdcFileListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    rules: pipelineWizardModel.getData("sfdcModifiedRuleList")
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/set_sfdc_files_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.setSfdcProfileFilesListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    rules: pipelineWizardModel.getData("sfdcModifiedRuleList"),
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/set_sfdc_profile_files_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.generateSfdcPackageXmlV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    isSfdc: pipelineWizardModel.getData("modifiedFilesOrigin") === "sfdc"
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/generate_sfdc_package_xml`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.generateSfdcProfileMigrationPackageXmlV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/generate_sfdc_profile_migration_package_xml`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.triggerGitTaskFilesPullV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/trigger_git_task_files_pull`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.getGitFilesV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel, newFilterDto) => {
  const postBody = {
    rules: pipelineWizardModel.getData("gitModifiedRuleList"),
    page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
    size: newFilterDto ? newFilterDto.getData("pageSize") : 3000,
    search: newFilterDto ? newFilterDto.getData("search") : "",
    componentFilter: newFilterDto ? newFilterDto.getData("componentFilter") : "",
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel.getData("recordId")}/get_git_files_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.setGitFileListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    rules: pipelineWizardModel.getData("gitModifiedRuleList")
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/set_git_files_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.setGitProfileFilesListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    rules: pipelineWizardModel.getData("sfdcModifiedRuleList"),
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/set_git_profile_files_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO: rewrite in new controller
sfdcPipelineActions.generateGitTaskXmlV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    isSfdc: pipelineWizardModel.getData("modifiedFilesOrigin") === "sfdc"
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("gitTaskId")}/generate_git_task_package_xml`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.triggerOrgToOrgFilesPullV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    fromDate: pipelineWizardModel.getData("fromDate"),
    toDate: pipelineWizardModel.getData("toDate"),
    includedComponentTypes: pipelineWizardModel.getData("includedComponentTypes"),
    nameSpacePrefix: pipelineWizardModel.getData("namespacePrefix")
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/trigger_org_to_org_files_pull`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.getOrganizationDestinationFilesV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel, newFilterDto) => {
  const postBody = {
    rules: pipelineWizardModel.getData("sfdcModifiedRuleList"),
    page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
    size: newFilterDto ? newFilterDto.getData("pageSize") : 3000,
    search: newFilterDto ? newFilterDto.getData("search") : "",
    componentFilter: newFilterDto ? newFilterDto.getData("componentFilter") : "",
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel.getData("recordId")}/get_organization_destination_files_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.triggerProfileComponentListPullV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    isSfdc: pipelineWizardModel.getData("modifiedFilesOrigin") === "sfdc"
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel.getData("recordId")}/trigger_profile_component_pull`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.getProfileComponentListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel, newFilterDto) => {
  const postBody = {
    rules: pipelineWizardModel.getData("profileComponentsRuleList"),
    page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
    size: newFilterDto ? newFilterDto.getData("pageSize") : 3000,
    search: newFilterDto ? newFilterDto.getData("search") : "",
    componentFilter: newFilterDto ? newFilterDto.getData("componentFilter") : "",
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel.getData("recordId")}/get_profile_component_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.setProfileComponentListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    rules: pipelineWizardModel.getData("profileComponentsRuleList")
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/set_profile_component_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.triggerUnitTestClassesPull = async (getAccessToken, cancelTokenSource, pipelineWizardModel, unitTestStep) => {
  const postBody = {
    sfdcToolId: unitTestStep?.tool?.configuration?.sfdcToolId,
    pipelineId: pipelineWizardModel.getData("pipelineId"),
    stepId: unitTestStep?._id,
    stepIdXML: pipelineWizardModel.getData("stepId"),
    isSfdc: pipelineWizardModel.getData("modifiedFilesOrigin") === "sfdc"
  };

  const apiUrl = `/pipelines/sfdc/wizard/trigger_unit_test_classes_pull`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.getUnitTestClassesListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel, unitTestStep) => {
  const urlParams = {
    params: {
      pipelineId: pipelineWizardModel.getData("pipelineId"),
      stepId: unitTestStep?._id,
    }
  };

  const apiUrl = `/pipelines/sfdc/wizard/get_unit_test_class_lists`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

// TODO: clean up, maybe make test class record metadata
sfdcPipelineActions.updateSelectedUnitTestClassesV2 = async (getAccessToken, cancelTokenSource, unitTestRecordId, selectedUnitTestClasses) => {
  const postBody = {
    selectedUnitTestClasses: selectedUnitTestClasses,
  };

  const apiUrl = `/pipelines/sfdc/wizard/${unitTestRecordId}/update_selected_unit_test_classes`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.setTestClassesListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel, unitTestStep) => {
  const postBody = {
    sfdcToolId: unitTestStep?.tool?.configuration?.sfdcToolId,
    pipelineId: pipelineWizardModel.getData("pipelineId"),
    stepId: unitTestStep?._id,
    stepIdXML: pipelineWizardModel.getData("stepId"),
    isSfdc: pipelineWizardModel.getData("modifiedFilesOrigin") === "sfdc"
  };

  const apiUrl = `/pipelines/sfdc/getTestClasses`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.getListFromPipelineStorage = async (postBody, toolFilterDto, getAccessToken) => {
  postBody.page = toolFilterDto ? toolFilterDto.getData("currentPage") : 0;
  postBody.size = toolFilterDto ? toolFilterDto.getData("pageSize") : 50;
  postBody.search = toolFilterDto ? toolFilterDto.getData("search") : "";
  postBody.classFilter = toolFilterDto ? toolFilterDto.getData("classFilter") : "";
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/storage/get`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.getSfdcComponentListValues = async (getAccessToken, cancelTokenSource, pipelineWizardModel, innerAttribute, fetchAttribute, componentTypes) => {
  const postBody = {
    fetchAttribute: fetchAttribute,
    innerAttribute: innerAttribute,
    componentTypes: componentTypes
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/get_component_values`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO: Remove all references and update with relevant queries that are more understandable
sfdcPipelineActions.setListToPipelineStorage = async (postBody, getAccessToken) => {
  const accessToken = await getAccessToken();
  const apiUrl = `/pipelines/storage/update`;
  const response = await axiosApiService(accessToken).post(apiUrl, postBody)
    .then((result) =>  {return result;})
    .catch(error => {throw { error };});
  return response;
};

sfdcPipelineActions.findExistingRecordV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    dataType: pipelineWizardModel.getData("fromGitTasks") === true ? "sync-sfdc-repo" : "sfdc-packageXml",
    pipelineId: pipelineWizardModel.getData("pipelineId"),
    stepId: pipelineWizardModel.getData("stepId"),
    gitTaskId: pipelineWizardModel.getData("fromGitTasks") === true ? pipelineWizardModel.getData("gitTaskId") : false,
    gitToolId: pipelineWizardModel.getData("gitToolId"),
    sfdcToolId: pipelineWizardModel.getData("sfdcToolId"),
    sfdcDestToolId: pipelineWizardModel.getData("sfdcDestToolId"),
    runCount: pipelineWizardModel.getData("run_count"),
  };

  const apiUrl = `/pipelines/sfdc/wizard/find_existing_record`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.getPipelineStorageRecords = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    dataType: pipelineWizardModel.getData("fromGitTasks") === true ? "sync-sfdc-repo" : "sfdc-packageXml",
    pipelineId: pipelineWizardModel.getData("pipelineId"),
    stepId: pipelineWizardModel.getData("stepId"),
    gitTaskId: pipelineWizardModel.getData("fromGitTasks") === true ? pipelineWizardModel.getData("gitTaskId") : false,
    gitToolId: pipelineWizardModel.getData("gitToolId"),
    sfdcToolId: pipelineWizardModel.getData("sfdcToolId"),
    sfdcDestToolId: pipelineWizardModel.getData("sfdcDestToolId"),
    runCount: pipelineWizardModel.getData("run_count"),
  };

  const apiUrl = `/pipelines/sfdc/wizard/find_existing_record`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.createNewRecordV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  // TODO: Remove irrelevant properties when refactor is completed
  const postBody = {
    dataType: pipelineWizardModel.getData("fromGitTasks") === true ? "sync-sfdc-repo" : "sfdc-packageXml",
    pipelineId: pipelineWizardModel.getData("pipelineId"),
    stepId: pipelineWizardModel.getData("stepId"),
    gitTaskId: pipelineWizardModel.getData("fromGitTasks") === true ? pipelineWizardModel.getData("gitTaskId") : false,
    gitToolId: pipelineWizardModel.getData("gitToolId"),
    sfdcToolId: pipelineWizardModel.getData("sfdcToolId"),
    sfdcDestToolId: pipelineWizardModel.getData("sfdcDestToolId"),
    isOrgToOrg: pipelineWizardModel.getData("isOrgToOrg") === true,
    isProfiles: pipelineWizardModel.getData("isProfiles") === true,
    fromGitTasks: pipelineWizardModel.getData("fromGitTasks") === true,
    runCount: pipelineWizardModel.getData("run_count"),
  };

  const apiUrl = `/pipelines/sfdc/wizard/create_new_record`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO: Should this pass it in URL instead?
sfdcPipelineActions.triggerGitTaskV2 = async (getAccessToken, cancelTokenSource, gitTaskId) => {
  const postBody = {
    gitTaskId: gitTaskId
  };

  const apiUrl = `/pipelines/sfdc/gittask`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

// TODO: Replace V2 call after verifying
sfdcPipelineActions.triggerGitTaskV3 = async (getAccessToken, cancelTokenSource, gitTaskId) => {
  const apiUrl = `/pipelines/sfdc/wizard/${gitTaskId}/trigger_git_task_job`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.triggerJenkinsJobV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    pipelineId: pipelineWizardModel.getData("pipelineId"),
    stepId: pipelineWizardModel.getData("stepId"),
    buildParams: {
      componentTypes: pipelineWizardModel.getData("isProfiles") === true ? JSON.stringify(pipelineWizardModel.getData("selectedComponentTypes")) : "",
      packageXml: "",
      // TODO: Does this need to be a string?
      retrieveFilesFromSFDC: pipelineWizardModel.getData("modifiedFilesOrigin") === "sfdc" ? "true" : "false",
      nameSpacePrefix: pipelineWizardModel.getData("namespacePrefix")
    },
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel.getData("recordId")}/trigger_jenkins_job`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.getPackageXmlV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel.getData("recordId")}/get_package_xml`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.setXmlFileContentsV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    packageXml: pipelineWizardModel?.getData("xmlFileContent"),
    excludeDependencies: pipelineWizardModel.getData("includeDependencies") === false,
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/set_xml_file_contents`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.setUploadedCsvFileListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    selectedFileList: pipelineWizardModel?.getData("csvFileContent"),
    excludeDependencies: pipelineWizardModel.getData("includeDependencies") === false,
  };

  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/set_csv_file_contents`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcPipelineActions.toggleSfdcCsvFilesValidation = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/toggle_sfdc_csv_upload_validation`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.toggleSfdcXmlFilesValidation = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/toggle_sfdc_xml_upload_validation`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.toggleProfileMigrationCsvFilesValidation = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/toggle_profile_migration_csv_upload_validation`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.toggleProfileMigrationXmlFilesValidation = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/toggle_profile_migration_xml_upload_validation`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.toggleGitCsvFilesValidation = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/toggle_git_csv_upload_validation`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.toggleGitXmlFilesValidation = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/toggle_git_xml_upload_validation`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.getInvalidFileList = async (getAccessToken, cancelTokenSource, pipelineWizardModel, filterModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel?.getData("recordId")}/get_invalid_file_list`;
  const urlParams = {
    params: {
      page: filterModel ? filterModel.getData("currentPage") : 1,
      size: filterModel ? filterModel.getData("pageSize") : 3000,
      search: filterModel ? filterModel.getData("search") : "",
      componentFilter: filterModel ? filterModel.getData("componentFilter") : "",
    }
  };

  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl, urlParams);
};

sfdcPipelineActions.getComponentNameCountListV2 = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/pipelines/sfdc/wizard/${pipelineWizardModel.getData("recordId")}/get_component_name_count_list`;
  return await baseActions.apiGetCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcPipelineActions.getPackageXmlFromRun = async (getAccessToken, cancelTokenSource, pipelineId, stepId, runNumber) => {
  const response = await pipelineActivityActions.getPipelineActivityLogsByRunNumber(getAccessToken, cancelTokenSource, pipelineId, undefined, runNumber, undefined, "console output");
  const logs = response?.data?.data;

  if (Array.isArray(logs) && logs.length > 0) {
    for (let i = 0; i < logs.length; i++) {
     try {
       const packageXml = parsePackageXml(logs[i]);

       if (packageXml != null) {
         return packageXml;
       }
     }
     catch (error) {
       console.error(error);
     }
    }
  }

  return null;
};



export default sfdcPipelineActions;