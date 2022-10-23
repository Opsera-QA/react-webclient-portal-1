import ModelBase, { DataState } from "core/data_model/model.base";
import ScriptLibraryRoleHelper from "@opsera/know-your-role/roles/registry/script_library/scriptLibraryRole.helper";
import scriptsLibraryMetadata from "@opsera/definitions/constants/registry/script_library/scriptsLibrary.metadata";
import scriptsActions from "components/inventory/scripts/scripts-actions";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import pipelineInstructionsActions from "components/settings/pipelines/instructions/pipelineInstructions.actions";

export default class PipelineInstructionsModel extends ModelBase {
  constructor(
    data,
    newModel,
    setStateFunction,
    loadDataFunction,
  ) {
    super(
      data,
      scriptsLibraryMetadata,
      newModel,
      setStateFunction,
      loadDataFunction,
    );
    this.scriptPulled = false;
  }

  canCreate = () => {
    return ScriptLibraryRoleHelper.canCreateScript(
      this.userData,
    );
  };

  createModel = async () => {
    const canCreate = this.canCreate();

    if (canCreate !== true) {
      throw "Access Denied";
    }

    const response = await pipelineInstructionsActions.createScriptV2(
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
    return ScriptLibraryRoleHelper.canUpdateScript(
      this.userData,
      this.data,
    );
  };

  saveModel = async () => {
    const canUpdate = this.canUpdate();

    if (canUpdate !== true) {
      throw "Access Denied";
    }

    const response = await pipelineInstructionsActions.updateScriptV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
    this.updateState();

    return response;
  };

  canDelete = () => {
    return ScriptLibraryRoleHelper.canDeleteScript(
      this.userData,
      this.data,
    );
  };

  canEditAccessRoles = () => {
    return ScriptLibraryRoleHelper.canEditAccessRoles(
      this.userData,
      this.data,
    );
  };

  deleteModel = async () => {
    const canDelete = this.canDelete();

    if (canDelete !== true) {
      throw "Access Denied";
    }

    const response = await pipelineInstructionsActions.deleteScriptV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
    this.dataState = DataState.DELETED;

    if (this.loadDataFunction) {
      await this.loadDataFunction();
    }

    this.unselectModel();

    return response;
  };

  pullScriptFromDb = async () => {
    const canPullScriptFromDb = ScriptLibraryRoleHelper.canGetEncryptedScriptValue(
      this.userData,
      this.data,
    );

    // if (canPullScriptFromDb !== true) {
    //   throw "Access Denied";
    // }

    const response = await scriptsActions.getScriptValue(
      this.getAccessToken,
      this.cancelTokenSource,
      this.getMongoDbId(),
    );
    const value = response?.data?.data;
    this.scriptPulled = true;

    if (value) {
      this.setData("value", value, false);
      this.updateState();
    }

    return value;
  };

  hasScriptBeenPulled = () => {
    return this.scriptPulled === true;
  };

  clone = () => {
    const newScript = new PipelineInstructionsModel(
      DataParsingHelper.cloneDeep(this.data),
      this.isNew(),
      this.setStateFunction,
      this.loadDataFunction,
    );

    newScript.getAccessToken = this.getAccessToken;
    newScript.cancelTokenSource = this.cancelTokenSource;
    newScript.userData = this.userData;

    return newScript;
  };
}


