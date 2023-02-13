import React from "react";
import PropTypes from "prop-types";
import LoadingDialog from "components/common/status_notifications/loading";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import MergeSyncTaskWizardCreateNewRecordButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/initialization_screen/MergeSyncTaskWizardCreateNewRecordButton";
import BooleanToggleInput from "../../../../../../../common/inputs/boolean/BooleanToggleInput";

const MergeSyncTaskWizardInitializationScreen = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
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
          <BooleanToggleInput
            fieldName={"isProfile"}
            dataObject={wizardModel}
            setDataObject={setWizardModel}
          />
          <MergeSyncTaskWizardCreateNewRecordButton
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
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
        <div className={"h5"}>{`${mergeSyncType} Merge Sync: Initialization`}</div>
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
};

export default MergeSyncTaskWizardInitializationScreen;
