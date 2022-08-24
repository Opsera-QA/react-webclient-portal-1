import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import CreateSalesforceWorkflowWizardConfirmSalesforceFlowSelectionButton
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/selection/CreateSalesforceWorkflowWizardConfirmSalesforceFlowSelectionButton";

export const SALESFORCE_FLOW_OPTIONS = {
  SALESFORCE_ORGANIZATION_SYNC: "salesforce_organization_sync",
  SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING: "salesforce_organization_sync_with_unit_testing",
  SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP: "salesforce_organization_sync_with_unit_testing_and_backup",
  SALESFORCE_ORGANIZATION_SYNC_TASK: "salesforce_organization_sync_task",
  SALESFORCE_PROFILE_MIGRATION: "salesforce_profile_migration",
  SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC: "salesforce_profile_migration_organization_sync",
  SALESFORCE_TO_GIT_MERGE_SYNC: "salesforce_to_git_merge_sync",
};

export default function CreateSalesforceWorkflowWizardFlowSelectionScreen({
  className,
  selectedFlow,
  setSelectedFlow,
  setPipelineId,
  setPipeline,
  setCurrentScreen,
  setIsTaskFlag,
}) {
  return (
    <div className={className}>
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC}
        text={"Salesforce Organization Sync: Basic"}
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
          SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING
        }
        text={"Salesforce Organization Sync: Include Unit Testing"}
        description={`
        Set up an Organization Sync workflow that includes an explicit unit testing step. 
        `}
        className={"mb-2"}
        disabled={true}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={
          SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP
        }
        text={
          "Salesforce Organization Sync: Include Unit Testing and Backup Option"
        }
        description={`
        Set up an Organization Sync workflow that includes an explicit unit testing step and backup step that run prior to deployment. 
        `}
        className={"mb-2"}
        disabled={true}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK}
        text={"Salesforce Organization Sync Task"}
        description={`
        Setup an Organization Sync task to run on demand. This will move metadata into a specific branch for users to make modifications and then use it for a later deployment.
        `}
        className={"mb-2"}
        disabled={false}
      />
      <CreateSalesforceWorkflowWizardConfirmSalesforceFlowSelectionButton
        selectedFlow={selectedFlow}
        setPipelineId={setPipelineId}
        setPipeline={setPipeline}
        setIsTaskFlag={setIsTaskFlag}
        setCurrentScreen={setCurrentScreen}
      />
      <div>Coming Soon</div>
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={SALESFORCE_FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION}
        text={"Salesforce Profile Migration: Basic"}
        disabled={true}
        className={"mb-2"}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={
          SALESFORCE_FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC
        }
        text={"Salesforce Profile Migration: Organization Sync"}
        disabled={true}
        className={"mb-2"}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC}
        text={"Salesforce to Git Merge Sync"}
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
  setPipelineId: PropTypes.func,
  setPipeline: PropTypes.func,
  setIsTaskFlag: PropTypes.bool,
  className: PropTypes.string,
};


