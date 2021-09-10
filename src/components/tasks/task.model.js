import ModelBase from "core/data_model/model.base";
import gitTasksActions from "components/tasks/git-task-actions";

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
    return await gitTasksActions.createGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    return await gitTasksActions.updateGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  deleteModel = async () => {
    return await gitTasksActions.deleteGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new TaskModel({...newData}, this.metaData, this.newModel, this.getAccessToken, this.cancelTokenSource, this.loadData, this.updateAllowed, this.deleteAllowed);
  };
}

export default TaskModel;


