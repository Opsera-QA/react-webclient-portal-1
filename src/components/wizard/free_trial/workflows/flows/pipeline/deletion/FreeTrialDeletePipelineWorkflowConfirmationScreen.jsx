import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS,
} from "components/wizard/free_trial/workflows/flows/salesforce/CreateSalesforceWorkflowWizard";
import H5FieldSubHeader from "components/common/fields/subheader/H5FieldSubHeader";
import CenteredContentWrapper from "components/common/wrapper/CenteredContentWrapper";
import { faWarning } from "@fortawesome/pro-light-svg-icons";
import IconBase from "components/common/icons/IconBase";
import OverlayWizardButtonContainerBase from "temp-library-components/button/overlay/OverlayWizardButtonContainerBase";
import FreeTrialConfirmPipelineWorkflowDeletionButton
  from "components/wizard/free_trial/workflows/flows/pipeline/deletion/FreeTrialConfirmPipelineWorkflowDeletionButton";

export default function FreeTrialDeletePipelineWorkflowConfirmationScreen(
  {
    setCurrentScreen,
    setButtonContainer,
    setSelectedFlow,
    className,
    selectedWorkflowId,
    setSelectedWorkflowId,
    loadData,
  }) {
  useEffect(() => {
    if (setButtonContainer) {
      setButtonContainer(
        <OverlayWizardButtonContainerBase
          backButtonFunction={backButtonFunction}
        >
          <FreeTrialConfirmPipelineWorkflowDeletionButton
            selectedWorkflowId={selectedWorkflowId}
            setCurrentScreen={setCurrentScreen}
            setSelectedFlow={setSelectedFlow}
            setSelectedWorkflowId={setSelectedWorkflowId}
            loadData={loadData}
          />
        </OverlayWizardButtonContainerBase>,
      );
    }
  }, [selectedWorkflowId]);

  const backButtonFunction = () => {
    setSelectedFlow(undefined);
    setCurrentScreen(CREATE_SALESFORCE_WORKFLOW_WIZARD_SCREENS.SELECT_FLOW_SCREEN);
  };

  return (
    <div className={className}>
      <CenteredContentWrapper>
        <div className={"d-flex m-3"}>
          <h5><IconBase icon={faWarning} className={"mr-2"} /></h5>
          <H5FieldSubHeader
            className={"mb-3"}
            subheaderText={`Are you sure you would like to delete this Pipeline? `}
          />
        </div>
      </CenteredContentWrapper>
      <CenteredContentWrapper>
        <div>Data cannot be recovered once this Pipeline is deleted.</div>
      </CenteredContentWrapper>
    </div>
  );
}

FreeTrialDeletePipelineWorkflowConfirmationScreen.propTypes = {
  setCurrentScreen: PropTypes.func,
  setButtonContainer: PropTypes.func,
  className: PropTypes.string,
  setSelectedFlow: PropTypes.func,
  selectedWorkflowId: PropTypes.string,
  setSelectedWorkflowId: PropTypes.func,
  loadData: PropTypes.func,
};


