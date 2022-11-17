import ModelBase, { DataState } from "core/data_model/model.base";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import pipelineInstructionsMetadata
  from "@opsera/definitions/constants/settings/pipelines/instructions/pipelineInstructions.metadata";
import PipelineInstructionsRoleHelper
  from "@opsera/know-your-role/roles/settings/pipelines/instructions/pipelineInstructionsRole.helper";
import {pipelineInstructionsActions} from "components/workflow/instructions/pipelineInstructions.actions";

export default class PipelineInstructionsModel extends ModelBase {
  constructor(
    data,
    newModel,
    setStateFunction,
    loadDataFunction,
  ) {
    super(
      data,
      pipelineInstructionsMetadata,
      newModel,
      setStateFunction,
      loadDataFunction,
    );
  }

  canCreate = () => {
    return PipelineInstructionsRoleHelper.canCreatePipelineInstructions(
      this.userData,
    );
  };

  createModel = async () => {
    const canCreate = this.canCreate();

    if (canCreate !== true) {
      throw "Access Denied";
    }

    const response = await pipelineInstructionsActions.createPipelineInstructions(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );

    const script = response?.data;

    if (script) {
      this.data = script;
      this.updateState();
    }

    return response;
  };

  canUpdate = () => {
    return PipelineInstructionsRoleHelper.canUpdatePipelineInstructions(
      this.userData,
      this.data,
    );
  };

  saveModel = async () => {
    const canUpdate = this.canUpdate();

    if (canUpdate !== true) {
      throw "Access Denied";
    }

    const response = await pipelineInstructionsActions.updatePipelineInstructions(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
    this.updateState();

    return response;
  };

  canDelete = () => {
    return PipelineInstructionsRoleHelper.canDeletePipelineInstructions(
      this.userData,
      this.data,
    );
  };

  canEditAccessRoles = () => {
    return PipelineInstructionsRoleHelper.canEditAccessRoles(
      this.userData,
      this.data,
    );
  };

  deleteModel = async () => {
    const canDelete = this.canDelete();

    if (canDelete !== true) {
      throw "Access Denied";
    }

    const response = await pipelineInstructionsActions.deletePipelineInstructionsById(
      this.getAccessToken,
      this.cancelTokenSource,
      this.getMongoDbId(),
    );
    this.dataState = DataState.DELETED;

    if (this.loadDataFunction) {
      await this.loadDataFunction();
    }

    return response;
  };

  canTransferOwnership = () => {
    return PipelineInstructionsRoleHelper.canTransferPipelineInstructionsOwnership(
      this.userData,
      this.data,
    );
  };

  transferOwnership = async (newOwnerId) => {
    const response = await pipelineInstructionsActions.transferPipelineInstructionsOwnership(
      this.getAccessToken,
      this.cancelTokenSource,
      this.getMongoDbId(),
      newOwnerId,
    );

    this.setData("owner", newOwnerId, false);

    return response;
  };

  getDetailViewTitle = () => {
    return this.getData("name");
  };

  canAcknowledgePipelineInstructions = () => {
    return PipelineInstructionsRoleHelper.canAcknowledgePipelineInstructions(
      this.userData,
      this.data,
    );
  };

  clone = () => {
    const newPipelineInstructions = new PipelineInstructionsModel(
      DataParsingHelper.cloneDeep(this.data),
      this.isNew(),
      this.setStateFunction,
      this.loadDataFunction,
    );

    newPipelineInstructions.getAccessToken = this.getAccessToken;
    newPipelineInstructions.cancelTokenSource = this.cancelTokenSource;
    newPipelineInstructions.userData = this.userData;

    return newPipelineInstructions;
  };

  getType = () => {
    return "Pipeline Instructions";
  }
}


