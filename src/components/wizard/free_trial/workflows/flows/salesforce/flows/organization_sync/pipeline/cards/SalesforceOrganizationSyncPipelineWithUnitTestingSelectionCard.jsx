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
import SelectionCardColumn from "temp-library-components/cards/SelectionCardColumn";

export default function SalesforceOrganizationSyncPipelineWithUnitTestingSelectionCard(
  {
    selectedFlow,
    pipelineCounts,
    hasExpiration,
    handleFlowSelection,
  }) {
  const {
    themeConstants,
  } = useComponentStateReference();

  const fieldName = pipelineTemplateIdentifierConstants.PIPELINE_TEMPLATE_IDENTIFIERS.FREE_TRIAL_ORGANIZATION_SYNC_PIPELINE;
  const currentCount = pipelineCounts?.[fieldName];
  const allowedCount = hasExpiration === false ? 10 : 3;

  return (
    <WorkflowOptionCardBase
      option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING}
      selectedOption={selectedFlow}
      title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING}
      subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING}
      icon={faSalesforce}
      iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
      description={`
        Move files from your Git repository or Salesforce Organization to another organization including an explicit unit testing step. 
      `}
      onClickFunction={handleFlowSelection}
      disabled={currentCount == null || currentCount >= allowedCount}
      workflowOptionType={WORKFLOW_OPTION_TYPES.PIPELINE}
    />
  );
}

SalesforceOrganizationSyncPipelineWithUnitTestingSelectionCard.propTypes = {
  selectedFlow: PropTypes.string,
  pipelineCounts: PropTypes.object,
  handleFlowSelection: PropTypes.func,
  hasExpiration: PropTypes.bool,
};


