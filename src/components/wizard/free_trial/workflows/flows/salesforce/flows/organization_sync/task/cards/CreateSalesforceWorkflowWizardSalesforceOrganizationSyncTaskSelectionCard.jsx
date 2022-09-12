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
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function CreateSalesforceWorkflowWizardSalesforceOrganizationSyncTaskSelectionCard(
  {
    selectedFlow,
    taskCounts,
    hasExpiration,
    handleFlowSelection,
    handleAccountTaskLimitReachedFlowSelection,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  const templateIdentifier = taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.FREE_TRIAL_ORGANIZATION_SYNC_TASK;
  const currentCount = DataParsingHelper.parseInteger(taskCounts?.[templateIdentifier], 0);
  const allowedCount = hasExpiration === false ? 10 : 1;
  const disabled = taskCounts == null || currentCount >= allowedCount;

  const onClickFunction = (selectedOption) => {
    if (disabled === true) {
      handleAccountTaskLimitReachedFlowSelection(templateIdentifier);
      return;
    }

    handleFlowSelection(selectedOption);
  };

  return (
    <WorkflowOptionCardBase
      option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK}
      selectedOption={selectedFlow}
      title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_TASK}
      subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_ORGANIZATION_SYNC_TASK}
      icon={faSalesforce}
      iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
      description={`
        Sync your development org’s with other streams by running on demand Org Sync Task.
      `}
      onClickFunction={currentCount == null ? undefined : onClickFunction}
      workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
    />
  );
}

CreateSalesforceWorkflowWizardSalesforceOrganizationSyncTaskSelectionCard.propTypes = {
  selectedFlow: PropTypes.string,
  taskCounts: PropTypes.object,
  handleFlowSelection: PropTypes.func,
  hasExpiration: PropTypes.bool,
  handleAccountTaskLimitReachedFlowSelection: PropTypes.func,
};


