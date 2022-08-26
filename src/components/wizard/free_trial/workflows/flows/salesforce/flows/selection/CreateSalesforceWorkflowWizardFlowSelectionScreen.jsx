import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import {
  salesforceWorkflowFlowConstants,
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/selection/CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton";
import { DividerWithCenteredText } from "temp-library-components/divider/DividerWithCenteredText";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import BackButton from "components/common/buttons/back/BackButton";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";

export default function CreateSalesforceWorkflowWizardFlowSelectionScreen(
  {
    className,
    selectedFlow,
    setSelectedFlow,
    setCurrentScreen,
    stepBackFromWizardFunction,
  }) {
  return (
    <div className={className}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mb-4 mx-3"}
          subheaderText={"What kind of Salesforce Workflow would you like to create today?"}
        />
      </CenteredContentWrapper>
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC}
        text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC}
        description={`
        Set up a basic Organization Sync workflow for syncing your Salesforce Organizations. 
        This operation will allow you to select modified files from your Git repository or Salesforce Organization and move it to the next organization.
        `}
        className={"mb-2"}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={
          salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING
        }
        text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING}
        description={`
        Set up an Organization Sync workflow that includes an explicit unit testing step. 
        `}
        className={"mb-2"}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={
          salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP
        }
        text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP}
        description={`
        Set up an Organization Sync workflow that includes an explicit unit testing step and backup step that run prior to deployment. 
        `}
        className={"mb-2"}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK}
        text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_TASK}
        description={`
        Setup an Organization Sync task to run on demand. This will move metadata into a specific branch for users to make modifications and then use it for a later deployment.
        `}
        className={"mb-2"}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC}
        text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC}
        description={`
          Handle a Merge Sync on demand from Salesforce to Git
        `}
        disabled={true}
        className={"mb-2"}
      />
      <ButtonContainerBase
        className={"mt-3"}
        leftSideButtons={
          <BackButton
            size={"md"}
            backButtonFunction={stepBackFromWizardFunction}
            icon={faArrowLeft}
          />
        }
      >
        <CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton
          selectedFlow={selectedFlow}
          setCurrentScreen={setCurrentScreen}
        />
      </ButtonContainerBase>
      <DividerWithCenteredText text={"Coming Soon"} className={"m-4"} />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION}
        text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_PROFILE_MIGRATION}
        disabled={true}
        className={"mb-2"}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={
          salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC
        }
        text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC}
        disabled={true}
        className={"mb-2"}
      />
    </div>
  );
}

CreateSalesforceWorkflowWizardFlowSelectionScreen.propTypes = {
  selectedFlow: PropTypes.string,
  setSelectedFlow: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  stepBackFromWizardFunction: PropTypes.func,
  className: PropTypes.string,
};


