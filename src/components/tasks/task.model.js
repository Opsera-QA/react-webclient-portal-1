import ModelBase from "core/data_model/model.base";
import taskActions from "components/tasks/task.actions";
import tasksMetadata from "@opsera/definitions/constants/tasks/tasks.metadata";
import TaskRoleHelper from "@opsera/know-your-role/roles/tasks/taskRole.helper";
import { taskHelper } from "components/tasks/task.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export class TaskModel extends ModelBase {
  constructor(
    data,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    setStateFunction,
  ) {
    super(data, tasksMetadata, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.setStateFunction = setStateFunction;
  }

  canCreate = () => {
    return TaskRoleHelper.canCreateTask(this.userData);
  };

  createModel = async () => {
    return await taskActions.createTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  canUpdate = () => {
    return TaskRoleHelper.canUpdateTask(
      this.userData,
      this.data,
    );
  };

  saveModel = async () => {
    return await taskActions.updateGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  canDelete = () => {
    return TaskRoleHelper.canDelete(
      this.userData,
      this.data,
    );
  };

  deleteModel = async () => {
    return await taskActions.deleteGitTaskV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  getDetailViewTitle = () => {
    return `${this.getData("name")} Task Details`;
  };

  canEditAccessRoles = () => {
    return TaskRoleHelper.canEditAccessRoles(
      this.userData,
      this.data,
    );
  };

  canDeleteAdminTask = () => {
    return TaskRoleHelper.canDeleteAdminTask(
      this.userData,
      this.data,
    );
  };

  canRunTask = () => {
    return TaskRoleHelper.canRunTask(
      this.userData,
      this.data,
    );
  };

  canStopTask = () => {
    return TaskRoleHelper.canStopTask(
      this.userData,
      this.data,
    );
  };

  canCreateCertificateTask = () => {
    return TaskRoleHelper.canCreateCertificateTask(
      this.userData,
      this.data,
    );
  };

  canGenerateSalesforceCertificate = () => {
    return TaskRoleHelper.canGenerateSalesforceCertificate(
      this.userData,
      this.data,
    );
  };

  getDetailViewLink = () => {
    return taskHelper.getModelDetailViewLink(this);
  };

  clone = () => {
    return new TaskModel(DataParsingHelper.cloneDeep(
        { ...this.data }),
      this.isNew(),
      this.getAccessToken,
      this.cancelTokenSource,
      this.loadData,
      this.setStateFunction,
    );
  };
}

export default TaskModel;


