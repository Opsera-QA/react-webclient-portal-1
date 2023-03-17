import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import VaultTextInput from "components/common/inputs/text/VaultTextInput";
import Row from "react-bootstrap/Row";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import CreateSalesforceWorkflowWizardSelectToolInputBase from "components/wizard/portal/workflows/flows/salesforce/CreateSalesforceWorkflowWizardSelectToolInputBase";
import { toolIdentifierConstants } from "components/admin/tools/identifiers/toolIdentifier.constants";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import {
  faArrowRight,
  faTriangleExclamation,
} from "@fortawesome/pro-light-svg-icons";
import CreateWorkflowWizardRegisterToolHeaderText from "components/wizard/portal/workflows/flows/tools/CreateWorkflowWizardRegisterToolHeaderText";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import { getLargeVendorIconFromToolIdentifier } from "components/common/helpers/icon-helpers";
import useComponentStateReference from "hooks/useComponentStateReference";
import CreateWorkflowWizardRegisterAccountContainer from "components/wizard/portal/workflows/flows/tools/CreateWorkflowWizardRegisterAccountContainer";
import VanityButtonBase from "../../../../../../../temp-library-components/button/VanityButtonBase";
import CreateJenkinsToolButton from "./CreateJenkinsToolButton";
import JenkinsProxyToggle from "../../../../../../inventory/tools/tool_details/tool_jobs/jenkins/JenkinsProxyToggle";
import BooleanToggleInput from "../../../../../../common/inputs/boolean/BooleanToggleInput";
import modelHelpers from "../../../../../../common/model/modelHelpers";
import wizardPortalMetadata from "../../../wizardPortalMetadata";
import RegistryToolRoleHelper from "@opsera/know-your-role/roles/registry/tools/registryToolRole.helper";

