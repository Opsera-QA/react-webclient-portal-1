import React from "react";
import PropTypes from "prop-types";
import {
  salesforceWorkflowFlowConstants,
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import WorkflowOptionCardBase, {
  WORKFLOW_OPTION_TYPES,
} from "components/wizard/free_trial/workflows/flows/WorkflowOptionCardBase";
import useComponentStateReference from "hooks/useComponentStateReference";
import { taskTemplateIdentifierConstants } from "components/admin/task_templates/taskTemplateIdentifier.constants";

export default function CreateSalesforceWorkflowWizardSalesforceOrganizationSyncTaskSelectionCard(
  {
    selectedFlow,
    taskCounts,
    hasExpiration,
    handleFlowSelection,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  const fieldName = taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.FREE_TRIAL_SALESFORCE_TO_GIT_MERGE_SYNC_TASK;
  const currentCount = taskCounts?.[fieldName];
  const allowedCount = hasExpiration === false ? 10 : 1;

  return (
    <WorkflowOptionCardBase
      option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK}
      selectedOption={selectedFlow}
      title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_TASK}
      subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_ORGANIZATION_SYNC_TASK}
      icon={faSalesforce}
      iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
      description={`
        Run an Organization Sync task to run on demand.
      `}
      onClickFunction={handleFlowSelection}
      disabled={currentCount == null || currentCount >= allowedCount}
      workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
    />
  );
}

CreateSalesforceWorkflowWizardSalesforceOrganizationSyncTaskSelectionCard.propTypes = {
  selectedFlow: PropTypes.string,
  taskCounts: PropTypes.object,
  handleFlowSelection: PropTypes.func,
  hasExpiration: PropTypes.bool,
};


