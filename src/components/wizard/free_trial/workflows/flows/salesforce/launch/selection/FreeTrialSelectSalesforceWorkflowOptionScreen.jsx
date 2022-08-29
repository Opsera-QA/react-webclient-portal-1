import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CreateSalesforceWorkflowWizard
  from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import useComponentStateReference from "hooks/useComponentStateReference";
import { workspaceActions } from "components/workspace/workspace.actions";
import { workspaceConstants } from "components/workspace/workspace.constants";
import { PIPELINE_TYPES } from "components/common/list_of_values_input/pipelines/types/pipeline.types";
import { isTaskTypeOfCategory, TASK_TYPE_CATEGORIES } from "components/tasks/task.types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import {
  LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/FreeTrialLaunchSalesforceWorkflowWizardOverlay";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption
  from "components/wizard/free_trial/workflows/flows/salesforce/selection/FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption";
import FreeTrialLaunchSalesforceWorkflowScreen
  from "components/wizard/free_trial/workflows/flows/salesforce/launch/FreeTrialLaunchSalesforceWorkflowScreen";
import SelectionIconCardBase from "components/common/card_containers/SelectionIconCardBase";
import IconTitleBar from "components/common/fields/title/IconTitleBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SalesforceSelectionCardBase from "temp-library-components/cards/salesforce/SalesforceSelectionCardBase";

export default function FreeTrialSelectSalesforceWorkflowOptionScreen(
  {
    currentScreen,
    setCurrentScreen,
    isLoading,
    workspaceItems,
    className,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mt-3 mb-4 mx-3"}
          subheaderText={"Would you like to create a new Salesforce Workflow or launch an existing one?"}
        />
      </CenteredContentWrapper>
      <Row>
        <Col xs={0} sm={0} md={0} lg={2} xl={3} />
        <Col xs={12} sm={6} md={6} lg={4} xl={3}>
          <SalesforceSelectionCardBase
            selectedOption={currentScreen}
            option={LAUNCH_SALESFORCE_WORKFLOW_WIZARD_SCREENS.CREATE_SALESFORCE_WORKFLOW_SCREEN}
            title={"Create Salesforce Workflow"}
            subTitle={"Set up a new Salesforce Workflow"}
            onClickFunction={setCurrentScreen}
          />
        </Col>
        <Col xs={12} sm={6} md={6} lg={4} xl={3}>
          <FreeTrialSelectSalesforceWorkflowLaunchExistingWorkflowRadioOption
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
            isLoading={isLoading}
            workspaceItems={workspaceItems}
            className={"mb-2"}
          />
        </Col>
        <Col xs={0} sm={0} md={0} lg={2} xl={3} />
      </Row>
    </div>
  );
}

FreeTrialSelectSalesforceWorkflowOptionScreen.propTypes = {
  currentScreen: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  workspaceItems: PropTypes.array,
};


