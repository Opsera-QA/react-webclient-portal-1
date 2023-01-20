import ModelBase, { DataState } from "core/data_model/model.base";
import parametersActions from "components/inventory/parameters/parameters-actions";
import customParametersMetadata
  from "@opsera/definitions/constants/registry/custom_parameters/customParameters.metadata";
import CustomParameterRoleHelper from "@opsera/know-your-role/roles/registry/parameters/customParameterRole.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default class ParameterModel extends ModelBase {
  constructor(
    data,
    newModel,
    setStateFunction,
    loadDataFunction,
  ) {
    super(
      data,
      customParametersMetadata,
      newModel,
      setStateFunction,
      loadDataFunction,
    );
  }

  createModel = async () => {
    const canCreate = this.canCreate();

    if (canCreate !== true) {
      throw "Access Denied";
    }

    const response = await parametersActions.createParameterV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );

    const parameter = response?.data;

    if (parameter) {
      this.data = parameter;
      this.updateState();
    }

    return response;
  };

  saveModel = async () => {
    const canUpdate = this.canUpdate();

    if (canUpdate !== true) {
      throw "Access Denied";
    }

    return await parametersActions.updateParameterV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
  };

  deleteModel = async () => {
    const canDelete = this.canDelete();

    if (canDelete !== true) {
      throw "Access Denied";
    }

    const response = await parametersActions.deleteParameterV2(
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

  canCreate = () => {
    return CustomParameterRoleHelper.canCreateParameters(
      this.userData,
    );
  };

  canUpdate = () => {
    return CustomParameterRoleHelper.canUpdateParameter(
      this.userData,
      this.data,
    );
  };

  canDelete = () => {
    return CustomParameterRoleHelper.canDeleteParameter(
      this.userData,
      this.data,
    );
  };

  canEditAccessRoles = () => {
    return CustomParameterRoleHelper.canEditAccessRoles(
      this.userData,
      this.data,
    );
  };

  getValueFromVault = async (fieldName = "value") => {
    const response = await parametersActions.getParameterValueFromVaultV2(this.getAccessToken, this.cancelTokenSource, this.getData("_id"));
    const value = response?.data?.data;

    if (value) {
      this.setData(fieldName, value, false);
    }

    return value;
  };

  clone = () => {
    const newParameter = new ParameterModel(
      DataParsingHelper.cloneDeep(this.data),
      this.isNew(),
      this.setStateFunction,
      this.loadDataFunction,
    );

    newParameter.getAccessToken = this.getAccessToken;
    newParameter.cancelTokenSource = this.cancelTokenSource;
    newParameter.userData = this.userData;

    return newParameter;
  };
}

