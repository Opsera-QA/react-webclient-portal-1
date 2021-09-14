import ModelBase from "core/data_model/model.base";
import taskActions from "components/tasks/task.actions";

export class TaskModel extends ModelBase {
  constructor(data, metaData, newModel, getAccessToken, cancelTokenSource, loadData, canUpdate = false, canDelete = false, setStateFunction) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.updateAllowed = canUpdate;
    this.deleteAllowed = canDelete;
    this.setStateFunction = setStateFunction;
  }

  createModel = async () => {
    return await taskActions.createGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    return await taskActions.updateGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  deleteModel = async () => {
    return await taskActions.deleteGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new TaskModel({...newData}, this.metaData, this.newModel, this.getAccessToken, this.cancelTokenSource, this.loadData, this.updateAllowed, this.deleteAllowed);
  };
}

export default TaskModel;


