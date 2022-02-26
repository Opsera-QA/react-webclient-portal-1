import ModelBase from "core/data_model/model.base";
import toolsActions from "components/inventory/tools/tools-actions";
import vaultActions from "components/vault/vault.actions";
import projectDataMappingActions from "components/settings/data_mapping/projects/projectDataMappingActions";
import dataMappingActions from "components/settings/data_mapping/data-mapping-actions";

export class ProjectMappingModel extends ModelBase {
  constructor(
    data,
    metaData,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    customerAccessRules,
    roleDefinitions,
    setStateFunction
  ) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.setStateFunction = setStateFunction;
    this.customerAccessRules = customerAccessRules;
    this.roleDefinitions = roleDefinitions;
    this.updateAllowed = true;
    this.deleteAllowed = true;
  }

  createModel = async () => {
    return await projectDataMappingActions.createProjectMappingV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  // TODO: Use new route
  saveModel = async () => {
    return await dataMappingActions.updateProjectV2(this, this.getAccessToken, this.cancelTokenSource);
  };

  // TODO: Not used yet
  deleteModel = async () => {
    const vaultDeleteResponse = await vaultActions.deleteOwnerVaultRecordsForToolIdV2(this.getAccessToken, this.cancelTokenSource, this);
    if (vaultDeleteResponse?.status !== 200) {
      const errorMsg = `Error reported by services while deleting tool information from Vault. Please try again`;
      // toastContext.showErrorDialog(errorMsg);
      return;
    }
    await toolsActions.deleteToolV2(this.getAccessToken, this.cancelTokenSource, this);
    // toastContext.showDeleteSuccessResultDialog("Tool");
    // setShowDeleteModal(false);
    history.push("/inventory/tools");
  };

  getDetailViewLink = () => {
    return `/settings/data_mapping/projects/details/${this.getData("_id")}`;
  };

  getDetailViewTitle = () => {
    return `${this.getOriginalValue("key")} Project Mapping`;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new ProjectMappingModel(
      {...newData},
      this.metaData,
      this.newModel,
      this.getAccessToken,
      this.cancelTokenSource,
      this.loadData,
      this.customerAccessRules,
      this.roleDefinitions,
      this.setStateFunction
    );
  };
}

export default ProjectMappingModel;


