import React from "react";
import {
  salesforceWorkflowFlowConstants
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateSalesforceOrganizationSyncTaskWizard
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";
import * as PropType from "prop-types";
import CreateSalesforceOrganizationSyncPipelineWizard
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";

export default function CreateSalesforceWorkflowWizardFlowWrapper(
  {
    flow,
  }) {
  const getCurrentScreen = () => {
    switch (flow) {
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC:
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING:
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP:
        return (
          <CreateSalesforceOrganizationSyncPipelineWizard
            flow={flow}
          />
        );
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK:
      case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC:
        return (
          <CreateSalesforceOrganizationSyncTaskWizard
            flow={flow}
          />
        );
    }
  };

  if (salesforceWorkflowFlowConstants.isSalesforceFlowValid(flow) !== true) {
    return null;
  }

  return (
    <div>
      {getCurrentScreen()}
    </div>
  );
}

CreateSalesforceWorkflowWizardFlowWrapper.propTypes = {
  flow: PropType.string,
};

