import ModelBase from "core/data_model/model.base";
import {projectDataMappingActions} from "components/settings/data_mapping/projects/projectDataMapping.actions";

export class ProjectDataMappingModel extends ModelBase {
  constructor(
    data,
    metaData,
    newModel,
    getAccessToken,
    cancelTokenSource,
    loadData,
    customerAccessRules,
    roleDefinitions,
    setStateFunction
  ) {
    super(data, metaData, newModel);
    this.getAccessToken = getAccessToken;
    this.cancelTokenSource = cancelTokenSource;
    this.loadData = loadData;
    this.setStateFunction = setStateFunction;
    this.customerAccessRules = customerAccessRules;
    this.roleDefinitions = roleDefinitions;
    this.updateAllowed = true;
    this.deleteAllowed = true;
  }

  createModel = async () => {
    return await projectDataMappingActions.createProjectDataMappingV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  saveModel = async () => {
    return await projectDataMappingActions.updateProjectDataMappingV2( this.getAccessToken, this.cancelTokenSource, this);
  };

  deleteModel = async () => {
    return await projectDataMappingActions.deleteProjectDataMappingV2(this.getAccessToken, this.cancelTokenSource, this);
  };

  getDetailViewLink = () => {
    return `/settings/data_mapping/projects/details/${this.getData("_id")}`;
  };

  getDetailViewTitle = () => {
    return `${this.getOriginalValue("key")} Project Data Mapping Tag`;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new ProjectDataMappingModel(
      {...newData},
      this.metaData,
      this.newModel,
      this.getAccessToken,
      this.cancelTokenSource,
      this.loadData,
      this.customerAccessRules,
      this.roleDefinitions,
      this.setStateFunction
    );
  };
}

export default ProjectDataMappingModel;


