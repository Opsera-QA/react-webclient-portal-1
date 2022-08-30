import React, { useEffect } from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import {
  salesforceWorkflowFlowConstants,
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import { DividerWithCenteredText } from "temp-library-components/divider/DividerWithCenteredText";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import WorkflowOptionCardBase, {
  WORKFLOW_OPTION_TYPES,
} from "components/wizard/free_trial/workflows/flows/WorkflowOptionCardBase";
import Row from "react-bootstrap/Row";
import SelectionCardColumn from "temp-library-components/cards/SelectionCardColumn";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";

export default function CreateSalesforceWorkflowWizardFlowSelectionScreen(
  {
    className,
    selectedFlow,
    setSelectedFlow,
    setCurrentScreen,
    backButtonFunction,
    setButtonContainer,
  }) {
  const { themeConstants } = useComponentStateReference();

  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase backButtonFunction={backButtonFunction} />
      );
    }
  }, [backButtonFunction]);

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
          <WorkflowOptionCardBase
            option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC}
            selectedOption={selectedFlow}
            title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC}
            subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_ORGANIZATION_SYNC}
            icon={faSalesforce}
            iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
            description={`
              Set up a basic Organization Sync workflow for syncing your Salesforce Organizations. 
              This operation will allow you to select modified files from your Git repository or Salesforce Organization and move it to the next organization.
            `}
            onClickFunction={handleFlowSelection}
            workflowOptionType={WORKFLOW_OPTION_TYPES.PIPELINE}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <WorkflowOptionCardBase
            option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING}
            selectedOption={selectedFlow}
            title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING}
            subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING}
            icon={faSalesforce}
            iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
            description={`
              Set up an Organization Sync workflow that includes an explicit unit testing step. 
            `}
            onClickFunction={handleFlowSelection}
            workflowOptionType={WORKFLOW_OPTION_TYPES.PIPELINE}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <WorkflowOptionCardBase
            option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP}
            selectedOption={selectedFlow}
            title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP}
            subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP}
            icon={faSalesforce}
            iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
            description={`
              Set up an Organization Sync workflow that includes an explicit unit testing step and backup step that run prior to deployment. 
            `}
            onClickFunction={handleFlowSelection}
            workflowOptionType={WORKFLOW_OPTION_TYPES.PIPELINE}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <WorkflowOptionCardBase
            option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK}
            selectedOption={selectedFlow}
            title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_ORGANIZATION_SYNC_TASK}
            subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_ORGANIZATION_SYNC_TASK}
            icon={faSalesforce}
            iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
            description={`
              Setup an Organization Sync task to run on demand. This will move metadata into a specific branch for users to make modifications and then use it for a later deployment.
            `}
            onClickFunction={handleFlowSelection}
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </SelectionCardColumn>
        <SelectionCardColumn>
          <WorkflowOptionCardBase
            option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC}
            selectedOption={selectedFlow}
            title={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC}
            subTitle={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_SUBTITLES.SALESFORCE_TO_GIT_MERGE_SYNC}
            icon={faSalesforce}
            iconColor={themeConstants.COLOR_PALETTE.SALESFORCE_BLUE}
            description={`
              Handle a Merge Sync on demand from Salesforce to Git
            `}
            onClickFunction={handleFlowSelection}
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
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


