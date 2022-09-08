import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import {
  salesforceWorkflowFlowConstants,
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import { DividerWithCenteredText } from "temp-library-components/divider/DividerWithCenteredText";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import useComponentStateReference from "hooks/useComponentStateReference";
import Row from "react-bootstrap/Row";
import SelectionCardColumn from "temp-library-components/cards/SelectionCardColumn";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import accountsActions from "components/admin/accounts/accounts-actions";
import CenterLoadingIndicator from "components/common/loading/CenterLoadingIndicator";
import CreateSalesforceWorkflowWizardSalesforceOrganizationSyncTaskSelectionCard
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/task/cards/CreateSalesforceWorkflowWizardSalesforceOrganizationSyncTaskSelectionCard";
import SalesforceOrganizationSyncPipelineSelectionCard
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/cards/SalesforceOrganizationSyncPipelineSelectionCard";
import SalesforceOrganizationSyncPipelineWithUnitTestingSelectionCard
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/cards/SalesforceOrganizationSyncPipelineWithUnitTestingSelectionCard";
import SalesforceOrganizationSyncPipelineWithUnitTestingAndBackupSelectionCard
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/organization_sync/pipeline/cards/SalesforceOrganizationSyncPipelineWithUnitTestingAndBackupSelectionCard";
import CreateSalesforceWorkflowWizardSalesforceToGitMergeSyncTaskSelectionCard
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforce_to_git_merge_sync/task/cards/CreateSalesforceWorkflowWizardSalesforceToGitMergeSyncTaskSelectionCard";

export default function CreateSalesforceWorkflowWizardFlowSelectionScreen(
  {
    className,
    selectedFlow,
    setSelectedFlow,
    setCurrentScreen,
    backButtonFunction,
    setButtonContainer,
  }) {
  const [isLoading, setIsLoading] = useState(undefined);
  const [accountMetrics, setAccountMetrics] = useState(undefined);
  const {
    getAccessToken,
    cancelTokenSource,
    isMounted,
    toastContext,
    themeConstants,
  } = useComponentStateReference();

  useEffect(() => {
    loadData().catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase backButtonFunction={backButtonFunction} />
      );
    }
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      await getAccountMetrics();
    } catch (error) {
      if (isMounted?.current === true && !error?.error?.message?.includes(404)) {
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getAccountMetrics = async () => {
    const response = await accountsActions.getFreeTrialAccountWorkflowMetrics(
      getAccessToken,
      cancelTokenSource,
    );
    const metrics = response?.data?.data;

    if (isMounted?.current === true && metrics) {
      setAccountMetrics(metrics);
    }
  };

  const handleFlowSelection = (newFlowOption) => {
    setSelectedFlow(newFlowOption);
    setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.WIZARD_FLOW_SCREEN);
  };

  const getComingSoonItems = () => {
    return (
      <>
        <DividerWithCenteredText text={"Coming Soon"} className={"m-4"} />
        <WizardSelectionRadioOption
          onClickFunction={handleFlowSelection}
          selectedOption={selectedFlow}
          option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION}
          text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_PROFILE_MIGRATION}
          disabled={true}
          className={"mb-2"}
        />
        <WizardSelectionRadioOption
          onClickFunction={handleFlowSelection}
          selectedOption={selectedFlow}
          option={
            salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC
          }
          text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_PROFILE_MIGRATION_ORGANIZATION_SYNC}
          disabled={true}
          className={"mb-2"}
        />
      </>
    );
  };

  if (isLoading === true || accountMetrics == null) {
    return (
      <CenterLoadingIndicator
        customMessage={"Initializing Workflow Options"}
      />
    );
  }

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <H5FieldSubHeader
          className={"mb-3 mx-3"}
          subheaderText={"What kind of Salesforce Workflow would you like to create today?"}
        />
      </CenteredContentWrapper>
      <Row>
        <SelectionCardColumn>
          <SalesforceOrganizationSyncPipelineSelectionCard
            selectedFlow={selectedFlow}
            pipelineCounts={accountMetrics?.pipelineCounts}
            handleFlowSelection={handleFlowSelection}
            hasExpiration={accountMetrics?.expiration != null}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <SalesforceOrganizationSyncPipelineWithUnitTestingSelectionCard
            selectedFlow={selectedFlow}
            pipelineCounts={accountMetrics?.pipelineCounts}
            handleFlowSelection={handleFlowSelection}
            hasExpiration={accountMetrics?.expiration != null}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <SalesforceOrganizationSyncPipelineWithUnitTestingAndBackupSelectionCard
            selectedFlow={selectedFlow}
            pipelineCounts={accountMetrics?.pipelineCounts}
            handleFlowSelection={handleFlowSelection}
            hasExpiration={accountMetrics?.expiration != null}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <CreateSalesforceWorkflowWizardSalesforceOrganizationSyncTaskSelectionCard
            selectedFlow={selectedFlow}
            taskCounts={accountMetrics?.taskCounts}
            handleFlowSelection={handleFlowSelection}
            hasExpiration={accountMetrics?.expiration != null}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <CreateSalesforceWorkflowWizardSalesforceToGitMergeSyncTaskSelectionCard
            selectedFlow={selectedFlow}
            taskCounts={accountMetrics?.taskCounts}
            handleFlowSelection={handleFlowSelection}
            hasExpiration={accountMetrics?.expiration != null}
          />
        </SelectionCardColumn>
      </Row>
    </div>
  );
}

CreateSalesforceWorkflowWizardFlowSelectionScreen.propTypes = {
  selectedFlow: PropTypes.string,
  setSelectedFlow: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  backButtonFunction: PropTypes.func,
  setButtonContainer: PropTypes.func,
  className: PropTypes.string,
};


