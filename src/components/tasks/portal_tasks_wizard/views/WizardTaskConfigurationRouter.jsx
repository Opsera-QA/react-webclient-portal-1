import React from "react";
import { salesforceWorkflowFlowConstants } from "components/wizard/portal/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateSalesforceOrganizationSyncTaskWizard from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";
import * as PropType from "prop-types";
import CreateSalesforceOrganizationSyncPipelineWizard from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/pipeline/CreateSalesforceOrganizationSyncPipelineWizard";
import CreateSalesforceOrganizationToGitMergeSyncTaskWizard from "components/wizard/portal/workflows/flows/salesforce/flows/salesforce_to_git_merge_sync/task/CreateSalesforceOrganizationToGitMergeSyncTaskWizard";
import { TASK_TYPES } from "../../task.types";
import CreateCertificateTaskWizard
  from "../../../wizard/portal/workflows/flows/salesforce/flows/certificate_generation/CreateCertificateTaskWizard";

export default function WizardTaskConfigurationRouter({
  flow,
  setButtonContainer,
  backButtonFunction,
}) {
  const getCurrentScreen = () => {
    switch (flow) {
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION: //TOOLS REQ - JENKINS
            return (
              <CreateCertificateTaskWizard
                  flow={flow}
                  setButtonContainer={setButtonContainer}
                  backButtonFunction={backButtonFunction}
              />
            );
      // case TASK_TYPES.SALESFORCE_QUICK_DEPLOY: //TOOLS REQ - SALESFORCE ACC
      // case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC: //TOOLS REQ - GIT
      // case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE: //TOOLS REQ - SALESFORCE, JENKINS, REGISTERED GIT ACC IN JENKINS
      // case TASK_TYPES.SALESFORCE_BULK_MIGRATION: //TOOLS REQ - JENKINS, SALESFORCE ACC, GIT
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        return (
          <CreateSalesforceOrganizationSyncTaskWizard
            flow={flow}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
          />
        );
      // case salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC:
      //     return (
      //         <CreateSalesforceOrganizationToGitMergeSyncTaskWizard
      //             flow={flow}
      //             setButtonContainer={setButtonContainer}
      //             backButtonFunction={backButtonFunction}
      //         />
      //     );
    }
  };

  return <div>{getCurrentScreen()}</div>;
}

WizardTaskConfigurationRouter.propTypes = {
  flow: PropType.string,
  setButtonContainer: PropType.func,
  backButtonFunction: PropType.func,
};
