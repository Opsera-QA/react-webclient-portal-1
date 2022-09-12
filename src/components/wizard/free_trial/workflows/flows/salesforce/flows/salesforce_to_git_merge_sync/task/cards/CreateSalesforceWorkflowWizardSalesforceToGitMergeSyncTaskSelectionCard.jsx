import React from "react";
import PropTypes from "prop-types";
import {
  salesforceWorkflowFlowConstants,
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import WorkflowOptionCardBase, {
  WORKFLOW_OPTION_TYPES,
} from "components/wizard/free_trial/workflows/flows/WorkflowOptionCardBase";
import {
  pipelineTemplateIdentifierConstants
} from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import { taskTemplateIdentifierConstants } from "components/admin/task_templates/taskTemplateIdentifier.constants";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";

export default function CreateSalesforceWorkflowWizardSalesforceToGitMergeSyncTaskSelectionCard(
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

  const templateIdentifier = taskTemplateIdentifierConstants.TASK_TEMPLATE_IDENTIFIERS.FREE_TRIAL_SALESFORCE_TO_GIT_MERGE_SYNC_TASK;
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
      option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC}
      selectedOption={selectedFlow}
      title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC}
      subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_TO_GIT_MERGE_SYNC}
      icon={faSalesforce}
      iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
      description={`
        Merge your conflicts before you commit to the Org!
      `}
      onClickFunction={onClickFunction}
      workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
    />
  );
}

CreateSalesforceWorkflowWizardSalesforceToGitMergeSyncTaskSelectionCard.propTypes = {
  selectedFlow: PropTypes.string,
  taskCounts: PropTypes.object,
  handleFlowSelection: PropTypes.func,
  hasExpiration: PropTypes.bool,
  handleAccountTaskLimitReachedFlowSelection: PropTypes.func,
};


