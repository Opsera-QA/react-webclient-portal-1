import ModelBase from "core/data_model/model.base";
import PipelineRoleHelper from "@opsera/know-your-role/roles/pipelines/pipelineRole.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import pipelineMetadata from "@opsera/definitions/constants/pipelines/pipeline.metadata";
import {pipelineHelper} from "components/workflow/pipeline.helper";

export class PipelineModel extends ModelBase {
  constructor(
    data,
    newModel,
  ) {
    super(data, pipelineMetadata, newModel);
  }

  canCreate = () => {
    return PipelineRoleHelper.canCreatePipeline(this.userData);
  };

  canUpdate = () => {
    return PipelineRoleHelper.canUpdatePipeline(
      this.userData,
      this.data,
    );
  };

  canDelete = () => {
    return PipelineRoleHelper.canDelete(
      this.userData,
      this.data,
    );
  };

  getDetailViewTitle = () => {
    return `${this.getData("name")}`;
  };

  canEditAccessRoles = () => {
    return PipelineRoleHelper.canEditAccessRoles(
      this.userData,
      this.data,
    );
  };

  canStartPipeline = () => {
    return PipelineRoleHelper.canStartPipeline(
      this.userData,
      this.data,
    );
  };

  canStopPipeline = () => {
    return PipelineRoleHelper.canStopPipeline(
      this.userData,
      this.data,
    );
  };

  getDetailViewLink = () => {
    return pipelineHelper.getModelDetailViewLink(this);
  };

  clone = () => {
    return new PipelineModel(DataParsingHelper.cloneDeep(
        { ...this.data }),
      this.isNew(),
    );
  };

  getCompletionPercentage = () => {
    return pipelineHelper.getPipelineCompletionPercentage(this.getCurrentData());
  };
}

export default PipelineModel;


