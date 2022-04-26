import ModelBase, {DataState} from "core/data_model/model.base";
import parametersActions from "components/inventory/parameters/parameters-actions";

export class ParameterModel extends ModelBase {
  constructor(data, metaData, newModel, getAccessToken, cancelTokenSource, loadData, canUpdate = false, canDelete = false, canEditAccessRoles = false, setStateFunction) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.updateAllowed = canUpdate;
    this.deleteAllowed = canDelete;
    this.editAccessRolesAllowed = canEditAccessRoles;
    this.setStateFunction = setStateFunction;
  }

  createModel = async () => {
    return await parametersActions.createParameterV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    return await parametersActions.updateParameterV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  deleteModel = async () => {
    const response = await parametersActions.deleteParameterV2(this.getAccessToken, this.cancelTokenSource, this);
    this.dataState = DataState.DELETED;
    this.unselectModel();
    await this.loadData();
    return response;
  };

  getValueFromVault = async (fieldName = "value") => {
    const response = await parametersActions.getParameterValueFromVaultV2(this.getAccessToken, this.cancelTokenSource, this.getData("_id"));
    const value = response?.data?.data;

    if (value) {
      this.setData(fieldName, value, false);
    }

    return value;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new ParameterModel({...newData}, this.metaData, this.newModel, this.getAccessToken, this.cancelTokenSource, this.loadData, this.updateAllowed, this.deleteAllowed, this.setStateFunction);
  };
}

export default ParameterModel;