export default function CreateWorkflowWizardCreateJenkinsTool({
  className,
  jenkinsToolId,
  setJenkinsToolId,
  onSuccessFunction,
  jenkinsToolModel,
  setJenkinsToolModel,
  backButtonFunction,
  setButtonContainer,
  toolType,
  setCurrentScreen,
  connectionFailure,
  setConnectionFailure,
  onSkipConnectionTestFunction,
}) {
  const [currentToolCount, setCurrentToolCount] = useState(0);
  const { themeConstants, userData } = useComponentStateReference();
  const [wizardMetadata, setWizardMetadata] = useState(
    modelHelpers.getToolConfigurationModel({}, wizardPortalMetadata),
  );

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
  }, [jenkinsToolModel, currentToolCount, connectionFailure]);

  const getButtons = () => {
    if (connectionFailure) {
      return (
        <>
          <VanityButtonBase
            normalText={"Skip Connection Test"}
            disabled={false}
            buttonState={"ready"}
            className={"mr-2"}
            onClickFunction={onSkipConnectionTestFunction}
            tooltip={
              "The tool will not be usable in Tasks until the connection is resolved."
            }
            variant={"outline-warning"}
            icon={faTriangleExclamation}
          />
          <CreateJenkinsToolButton
            jenkinsToolModel={jenkinsToolModel}
            onSuccessFunction={onSuccessFunction}
            setJenkinsToolId={setJenkinsToolId}
            jenkinsToolId={jenkinsToolId}
            customLabel={"Next"}
            icon={faArrowRight}
            variant={"success"}
            currentCount={currentToolCount}
          />
        </>
      );
    } else {
      return (
        <CreateJenkinsToolButton
          jenkinsToolModel={jenkinsToolModel}
          onSuccessFunction={onSuccessFunction}
          setJenkinsToolId={setJenkinsToolId}
          jenkinsToolId={jenkinsToolId}
          customLabel={"Next"}
          icon={faArrowRight}
          variant={"success"}
          currentCount={currentToolCount}
        />
      );
    }
  };

  if (jenkinsToolModel == null) {
    return null;
  }

  const getDynamicFields = () => {
    if (jenkinsToolModel.getData("proxyEnable") === true) {
      return (
        <>
          <TextInputBase
            dataObject={jenkinsToolModel}
            setDataObject={setJenkinsToolModel}
            fieldName={"proxyUserName"}
          />
          <VaultTextInput
            dataObject={jenkinsToolModel}
            setDataObject={setJenkinsToolModel}
            fieldName={"proxyPassword"}
          />
          <VaultTextInput
            dataObject={jenkinsToolModel}
            setDataObject={setJenkinsToolModel}
            fieldName={"jPassword"}
          />
        </>
      );
    }

    return (
      <VaultTextInput
        dataObject={jenkinsToolModel}
        setDataObject={setJenkinsToolModel}
        fieldName={"jAuthToken"}
      />
    );
  };

  const canCreateTool = () => {
    return RegistryToolRoleHelper.canCreateRegistryTool(
        userData,
    );
  };


  const createNewToolToggle = () => {
    if (!jenkinsToolId && canCreateTool()) {
      return (
        <Col lg={12}>
          <BooleanToggleInput
            disabled={jenkinsToolId}
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
      <CreateWorkflowWizardRegisterAccountContainer>
        <div>
          <SelectionIconCardBase
            selectedOption={"jenkins"}
            option={"jenkins"}
            highlightedBorderColor={
              themeConstants.COLOR_PALETTE.SALESFORCE_BLUE
            }
            titleBar={
              <IconTitleBar
                formattedIcon={getLargeVendorIconFromToolIdentifier(
                  toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS,
                )}
                title={`Jenkins`}
                titleClassName={"mx-auto"}
                subTitleClassName={"mx-auto"}
              />
            }
          />
        </div>
        <CreateWorkflowWizardRegisterToolHeaderText
          toolType={toolType}
          toolName={"Jenkins"}
          className={"mt-3"}
          canCreateTool={canCreateTool()}
        />
        <Row>
          <Col sm={12}>
            <CreateSalesforceWorkflowWizardSelectToolInputBase
              model={jenkinsToolModel}
              setModel={setJenkinsToolModel}
              toolId={jenkinsToolId}
              setToolId={setJenkinsToolId}
              toolIdentifier={toolIdentifierConstants.TOOL_IDENTIFIERS.JENKINS}
              setCurrentToolCount={setCurrentToolCount}
            />
          </Col>
          {createNewToolToggle()}
          {(canCreateTool() && (wizardMetadata?.getData("newTool") || jenkinsToolId)) && (
            <>
              <Col sm={12}>
                <TextInputBase
                  dataObject={jenkinsToolModel}
                  setDataObject={setJenkinsToolModel}
                  fieldName={"jenkinsUrl"}
                />
              </Col>
              <Col sm={12}>
                <TextInputBase
                  dataObject={jenkinsToolModel}
                  setDataObject={setJenkinsToolModel}
                  fieldName={"jenkinsPort"}
                />
              </Col>
              <Col sm={12}>
                <TextInputBase
                  dataObject={jenkinsToolModel}
                  setDataObject={setJenkinsToolModel}
                  fieldName={"jUserId"}
                />
              </Col>
              <Col sm={12}>
                <JenkinsProxyToggle
                  dataObject={jenkinsToolModel}
                  setDataObject={setJenkinsToolModel}
                  fieldName={"proxyEnable"}
                />
              </Col>
              <Col sm={12}>
                <BooleanToggleInput
                  dataObject={jenkinsToolModel}
                  setDataObject={setJenkinsToolModel}
                  fieldName={"autoScaleEnable"}
                />
              </Col>
              <Col sm={12}>{getDynamicFields()}</Col>
            </>
          )}
        </Row>
      </CreateWorkflowWizardRegisterAccountContainer>
    </div>
  );
}

CreateWorkflowWizardCreateJenkinsTool.propTypes = {
  jenkinsToolModel: PropTypes.object,
  setJenkinsToolModel: PropTypes.func,
  jenkinsToolId: PropTypes.string,
  setJenkinsToolId: PropTypes.func,
  onSuccessFunction: PropTypes.func,
  className: PropTypes.string,
  toolType: PropTypes.string,
  setButtonContainer: PropTypes.func,
  backButtonFunction: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  onSkipConnectionTestFunction: PropTypes.func,
  connectionFailure: PropTypes.bool,
  setConnectionFailure: PropTypes.func,
};
