import ModelBase from "core/data_model/model.base";
import toolsActions from "components/inventory/tools/tools-actions";
import {isActionAllowed} from "components/common/helpers/role-helpers";
import vaultActions from "components/vault/vault.actions";

export class ToolModel extends ModelBase {
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
    this.updateAllowed = this.canPerformAction("update_tool");
    this.deleteAllowed = this.canPerformAction("delete_tool");
    this.editAccessRolesAllowed = this.canPerformAction("edit_access_roles");
  }

  createModel = async () => {
    return await toolsActions.createToolV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    return await toolsActions.updateToolV2(this.getAccessToken, this.cancelTokenSource, this);
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
    return `/inventory/tools/details/${this.getData("_id")}`;
  };

  getDetailViewTitle = () => {
    return `${this?.getOriginalValue("name")} Tool Details`;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new ToolModel(
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

  canPerformAction = (action) => {
    return isActionAllowed(this.customerAccessRules, action, this.getData("owner"), this.getData("roles"), this.roleDefinitions, true);
  }
}

export default ToolModel;


