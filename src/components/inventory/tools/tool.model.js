import ModelBase from "core/data_model/model.base";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import registryToolMetadata from "@opsera/definitions/constants/registry/tools/registryTool.metadata";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";
import { toolHelper } from "components/inventory/tools/tool.helper";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import ObjectAccessRoleHelper from "@opsera/know-your-role/roles/helper/object/objectAccessRole.helper";
import toolsActions from "components/inventory/tools/tools-actions";
import vaultActions from "components/vault/vault.actions";

// TODO: We should move this to an external library in Node
export default class ToolModel extends ModelBase {
  constructor(
    tool,
    newModel,
  ) {
    super(
      tool,
      registryToolMetadata,
      newModel,
    );
  }

  createModel = async () => {
    const canCreate = this.canCreate();

    if (canCreate !== true) {
      throw "Access Denied";
    }

    return await toolsActions.createToolV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
  };

  saveModel = async () => {
    const canUpdate = this.canUpdate();

    if (canUpdate !== true) {
      throw "Access Denied";
    }

    return await toolsActions.updateToolV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
  };

  // TODO: Not used yet
  deleteModel = async () => {
    const canDelete = this.canDelete();

    if (canDelete !== true) {
      throw "Access Denied";
    }

    const vaultDeleteResponse = await vaultActions.deleteOwnerVaultRecordsForToolIdV2(this.getAccessToken, this.cancelTokenSource, this);
    if (vaultDeleteResponse?.status !== 200) {
      const errorMsg = `Error reported by services while deleting tool information from Vault. Please try again`;
      // toastContext.showErrorDialog(errorMsg);
      return;
    }

    await toolsActions.deleteToolV2(
      this.getAccessToken,
      this.cancelTokenSource,
      this,
    );
    // toastContext.showDeleteSuccessResultDialog("Tool");
    // setShowDeleteModal(false);
    history.push("/inventory/tools");
  };

  canRotateToken = () => {
    const data = this.data;
    const toolIdentifier = data?.tool_identifier;
    const canRotateToken = RegistryToolRoleHelper.canRotateRegistryToolToken(this.userData, this.data);

    switch (toolIdentifier) {
      case toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS:
        return canRotateToken === true;
      default:
        return false;
    }
  };

  canCreate = () => {
    return RegistryToolRoleHelper.canCreateRegistryTool(
      this.userData,
    );
  };

  canUpdate = () => {
    return RegistryToolRoleHelper.canUpdateRegistryTool(
      this.userData,
      this.data,
    );
  };

  canDelete = () => {
    return RegistryToolRoleHelper.canDeleteRegistryTool(
      this.userData,
      this.data,
    );
  };

  canUpdateToolConnectionDetails = () => {
    return RegistryToolRoleHelper.canUpdateRegistryToolConnectionSettings(
      this.userData,
      this.data,
    );
  };

  canUpdateRegistryToolVaultSettings = () => {
    return RegistryToolRoleHelper.canUpdateRegistryToolVaultSettings(
      this.userData,
      this.data,
    );
  };

  canTransferRegistryToolOwnership = () => {
    return RegistryToolRoleHelper.canTransferRegistryToolOwnership(
      this.userData,
      this.data,
    );
  };

  getDetailViewLink = () => {
    return toolHelper.getModelDetailViewLink(this);
  };

  getDetailViewTitle = () => {
    return `${this?.getOriginalValue("name")} Tool Details`;
  };

  hasConfigurationDetailsSet = () => {
    const configuration = DataParsingHelper.parseObject(this.getData("configuration"), null);
    return configuration != null;
  };

  canEditAccessRoles = () => {
    return RegistryToolRoleHelper.canEditAccessRoles(
      this.userData,
      this.data,
    );
  };

  canUpdateRegistryToolAccounts = () => {
    return RegistryToolRoleHelper.canUpdateRegistryToolAccounts(
      this.userData,
      this.data,
    );
  };

  canUpdateRegistryToolApplications = () => {
    return RegistryToolRoleHelper.canUpdateRegistryToolApplications(
      this.userData,
      this.data,
    );
  };

  canUpdateRegistryToolEndpoints = () => {
    return RegistryToolRoleHelper.canUpdateRegistryToolEndpoints(
      this.userData,
      this.data,
    );
  };

  canUpdateRegistryToolJobs = () => {
    return RegistryToolRoleHelper.canUpdateRegistryToolJobs(
      this.userData,
      this.data,
    );
  };

  canUpdateRegistryToolProjects = () => {
    return RegistryToolRoleHelper.canUpdateRegistryToolProjects(
      this.userData,
      this.data,
    );
  };

  canUpdateRegistryToolPathSettings = () => {
    return RegistryToolRoleHelper.canUpdateRegistryToolPathSettings(
      this.userData,
      this.data,
    );
  };

  canUpdateRegistryToolRepositories = () => {
    return RegistryToolRoleHelper.canUpdateRegistryToolRepositories(
      this.userData,
      this.data,
    );
  };

  // TODO: Make role definition for this, it currently doesn't exist even though it was in use
  canUpdateRegistryToolLicense = () => {
    return RegistryToolRoleHelper.canUpdateRegistryTool(
      this.userData,
      this.data,
    );
  };
}


