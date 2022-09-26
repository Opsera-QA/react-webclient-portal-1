import ModelBase from "core/data_model/model.base";
import taskActions from "components/tasks/task.actions";

export class TaskModel extends ModelBase {
  constructor(
    data,
    metaData,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    canUpdate = false,
    canDelete = false,
    setStateFunction,
    ) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.updateAllowed = canUpdate;
    this.deleteAllowed = canDelete;
    this.setStateFunction = setStateFunction;
  }

  createModel = async () => {
    return await taskActions.createTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    return await taskActions.updateGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  deleteModel = async () => {
    return await taskActions.deleteGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  getDetailViewTitle = () => {
    return `${this.getData("name")} Task Details`;
  };

  getDetailViewLink = () => {
    return `/task/details/${this.getMongoDbId()}`;
  }
}

export default TaskModel;


