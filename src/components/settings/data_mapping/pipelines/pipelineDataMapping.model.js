import ModelBase from "core/data_model/model.base";
import {pipelineDataMappingActions} from "components/settings/data_mapping/pipelines/pipelineDataMapping.actions";

export class PipelineDataMappingModel extends ModelBase {
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
    return await pipelineDataMappingActions.createPipelineDataMappingV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
  };

  saveModel = async () => {
    return await pipelineDataMappingActions.updatePipelineDataMappingV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
      );
  };

  deleteModel = async () => {
    return await pipelineDataMappingActions.deletePipelineDataMappingV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this.getMongoDbId(),
      );
  };

  getDetailViewLink = () => {
    return `/settings/data_mapping/pipeline/details/${this.getMongoDbId()}`;
  };

  getDetailViewTitle = () => {
    return `Pipeline Data Mapping`;
  };

  getNewInstance = (newData = this.getNewObjectFields()) => {
    return new PipelineDataMappingModel(
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

export default PipelineDataMappingModel;


