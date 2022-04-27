import ModelBase, {DataState} from "core/data_model/model.base";
import scriptsActions from "components/inventory/scripts/scripts-actions";

export class ScriptModel extends ModelBase {
  constructor(data, metaData, newModel, getAccessToken, cancelTokenSource, loadData, canUpdate = false, canDelete = false, canEditAccessRoles, setStateFunction) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.scriptPulled = false;
    this.updateAllowed = canUpdate;
    this.deleteAllowed = canDelete;
    this.editAccessRolesAllowed = canEditAccessRoles;
    this.setStateFunction = setStateFunction;
  }

  createModel = async () => {
    return await scriptsActions.createScriptV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    return await scriptsActions.updateScriptV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  deleteModel = async () => {
    const response = await scriptsActions.deleteScriptV2(this.getAccessToken, this.cancelTokenSource, this);
    this.dataState = DataState.DELETED;
    this.unselectModel();
    await this.loadData();
    return response;
  };

  pullScriptFromDb = async () => {
    const response = await scriptsActions.getScriptValue(this.getAccessToken, this.cancelTokenSource, this.getData("_id"));
    const value = response?.data?.data;
    this.scriptPulled = true;

    if (value) {
      this.setData("value", value, false);
    }

    return value;
  };

  hasScriptBeenPulled = () => {
    return this.scriptPulled === true;
  }

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new ScriptModel({...newData}, this.metaData, this.newModel, this.getAccessToken, this.cancelTokenSource, this.loadData, this.updateAllowed, this.deleteAllowed);
  };
}

export default ScriptModel;


