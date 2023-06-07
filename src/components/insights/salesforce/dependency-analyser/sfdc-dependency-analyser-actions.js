import baseActions from "../../../../utils/actionsBase";
import sfdcPipelineActions from "../../../workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";

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

export default sfdcDependencyAnalyserActions;