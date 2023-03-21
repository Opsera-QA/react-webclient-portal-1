import ModelBase from "core/data_model/model.base";

export class RemoteApplicationModel extends ModelBase {
  constructor(data, metaData, newModel, getAccessToken, cancelTokenSource, loadData, canUpdate = false, canDelete = false, setStateFunction) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.updateAllowed = canUpdate;
    this.deleteAllowed = canDelete;
    this.setStateFunction = setStateFunction;
  }

  getDetailViewTitle = () => {
    return `Remote Application Telemetry Details [${this.getOriginalValue("_id")}]`;
  };

  getManagementScreenLink = () => {
    return `/admin/remote-applications`;
  };
}

export default RemoteApplicationModel;


