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
  pipelineTemplateIdentifierConstants,
} from "components/admin/pipeline_templates/pipelineTemplateIdentifier.constants";
import useComponentStateReference from "hooks/useComponentStateReference";

export default function SalesforceOrganizationSyncPipelineSelectionCard(
  {
    selectedFlow,
    pipelineCounts,
    hasExpiration,
    handleFlowSelection,
    handleAccountPipelineLimitReachedFlowSelection,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  const templateIdentifier = pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIERS.FREE_TRIAL_ORGANIZATION_SYNC_PIPELINE;
  const currentCount = pipelineCounts?.[templateIdentifier];
  const allowedCount = hasExpiration === false ? 10 : 3;
  const disabled = currentCount == null || currentCount >= allowedCount;

  const onClickFunction = (selectedOption) => {
    if (disabled === true) {
      handleAccountPipelineLimitReachedFlowSelection(templateIdentifier);
      return;
    }

    handleFlowSelection(selectedOption);
  };

  return (
    <WorkflowOptionCardBase
      option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC}
      selectedOption={selectedFlow}
      title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC}
      subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_ORGANIZATION_SYNC}
      icon={faSalesforce}
      iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
      description={`
        Move files from your Git repository or Salesforce Organization to another organization.
      `}
      onClickFunction={onClickFunction}
      workflowOptionType={WORKFLOW_OPTION_TYPES.PIPELINE}
    />
  );
}

SalesforceOrganizationSyncPipelineSelectionCard.propTypes = {
  selectedFlow: PropTypes.string,
  pipelineCounts: PropTypes.object,
  handleFlowSelection: PropTypes.func,
  handleAccountPipelineLimitReachedFlowSelection: PropTypes.func,
  hasExpiration: PropTypes.bool,
};


