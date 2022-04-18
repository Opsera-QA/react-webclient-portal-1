import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import MergeSyncTaskWizardCreateNewRecordButton
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/initialization_screen/MergeSyncTaskWizardCreateNewRecordButton";

const MergeSyncTaskWizardInitializationScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
  setError,
  mergeSyncType,
}) => {
  const getBody = () => {
    if (wizardModel == null) {
      return (
        <LoadingDialog
          message={`Initializing ${mergeSyncType} Merge Sync Wizard`}
          size={"sm"}
        />
      );
    }

    return (
      <div>
        <div className={"mt-2"}>
          {`Would you like to start a new ${mergeSyncType} Merge Sync Task Wizard Instance?`}
        </div>
        <SaveButtonContainer>
          <MergeSyncTaskWizardCreateNewRecordButton
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            setError={setError}
            className={"mr-2"}
          />
          <CancelButton
            showUnsavedChangesMessage={false}
            cancelFunction={handleClose}
            size={"sm"}
          />
        </SaveButtonContainer>
      </div>
    );
  };

  const getMainView = () => {
    return (
      <div>
        <div className={"h5"}>Git to Git Merge Sync: Initialization</div>
        <div className={"my-3"}>{getBody()}</div>
      </div>
    );
  };

  return (
    <div>
      {getMainView()}
    </div>
  );
};

MergeSyncTaskWizardInitializationScreen.propTypes = {
  mergeSyncType: PropTypes.string,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setError: PropTypes.func,
};

export default MergeSyncTaskWizardInitializationScreen;
