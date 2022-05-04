import React from "react";
import PropTypes from "prop-types";
import CancelButton from "components/common/buttons/CancelButton";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import BackButton from "components/common/buttons/back/BackButton";
import TriggerMergeSyncTaskButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/TriggerMergeSyncTaskButton";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.constants";
import MergeSyncTaskWizardSelectedCommitTable
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/selected_commits_table/MergeSyncTaskWizardSelectedCommitTable";

const MergeSyncTaskWizardConfirmationScreen = (
  {
    wizardModel,
    setCurrentScreen,
    handleClose,
  }) => {
  if (wizardModel == null) {
    return null;
  }

  return (
    <div>
      <div className="h5">Merge Sync Task Wizard: Confirmation Screen</div>
      <div className="text-muted">Would you like to trigger the Merge Sync for these files?</div>
      <div className={"my-3"}>
        <MergeSyncTaskWizardSelectedCommitTable
          sourceCommitList={wizardModel?.getArrayData("updatedFileList")}
        />
      </div>
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => {setCurrentScreen(MERGE_SYNC_WIZARD_SCREENS.COMMIT_SELECTION_SCREEN);}}
        />
        <TriggerMergeSyncTaskButton
          wizardModel={wizardModel}
          handleClose={handleClose}
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
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
};

export default MergeSyncTaskWizardConfirmationScreen;
