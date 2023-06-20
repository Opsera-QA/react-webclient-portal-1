import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
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
import CreateAzureDevopsToolButton from "./CreateAzureDevopsToolButton";
import modelHelpers from "../../../../../../../common/model/modelHelpers";
import wizardPortalMetadata from "../../../../wizardPortalMetadata";
import BooleanToggleInput from "../../../../../../../common/inputs/boolean/BooleanToggleInput";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";
import useComponentStateReference from "../../../../../../../../hooks/useComponentStateReference";

export default function CreateWorkflowWizardCreateAzureDevopsToolEditorPanel({
  gitToolModel,
  setGitToolModel,
  className,
  gitToolId,
  setGitToolId,
  onSuccessFunction,
  backButtonFunction,
  setButtonContainer,
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
          <CreateAzureDevopsToolButton
            gitToolModel={gitToolModel}
            onSuccessFunction={onSuccessFunction}
            gitToolId={gitToolId}
            setGitToolId={setGitToolId}
            customLabel={"Next"}
            icon={faArrowRight}
            variant={"success"}
            currentCount={currentToolCount}
          />
        </>
      );
    } else {
      return (
        <CreateAzureDevopsToolButton
          gitToolModel={gitToolModel}
          onSuccessFunction={onSuccessFunction}
          gitToolId={gitToolId}
          setGitToolId={setGitToolId}
          customLabel={"Next"}
          icon={faArrowRight}
          variant={"success"}
          currentCount={currentToolCount}
        />
      );
    }
  };

  const canCreateTool = () => {
    return RegistryToolRoleHelper.canCreateRegistryTool(
      userData,
    );
  };

  if (gitToolModel == null) {
    return null;
  }

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

  return (
    <div className={className}>
      <CreateWorkflowWizardRegisterToolHeaderText
        toolType={toolType}
        className={"mt-3"}
        toolName={"Azure Devops"}
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
              toolIdentifier={
                toolIdentifierConstants.TOOL_IDENTIFIERS.AZURE_DEVOPS
              }
              setCurrentToolCount={setCurrentToolCount}
            />
          </Col>
          {createNewToolToggle()}
          {(canCreateTool() && (wizardMetadata?.getData("newTool") || gitToolId)) && (
            <>
              <Col sm={12}>
                <VaultTextInput
                  dataObject={gitToolModel}
                  setDataObject={setGitToolModel}
                  fieldName={"accessToken"}
                />
              </Col>
              <Col sm={12}>
                <TextInputBase
                  dataObject={gitToolModel}
                  setDataObject={setGitToolModel}
                  fieldName={"organization"}
                />
              </Col>
            </>
          )}
        </Row>
      </Form>
    </div>
  );
}

CreateWorkflowWizardCreateAzureDevopsToolEditorPanel.propTypes = {
  gitToolModel: PropTypes.object,
  setGitToolModel: PropTypes.func,
  gitToolId: PropTypes.string,
  setGitToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
  className: PropTypes.string,
  backButtonFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
  toolType: PropTypes.string,
  onSkipConnectionTestFunction: PropTypes.func,
  connectionFailure: PropTypes.bool,
  setConnectionFailure: PropTypes.func,
};
