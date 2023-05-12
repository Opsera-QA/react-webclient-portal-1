import React, {useEffect} from "react";
import CreateSalesforceOrganizationSyncTaskWizard from "components/wizard/portal/workflows/flows/salesforce/flows/organization_sync/task/CreateSalesforceOrganizationSyncTaskWizard";
import * as PropType from "prop-types";
import { TASK_TYPES } from "../../task.types";
import CreateCertificateTaskWizard from "../../../wizard/portal/workflows/flows/salesforce/flows/certificate_generation/CreateCertificateTaskWizard";
import CreateBranchingStructureTask from "../../../wizard/portal/workflows/flows/salesforce/flows/salesforce_branching_structure/CreateBranchingStructureTask";
import CreateSalesforceBulkMigrationTask from "../../../wizard/portal/workflows/flows/salesforce/flows/salesforce_bulk_migration/CreateSalesforceBulkMigrationTask";
import CreateSalesforceQuickDeployTask from "../../../wizard/portal/workflows/flows/salesforce/flows/salesforce_quick_deploy/CreateSalesforceQuickDeployTask";
import CreateSalesforceOrganizationToGitMergeSyncTaskWizard
  from "../../../wizard/portal/workflows/flows/salesforce/flows/salesforce_to_git_merge_sync/task/CreateSalesforceOrganizationToGitMergeSyncTaskWizard";
import OverlayWizardButtonContainerBase
  from "../../../../temp-library-components/button/overlay/OverlayWizardButtonContainerBase";

export default function WizardTaskConfigurationRouter({
  flow,
  setButtonContainer,
  backButtonFunction,
  handleClose,
}) {
  const getCurrentScreen = () => {
    switch (flow) {
      case TASK_TYPES.SALESFORCE_CERTIFICATE_GENERATION: //TOOLS REQ - JENKINS
        return (
          <CreateCertificateTaskWizard
            flow={flow}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            handleClose={handleClose}
          />
        );
      case TASK_TYPES.SALESFORCE_QUICK_DEPLOY: //TOOLS REQ - SALESFORCE ACC
        return (
          <CreateSalesforceQuickDeployTask
            flow={flow}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            handleClose={handleClose}
          />
        );
      case TASK_TYPES.SYNC_SALESFORCE_BRANCH_STRUCTURE: //TOOLS REQ - SALESFORCE, JENKINS, REGISTERED GIT ACC IN JENKINS
        return (
          <CreateBranchingStructureTask
            flow={flow}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            handleClose={handleClose}
          />
        );
      case TASK_TYPES.SALESFORCE_BULK_MIGRATION: //TOOLS REQ - JENKINS, SALESFORCE ACC, GIT
        return (
          <CreateSalesforceBulkMigrationTask
            flow={flow}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            handleClose={handleClose}
          />
        );
      case TASK_TYPES.SYNC_SALESFORCE_REPO:
        return (
          <CreateSalesforceOrganizationSyncTaskWizard
            flow={flow}
            setButtonContainer={setButtonContainer}
            backButtonFunction={backButtonFunction}
            handleClose={handleClose}
          />
        );
      case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
        return (
            <CreateSalesforceOrganizationToGitMergeSyncTaskWizard
                flow={flow}
                setButtonContainer={setButtonContainer}
                backButtonFunction={backButtonFunction}
                handleClose={handleClose}
            />
        );
      // case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC: //TOOLS REQ - GIT
    }
  };

  return <div>{getCurrentScreen()}</div>;
}

WizardTaskConfigurationRouter.propTypes = {
  flow: PropType.string,
  setButtonContainer: PropType.func,
  backButtonFunction: PropType.func,
  handleClose: PropType.func,
};
