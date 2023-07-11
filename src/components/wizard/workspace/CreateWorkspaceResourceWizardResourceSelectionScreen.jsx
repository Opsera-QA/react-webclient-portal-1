import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OpseraInfinityLogoSelectionCardBase
from "temp-library-components/cards/opsera/OpseraInfinityLogoSelectionCardBase";
import GitSelectionCardBase from "temp-library-components/cards/git/GitSelectionCardBase";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenterOverlayContainer from "components/common/overlays/center/CenterOverlayContainer";
import WorkspaceResourceOptionCardBase, {
  WORKSPACE_RESOURCE_TYPES,
  WORKSPACE_RESOURCE_TYPE_LABELS,
} from "components/wizard/workspace/WorkspaceResourceOptionCardBase";
import {CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS} from "components/wizard/workspace/CreateWorkspaceResourceWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import ExternalPageLink from "components/common/links/ExternalPageLink";
import {faQuestionCircle} from "@fortawesome/pro-light-svg-icons";
import {EXTERNAL_LINKS} from "assets/links/externalLinks";

export default function CreateWorkspaceResourceWizardResourceSelectionScreen(
  {
    setCurrentScreen,
  }) {
  const { toastContext } = useComponentStateReference();

  const handleFlowSelectionButton = (selectedFlow) => {
    switch (selectedFlow) {
    case WORKSPACE_RESOURCE_TYPES.PIPELINE:
      setCurrentScreen(CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.CREATE_PIPELINE_SCREEN);
      return;
    case WORKSPACE_RESOURCE_TYPES.TASK:
      setCurrentScreen(CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.CREATE_TASK_SCREEN);
      return;
    case WORKSPACE_RESOURCE_TYPES.TOOL:
      setCurrentScreen(CREATE_WORkSPACE_RESOURCE_WIZARD_SCREENS.CREATE_TOOL_SCREEN);
      return;
    }
  };

  const getButtonContainer = () => {
    return (
      <>
        <div className={"mb-1 mx-3"}>
          <ExternalPageLink
            link={EXTERNAL_LINKS.FREQUENTLY_ASKED_QUESTIONS}
            icon={faQuestionCircle}
            linkText={"Frequently Asked Questions"}
          />
        </div>
        <OverlayWizardButtonContainerBase />
      </>
    );
  };

  return (
    <CenterOverlayContainer
      titleText={"Create a New Workspace Resource"}
      showCloseButton={false}
      buttonContainer={getButtonContainer()}
    >
      <div className={"m-4"}>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={"What kind of Resource would you like to create today?"}
        />
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={4}>
            <WorkspaceResourceOptionCardBase
              option={WORKSPACE_RESOURCE_TYPES.PIPELINE}
              description={"Set up a new Pipeline"}
              onClickFunction={handleFlowSelectionButton}
            />
            <div className={"d-md-block d-lg-block d-xl-none mb-2"} />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={4}>
            <div className={"d-sm-block d-md-none d-lg-none d-xl-none mt-4"} />
            <WorkspaceResourceOptionCardBase
              option={WORKSPACE_RESOURCE_TYPES.TASK}
              description={"Set up a new Task"}
              onClickFunction={handleFlowSelectionButton}
            />
            <div className={"d-md-block d-lg-block d-xl-none mb-4"} />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={4}>
            <div className={"d-md-block d-lg-block d-xl-none mt-4"} />
            <WorkspaceResourceOptionCardBase
              option={WORKSPACE_RESOURCE_TYPES.TOOL}
              description={"Set up a new Tool Registry Item"}
              onClickFunction={handleFlowSelectionButton}
            />
          </Col>
        </Row>
      </div>
    </CenterOverlayContainer>
  );
}

CreateWorkspaceResourceWizardResourceSelectionScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
};

