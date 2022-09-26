import ModelBase from "core/data_model/model.base";
import taskActions from "components/tasks/task.actions";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";

export class TaskModel extends ModelBase {
  constructor(
    data,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    canUpdate = false,
    canDelete = false,
    setStateFunction,
    ) {
    super(data, tasksMetadata, newModel);
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


