import React from "react";
import PropTypes from "prop-types";
import { Row} from "react-bootstrap";
import CancelButton from "components/common/buttons/CancelButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import BackButton from "components/common/buttons/back/BackButton";
import TriggerMergeSyncTaskButton
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/confirmation_screen/TriggerMergeSyncTaskButton";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.constants";

const MergeSyncTaskWizardConfirmationScreen = (
  {
    wizardModel,
    setPipelineWizardScreen,
    handleClose,
    setError,
  }) => {
  if (wizardModel == null) {
    return null;
  }

  return (
    <div>
      <div className="h5">Merge Sync Task Wizard: Confirmation Screen</div>
      <div className="text-muted">Would you like to trigger the Merge Sync?</div>
      <Row className="my-3">
        <div>Add whatever we can show on here</div>
        {/*<Col xs={6}>*/}
        {/*  <ListInputBase*/}
        {/*    height={"70vh"}*/}
        {/*    fieldName={"selectedComponentTypes"}*/}
        {/*    selectOptions={getFormattedComponentTypes()}*/}
        {/*    dataObject={pipelineWizardModel}*/}
        {/*    setDataObject={setPipelineWizardModel}*/}
        {/*    icon={faSalesforce}*/}
        {/*    valueField={"name"}*/}
        {/*    textField={"name"}*/}
        {/*    disabled={true}*/}
        {/*    noDataMessage={"No Component Types Selected"}*/}
        {/*  />*/}
        {/*</Col>*/}
      </Row>
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => {setPipelineWizardScreen(MERGE_SYNC_WIZARD_SCREENS.FILE_SELECTION_SCREEN);}}
        />
        <TriggerMergeSyncTaskButton
          pipelineWizardModel={wizardModel}
          handleClose={handleClose}
          setError={setError}
        />
        <CancelButton
          className={"ml-2"}
          showUnsavedChangesMessage={false}
          cancelFunction={handleClose}
        />
      </SaveButtonContainer>
    </div>
  );
};

MergeSyncTaskWizardConfirmationScreen.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setError: PropTypes.func,
};

export default MergeSyncTaskWizardConfirmationScreen;
