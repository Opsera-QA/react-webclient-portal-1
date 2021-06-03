import ModelBase, {DataState} from "core/data_model/model.base";
import parametersActions from "components/inventory/parameters/parameters-actions";

export class ParameterModel extends ModelBase {
  constructor(data, metaData, newModel, setStateFunction, getAccessToken, cancelTokenSource, loadData) {
    super(data, metaData, newModel, setStateFunction);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
  }

  createModel = async () => {
    return await parametersActions.createParameterV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    const response =  await parametersActions.updateParameterV2(this.getAccessToken, this.cancelTokenSource, this);
    await this.loadData();
    return response;
  };

  deleteModel = async () => {
    const response =  await parametersActions.deleteParameterV2(this.getAccessToken, this.cancelTokenSource, this);
    await this.loadData();
    return response;
  };

  getValueFromVault = async () => {
    const response = await parametersActions.getParameterValueFromVaultV2(this.getAccessToken, this.cancelTokenSource, this.getData("_id"));

    if (response?.data?.data) {
      this.setData("value", response.data.data, false);

      //TODO: Attach to setData function
      this.setStateFunction({...this});
    }
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new ParameterModel({...newData}, this.metaData, this.newModel, this.getAccessToken, this.cancelTokenSource, this.loadData);
  };
}

export default ParameterModel;


