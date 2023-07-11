import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import VanitySetTextInputBase from "temp-library-components/inputs/VanitySetTextInputBase";
import Col from "react-bootstrap/Col";
import GithubTwoFactorAuthenticationBooleanToggleInput from "components/inventory/tools/tool_details/tool_jobs/github/GithubTwoFactorAuthenticationBooleanToggleInput";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import CreateFreeTrialGithubToolButton from "components/wizard/portal/workflows/flows/tools/git/github/CreateFreeTrialGithubToolButton";
import Row from "react-bootstrap/Row";
import CreateSalesforceWorkflowWizardSelectToolInputBase from "components/wizard/portal/workflows/flows/salesforce/CreateSalesforceWorkflowWizardSelectToolInputBase";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import { Form } from "react-bootstrap";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import {
  faArrowRight,
  faTriangleExclamation,
} from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizardRegisterToolHeaderText from "components/wizard/portal/workflows/flows/tools/CreateWorkflowWizardRegisterToolHeaderText";
import VanityButtonBase from "../../../../../../../../temp-library-components/button/VanityButtonBase";
import CreateFreeTrialSalesforceToolButton from "../../salesforce/CreateFreeTrialSalesforceToolButton";
import BooleanToggleInput from "../../../../../../../common/inputs/boolean/BooleanToggleInput";
import modelHelpers from "../../../../../../../common/model/modelHelpers";
import { mergeSyncTaskGitConfigurationMetadata } from "../../../../../../../tasks/details/tasks/merge_sync_task/git_to_git/mergeSyncTaskGitConfiguration.metadata";
import { TASK_TYPES } from "../../../../../../../tasks/task.types";
import AzureConnectionMetadata from "../../../../../../../inventory/tools/tool_details/tool_jobs/azure/azure-connection-metadata";
import wizardPortalMetadata from "../../../../wizardPortalMetadata";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";
import useComponentStateReference from "../../../../../../../../hooks/useComponentStateReference";

export default function CreateWorkflowWizardCreateGithubToolEditorPanel({
  className,
  gitToolId,
  setGitToolId,
  onSuccessFunction,
  gitToolModel,
  setGitToolModel,
  setButtonContainer,
  backButtonFunction,
  toolType,
  onSkipConnectionTestFunction,
  connectionFailure,
  setConnectionFailure,
}) {
  const [currentToolCount, setCurrentToolCount] = useState(0);
  const [wizardMetadata, setWizardMetadata] = useState(
    modelHelpers.getToolConfigurationModel({}, wizardPortalMetadata),
  );
  const { userData } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        >
          {getButtons()}
        </OverlayWizardButtonContainerBase>,
      );
    }
  }, [gitToolModel, currentToolCount, connectionFailure]);

  const getButtons = () => {
    if (connectionFailure) {
      return (
        <>
          <VanityButtonBase
            normalText={"Skip Connection Test"}
            disabled={false}
            className={"mr-2"}
            buttonState={"ready"}
            onClickFunction={onSkipConnectionTestFunction}
            tooltip={
              "The tool will not be usable in Tasks until the connection is resolved."
            }
            variant={"outline-warning"}
            icon={faTriangleExclamation}
          />
          <CreateFreeTrialGithubToolButton
            gitToolModel={gitToolModel}
            setGitToolId={setGitToolId}
            gitToolId={gitToolId}
            onSuccessFunction={onSuccessFunction}
            customLabel={"Next"}
            icon={faArrowRight}
            variant={"success"}
            currentCount={currentToolCount}
          />
        </>
      );
    } else {
      return (
        <CreateFreeTrialGithubToolButton
          gitToolModel={gitToolModel}
          setGitToolId={setGitToolId}
          gitToolId={gitToolId}
          onSuccessFunction={onSuccessFunction}
          customLabel={"Next"}
          icon={faArrowRight}
          variant={"success"}
          currentCount={currentToolCount}
        />
      );
    }
  };

  const getDynamicFields = () => {
    if (gitToolModel?.getData("twoFactorAuthentication") === true) {
      return (
        <div>
          <VaultTextInput
            dataObject={gitToolModel}
            setDataObject={setGitToolModel}
            fieldName={"secretPrivateKey"}
          />
          <VaultTextInput
            dataObject={gitToolModel}
            setDataObject={setGitToolModel}
            fieldName={"secretAccessTokenKey"}
          />
        </div>
      );
    }

    return (
      <VaultTextInput
        dataObject={gitToolModel}
        setDataObject={setGitToolModel}
        fieldName={"accountPassword"}
      />
    );
  };

  const canCreateTool = () => {
    return RegistryToolRoleHelper.canCreateRegistryTool(
      userData,
    );
  };

  const createNewToolToggle = () => {
    if (!gitToolId && canCreateTool()) {
      return (
        <Col lg={12}>
          <BooleanToggleInput
            disabled={gitToolId}
            fieldName={"newTool"}
            dataObject={wizardMetadata}
            setDataObject={setWizardMetadata}
          />
        </Col>
      );
    }
  };

  if (gitToolModel == null) {
    return null;
  }

  return (
    <div className={className}>
      <CreateWorkflowWizardRegisterToolHeaderText
        toolType={toolType}
        className={"mt-3"}
        toolName={"Github"}
        canCreateTool={canCreateTool()}
      />
      <Form>
        <Row>
          <Col sm={12}>
            <CreateSalesforceWorkflowWizardSelectToolInputBase
              model={gitToolModel}
              setModel={setGitToolModel}
              toolId={gitToolId}
              setToolId={setGitToolId}
              toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.GITHUB}
              setCurrentToolCount={setCurrentToolCount}
            />
          </Col>
          {createNewToolToggle()}
          {(canCreateTool() && (wizardMetadata?.getData("newTool") || gitToolId)) && (
            <>
              <Col sm={12}>
                <VanitySetTextInputBase
                  fieldName={"url"}
                  model={gitToolModel}
                  setModel={setGitToolModel}
                />
              </Col>
              <Col sm={12}>
                <VanitySetTextInputBase
                  fieldName={"accountUsername"}
                  model={gitToolModel}
                  setModel={setGitToolModel}
                />
              </Col>
              <Col sm={12}>
                <GithubTwoFactorAuthenticationBooleanToggleInput
                  model={gitToolModel}
                  setModel={setGitToolModel}
                />
              </Col>
              <Col sm={12}>{getDynamicFields()}</Col>
            </>
          )}
        </Row>
      </Form>
    </div>
  );
}

CreateWorkflowWizardCreateGithubToolEditorPanel.propTypes = {
  gitToolModel: PropTypes.object,
  setGitToolModel: PropTypes.func,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
  className: PropTypes.string,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
  toolType: PropTypes.string,
  onSkipConnectionTestFunction: PropTypes.func,
  connectionFailure: PropTypes.bool,
  setConnectionFailure: PropTypes.func,
};
