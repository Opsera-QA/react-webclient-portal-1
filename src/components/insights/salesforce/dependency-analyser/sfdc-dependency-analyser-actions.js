import baseActions from "../../../../utils/actionsBase";

const sfdcDependencyAnalyserActions = {};

sfdcDependencyAnalyserActions.createNewRecord = async (getAccessToken, cancelTokenSource, model) => {
  const postBody = {
    dataType: "sfdc-packageXml",
    sfdcToolId: model.getData("sfdcToolId"),
    referenceType: model.getData("referenceType"),
  };

  const apiUrl = `/analytics/sfdc/dependency_analyser/create_new_instance`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcDependencyAnalyserActions.updateSelectedComponentTypes = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    selectedComponentTypes:  pipelineWizardModel?.getData("selectedComponentTypes"),
    fromDate: pipelineWizardModel.getData("fromDate"),
    toDate: pipelineWizardModel.getData("toDate"),
  };

  const apiUrl = `/analytics/sfdc/dependency_analyser/${pipelineWizardModel?.getData("recordId")}/update_selected_component_types`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcDependencyAnalyserActions.setXmlFileContents = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    packageXml: pipelineWizardModel?.getData("xmlFileContent"),
  };

  const apiUrl = `/analytics/sfdc/dependency_analyser/${pipelineWizardModel?.getData("recordId")}/set_xml_file_contents`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcDependencyAnalyserActions.setUploadedCsvFileList = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const postBody = {
    selectedFileList: pipelineWizardModel?.getData("csvFileContent"),
  };

  const apiUrl = `/analytics/sfdc/dependency_analyser/${pipelineWizardModel?.getData("recordId")}/set_csv_file_contents`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcDependencyAnalyserActions.toggleSfdcCsvFilesValidation = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/analytics/sfdc/dependency_analyser/${pipelineWizardModel?.getData("recordId")}/toggle_sfdc_csv_upload_validation`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcDependencyAnalyserActions.toggleSfdcXmlFilesValidation = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/analytics/sfdc/dependency_analyser/${pipelineWizardModel?.getData("recordId")}/toggle_sfdc_xml_upload_validation`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcDependencyAnalyserActions.triggerDependencyAnalyserSfdcFilesPull = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/analytics/sfdc/dependency_analyser/${pipelineWizardModel?.getData("recordId")}/trigger_sfdc_files_pull`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl);
};

sfdcDependencyAnalyserActions.triggerDependentFiles = async (getAccessToken, cancelTokenSource, pipelineWizardModel) => {
  const apiUrl = `/analytics/sfdc/dependency_analyser`;
  const postBody = {
    sfdcToolId: pipelineWizardModel.getData("sfdcToolId"),
    pipelineStorageId: pipelineWizardModel?.getData("recordId"),
    referenceType: pipelineWizardModel?.getData("referenceType"),
  };
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

sfdcDependencyAnalyserActions.getDependentList = async (getAccessToken, cancelTokenSource, pipelineWizardModel, newFilterDto) => {
  const postBody = {
    rules: pipelineWizardModel?.getData("sfdcDependencyFileRuleList"),
    page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
    size: newFilterDto ? newFilterDto.getData("pageSize") : 3000,
    search: newFilterDto ? newFilterDto.getData("search") : "",
    componentFilter: newFilterDto ? newFilterDto.getData("componentFilter") : "",
  };

  const apiUrl = `/analytics/sfdc/dependency_analyser/${pipelineWizardModel?.getData("recordId")}/get_dependent_list`;
  return await baseActions.apiPostCallV2(getAccessToken, cancelTokenSource, apiUrl, postBody);
};

export default sfdcDependencyAnalyserActions;