import ModelBase, {DataState} from "core/data_model/model.base";
import PipelineStorageActions from "components/admin/pipeline_storage/pipeline-storage-actions";

export class PipelineStorageModel extends ModelBase {
  constructor(data, metaData, newModel, getAccessToken, cancelTokenSource, loadData, canUpdate = false, canDelete = false, setStateFunction) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.updateAllowed = canUpdate;
    this.deleteAllowed = canDelete;
    this.setStateFunction = setStateFunction;
  }

  deleteModel = async () => {
    const response = await PipelineStorageActions.deletePipelineStorageDataV2(this.getAccessToken, this.cancelTokenSource, this);
    this.dataState = DataState.DELETED;
    return response;
  };

  getDetailViewTitle = () => {
    return `Pipeline Storage Details [${this.getOriginalValue("_id")}]`;
  };

  getManagementScreenLink = () => {
    return `/admin/pipeline-storage`;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new PipelineStorageModel({...newData}, this.metaData, this.newModel, this.getAccessToken, this.cancelTokenSource, this.loadData, this.updateAllowed, this.deleteAllowed, this.setStateFunction);
  };
}

export default PipelineStorageModel;


