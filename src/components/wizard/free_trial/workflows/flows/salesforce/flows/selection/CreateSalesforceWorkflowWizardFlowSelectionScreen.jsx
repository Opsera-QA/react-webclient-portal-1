import React from "react";
import PropTypes from "prop-types";
import WizardSelectionRadioOption from "temp-library-components/wizard/option/WizardSelectionRadioOption";
import {
  salesforceWorkflowFlowConstants,
} from "components/wizard/free_trial/workflows/flows/salesforce/flows/salesforceWorkflowFlow.constants";
import CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton
  from "components/wizard/free_trial/workflows/flows/salesforce/flows/selection/CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton";
import { DividerWithCenteredText } from "temp-library-components/divider/DividerWithCenteredText";
import ButtonContainerBase from "components/common/buttons/saving/containers/ButtonContainerBase";
import BackButton from "components/common/buttons/back/BackButton";
import { faArrowLeft } from "@fortawesome/pro-light-svg-icons";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import useComponentStateReference from "hooks/useComponentStateReference";
import WorkflowOptionCardBase, {
  WORKFLOW_OPTION_TYPES,
} from "components/wizard/free_trial/workflows/flows/WorkflowOptionCardBase";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SelectionCardColumn from "temp-library-components/cards/SelectionCardColumn";

export default function CreateSalesforceWorkflowWizardFlowSelectionScreen(
  {
    className,
    selectedFlow,
    setSelectedFlow,
    setCurrentScreen,
    stepBackFromWizardFunction,
  }) {
  const { themeConstants } = useComponentStateReference();

  const getComingSoonItems = () => {
    return (
      <>
        <DividerWithCenteredText text={"Coming Soon"} className={"m-4"} />
        <WizardSelectionRadioOption
          onClickFunction={setSelectedFlow}
          selectedOption={selectedFlow}
          option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_PROFILE_MIGRATION}
          text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_PROFILE_MIGRATION}
          disabled={true}
          className={"mb-2"}
        />
        <WizardSelectionRadioOption
          onClickFunction={setSelectedFlow}
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
            onClickFunction={() => setSelectedFlow(salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC)}
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
            onClickFunction={() => setSelectedFlow(salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING)}
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
            onClickFunction={() => setSelectedFlow(salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_WITH_UNIT_TESTING_AND_BACKUP)}
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
            onClickFunction={() => setSelectedFlow(salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_ORGANIZATION_SYNC_TASK)}
            workflowOptionType={WORKFLOW_OPTION_TYPES.TASK}
          />
        </SelectionCardColumn>
      </Row>

      <WizardSelectionRadioOption
        onClickFunction={setSelectedFlow}
        selectedOption={selectedFlow}
        option={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTIONS.SALESFORCE_TO_GIT_MERGE_SYNC}
        text={salesforceWorkflowFlowConstants.SALESFORCE_FLOW_OPTION_LABELS.SALESFORCE_TO_GIT_MERGE_SYNC}
        description={`
          Handle a Merge Sync on demand from Salesforce to Git
        `}
        disabled={true}
        className={"my-2"}
      />
      <ButtonContainerBase
        className={"mt-3"}
        leftSideButtons={
          <BackButton
            size={"md"}
            backButtonFunction={stepBackFromWizardFunction}
            icon={faArrowLeft}
          />
        }
      >
        <CreateSalesforceWorkflowWizardConfirmSalesforceFlowButton
          selectedFlow={selectedFlow}
          setCurrentScreen={setCurrentScreen}
        />
      </ButtonContainerBase>
    </div>
  );
}

CreateSalesforceWorkflowWizardFlowSelectionScreen.propTypes = {
  selectedFlow: PropTypes.string,
  setSelectedFlow: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  stepBackFromWizardFunction: PropTypes.func,
  className: PropTypes.string,
};


