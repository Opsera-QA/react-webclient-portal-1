import React, { useState } from "react";
import PropTypes from "prop-types";
import PipelineTemplateCardSelectionInput
  from "components/common/list_of_values_input/pipelines/templates/selection/PipelineTemplateCardSelectionInput";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";

const FLOW_OPTIONS = {
  SALESFORCE_ORGANIZATION_SYNC: "salesforce_organization_sync",
  SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING: "salesforce_organization_sync_with_unit_testing",
  SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP: "salesforce_organization_sync_with_unit_testing_and_backup",
  SALESFORCE_TO_ORGANIZATION_SYNC_TASK: "salesforce_organization_sync_with_unit_testing_and_backup",
  SALESFORCE_PROFILE_MIGRATION: "salesforce_profile_migration",
  SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC: "salesforce_profile_migration_organization_sync",
  SALESFORCE_TO_GIT_MERGE_SYNC: "salesforce_to_git_merge_sync",
};

export default function CreateSalesforcePipelineWizardSelectFlowScreen(
  {
    className,
    selectedOption,
    setSelectedOption,
  }) {
  return (
    <div className={className}>
      <WizardSelectionRadioOption
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={FLOW_OPTIONS.SALESFORCE_TO_ORGANIZATION_SYNC_TASK}
        text={"Salesforce Organization Sync: Basic"}
        description={`
        Set up a basic Organization Sync workflow for syncing your Salesforce Organizations. 
        This operation will allow you to select modified files from your Git repository or Salesforce Organization and move it to the next organization.
        `}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING}
        text={"Salesforce Organization Sync: Include Unit Testing"}
        description={`
        Set up an Organization Sync workflow that includes an explicit unit testing step. 
        `}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP}
        text={"Salesforce Organization Sync: Include Unit Testing and Backup Option"}
        description={`
        Set up an Organization Sync workflow that includes an explicit unit testing step and backup step that run prior to deployment. 
        `}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={FLOW_OPTIONS.SALESFORCE_TO_ORGANIZATION_SYNC_TASK}
        text={"Salesforce to Organization Sync Task"}
        description={`
        Setup an Organization Sync task to run on demand. This will move metadata into a specific branch for users to make modifications and then use it for a later deployment.
        `}
      />
      <div>Coming Soon</div>
      <WizardSelectionRadioOption
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION}
        text={"Salesforce Profile Migration: Basic"}
        disabled={true}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC}
        text={"Salesforce Profile Migration: Organization Sync"}
        disabled={true}
      />
      <WizardSelectionRadioOption
        onClickFunction={setSelectedOption}
        selectedOption={selectedOption}
        option={FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION}
        text={"Salesforce to Git Merge Sync"}
        disabled={true}
      />
    </div>
  );
}

CreateSalesforcePipelineWizardSelectFlowScreen.propTypes = {
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  className: PropTypes.string,
};


