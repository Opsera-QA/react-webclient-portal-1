import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ErrorDialog from "components/common/status_notifications/error";
import axios from "axios";
import LoadingDialog from "components/common/status_notifications/loading";
import OverlayPanelBodyContainer from "components/common/panels/detail_panel_container/OverlayPanelBodyContainer";
import {
  mergeSyncTaskWizardMetadata
} from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.metadata";
import modelHelpers from "components/common/model/modelHelpers";
import MergeSyncTaskWizardInitializationScreen
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/initialization_screen/MergeSyncTaskWizardInitializationScreen";
import { isMongoDbId } from "components/common/helpers/mongo/mongoDb.helpers";
import MergeSyncTaskWizardConfirmationScreen
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/confirmation_screen/MergeSyncTaskWizardConfirmationScreen";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.constants";
import MergeSyncTaskWizardCommitSelectionScreen
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/commit_selection_screen/MergeSyncTaskWizardCommitSelectionScreen";
import SalesforceToGitMergeSyncTaskWizardConfigurationScreen
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/configuration_screen/salesforce_to_git/SalesforceToGitMergeSyncTaskWizardConfigurationScreen";
import SalesforceToGitMergeSyncTaskWizardFileSelectionScreen
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/salesforce_to_git/SalesforceToGitMergeSyncTaskWizardFileSelectionScreen";
import { dataParsingHelper } from "components/common/helpers/data/dataParsing.helper";
import { DialogToastContext } from "contexts/DialogToastContext";
import { TASK_TYPES } from "components/tasks/task.types";

const SalesforceToGitMergeSyncTaskWizard = ({ handleClose, taskModel }) => {
  const toastContext = useContext(DialogToastContext);
  const [currentScreen, setCurrentScreen] = useState(MERGE_SYNC_WIZARD_SCREENS.INITIALIZATION_SCREEN);
  const [wizardModel, setWizardModel] = useState(undefined);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    toastContext.removeInlineMessage();
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
    newWizardModel.setData("taskType", TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC);
    newWizardModel.setData("taskId", taskModel?.getMongoDbId());

    const configuration = taskModel?.getData("configuration");
    const sfdc = configuration?.sfdc;

    if (dataParsingHelper.parseObject(sfdc)) {
      newWizardModel?.setData("sfdcToolId", sfdc?.sourceToolId);
    }

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
            mergeSyncType={"Salesforce to Git"}
          />
        );
      case MERGE_SYNC_WIZARD_SCREENS.CONFIGURATION_SCREEN:
        return (
          <SalesforceToGitMergeSyncTaskWizardConfigurationScreen
            wizardModel={wizardModel}
            setWizardModel={setWizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
          />
        );
      case MERGE_SYNC_WIZARD_SCREENS.FILE_SELECTION_SCREEN:
        return (
          <SalesforceToGitMergeSyncTaskWizardFileSelectionScreen
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
            wizardModel={wizardModel}
            setCurrentScreen={setCurrentScreen}
            handleClose={handleClose}
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
        message={"Initializing Salesforce to Git Merge Sync Wizard"}
        size={"sm"}
      />
    );
  }

  return (
    <OverlayPanelBodyContainer
      getHelpComponentFunction={getHelpComponentFunction}
      hideCloseButton={true}
    >
      <div className={"m-3"}>
        {getBody()}
      </div>
    </OverlayPanelBodyContainer>
  );
};

SalesforceToGitMergeSyncTaskWizard.propTypes = {
  handleClose: PropTypes.func,
  taskModel: PropTypes.object,
};

export default SalesforceToGitMergeSyncTaskWizard;
