import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {
  mergeSyncTaskWizardMetadata
} from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import MergeSyncTaskWizardInitializationScreen
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/initialization_screen/MergeSyncTaskWizardInitializationScreen";
import GitToGitMergeSyncTaskWizardConfigurationScreen
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/configuration_screen/git_to_git/GitToGitMergeSyncTaskWizardConfigurationScreen";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import MergeSyncTaskWizardConfirmationScreen
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/confirmation_screen/MergeSyncTaskWizardConfirmationScreen";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.constants";
import GitToGitMergeSyncTaskWizardFileSelectionScreen
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/file_selection_screen/git_to_git/GitToGitMergeSyncTaskWizardFileSelectionScreen";
import MergeSyncTaskWizardCommitSelectionScreen
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/commit_selection_screen/MergeSyncTaskWizardCommitSelectionScreen";

const GitToGitMergeSyncTaskWizard = ({ handleClose, taskModel }) => {
  const [error, setError] = useState("");
  const [currentScreen, setCurrentScreen] = useState(MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  const [wizardModel, setWizardModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setWizardModel(undefined);

    if (isMongoDbId(taskModel?.getMongoDbId()) === true) {
      initializeWizardRecord();
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [taskModel]);

  const initializeWizardRecord = () => {
    const newWizardModel = modelHelpers.parseObjectIntoModel({}, mergeSyncTaskWizardMetadata);
    newWizardModel.setDefaultValue("sourceCommitList");
    newWizardModel.setDefaultValue("selectedFileList");
    newWizardModel.setDefaultValue("diffFileList");
    newWizardModel.setDefaultValue("errorMessage");
    newWizardModel.setData("taskId", taskModel?.getMongoDbId());

    const runCount = taskModel?.getData("run_count");

    if (runCount != null) {
      newWizardModel.setData("runCount", (runCount + 1));
    } else {
      newWizardModel.setData("runCount", 1);
    }

    setWizardModel({ ...newWizardModel });
  };

  const getBody = () => {
    switch (currentScreen) {
      case MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return (
          <MergeSyncTaskWizardInitializationScreen
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
            mergeSyncType={"Git to Git"}
            setError={setError}
          />
        );
      case MERGE_SYNC_WIZARD_SCREENS.CONFIGURATION_SCREEN:
        return (
          <GitToGitMergeSyncTaskWizardConfigurationScreen
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
            setError={setError}
          />
        );
      case MERGE_SYNC_WIZARD_SCREENS.FILE_SELECTION_SCREEN:
        return (
          <GitToGitMergeSyncTaskWizardFileSelectionScreen
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
          />
        );
      case MERGE_SYNC_WIZARD_SCREENS.COMMIT_SELECTION_SCREEN:
        return (
          <MergeSyncTaskWizardCommitSelectionScreen
            handleClose={handleClose}
            setCurrentScreen={setCurrentScreen}
            setWizardModel={setWizardModel}
            wizardModel={wizardModel}
          />
        );
      case MERGE_SYNC_WIZARD_SCREENS.CONFIRMATION_SCREEN:
        return (
          <MergeSyncTaskWizardConfirmationScreen
            pipelineWizardModel={wizardModel}
            setPipelineWizardModel={setWizardModel}
            setPipelineWizardScreen={setCurrentScreen}
            handleClose={handleClose}
            setError={setError}
          />
        );
    }
  };

  const getHelpComponentFunction = (setHelpIsShown) => {
    switch (currentScreen) {
      case MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN:
        return null;
      case MERGE_SYNC_WIZARD_SCREENS.CONFIGURATION_SCREEN:
        return null;
      case MERGE_SYNC_WIZARD_SCREENS.FILE_SELECTION_SCREEN:
      default:
        return null;
    }
  };

  if (wizardModel == null) {
    return (
      <LoadingDialog
        message={"Initializing Git to Git Merge Sync Wizard"}
        size={"sm"}
      />
    );
  }

  return (
    <OverlayPanelBodyContainer
      getHelpComponentFunction={getHelpComponentFunction}
      hideCloseButton={true}
    >
      <div>
        <ErrorDialog error={error} />
      </div>
      <div className={"m-3"}>
        {getBody()}
      </div>
    </OverlayPanelBodyContainer>
  );
};

GitToGitMergeSyncTaskWizard.propTypes = {
  handleClose: PropTypes.func,
  taskModel: PropTypes.object,
};

export default GitToGitMergeSyncTaskWizard;
