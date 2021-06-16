import ModelBase, {DataState} from "core/data_model/model.base";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import parametersActions from "components/inventory/parameters/parameters-actions";

export class ScriptModel extends ModelBase {
  constructor(data, metaData, newModel, setStateFunction, getAccessToken, cancelTokenSource, loadData) {
    super(data, metaData, newModel, setStateFunction);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
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
    this.updateState();
    await this.loadData();
    return response;
  };

  getValueFromVault = async (fieldName = "value") => {
    const response = await scriptsActions.getValueFromVault(this.getAccessToken, this.cancelTokenSource, this.getData("_id"));

    if (response?.data?.data) {
      this.setData(fieldName, response.data.data, false);
    }
  };


  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new ScriptModel({...newData}, this.metaData, this.newModel, this.setStateFunction, this.getAccessToken, this.cancelTokenSource, this.loadData);
  };
}

export default ScriptModel;


