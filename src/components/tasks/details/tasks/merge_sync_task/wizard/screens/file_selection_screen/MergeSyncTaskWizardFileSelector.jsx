import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import {parseError} from "components/common/helpers/error-helpers";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import BackButton from "components/common/buttons/back/BackButton";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.constants";
import GitToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/git_to_git/GitToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable";
import MergeSyncTaskWizardSubmitSelectedFilesButton
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/MergeSyncTaskWizardSubmitSelectedFilesButton";
import MergeSyncTaskFileSelectionRulesInputContainer
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/rules/MergeSyncTaskFileSelectionRulesInputContainer";
import { TASK_TYPES } from "components/tasks/task.types";
import SalesforceToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable
  from "components/tasks/details/tasks/merge_sync_task/wizard/screens/file_selection_screen/salesforce_to_git/SalesforceToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable";

const MergeSyncTaskWizardFileSelector = ({
  wizardModel,
  setWizardModel,
  fileSelectionRulesString,
  setCurrentScreen,
  handleClose,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [sourceCommitList, setSourceCommitList] = useState([]);
  const [filePullCompleted, setFilePullCompleted] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setSourceCommitList([]);

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
      stopPolling();
    };
  }, []);

  useEffect(() => {
    if (filePullCompleted === true) {
      getSourceCommitList().catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }
  }, [fileSelectionRulesString]);

  const loadData = async (
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      await handleFilePolling(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showInlineErrorMessage(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const handleFilePolling = async (
    cancelSource = cancelTokenSource,
    count = 1,
  ) => {
    if (isMounted?.current !== true) {
      return;
    }

    const newFileList = await getSourceCommitList(cancelSource);

    if (
      !Array.isArray(newFileList) &&
      count <= 5 &&
      filePullCompleted === false
    ) {
      await new Promise((resolve) => timerIds.push(setTimeout(resolve, 15000)));
      return await handleFilePolling(cancelSource, count + 1);
    }
  };

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach((timerId) => clearTimeout(timerId));
    }
  };

  const getSourceCommitList = async (
    cancelSource = cancelTokenSource,
  ) => {
    setIsLoading(true);
    const response = await mergeSyncTaskWizardActions.pullSourceFileListV2(
      getAccessToken,
      cancelSource,
      wizardModel?.getData("recordId"),
      wizardModel?.getArrayData("fileSelectionRules"),
    );
    const errorMessage = response?.data?.data?.errorMessage;
    const newFileList = response?.data?.data?.sourceCommitList;

    if (isMounted?.current === true) {
      if (errorMessage) {
        const parsedError = parseError(errorMessage);
        toastContext.showInlineErrorMessage(
          `Service Error Fetching Source File List: ${parsedError}`,
        );
      }

      if (Array.isArray(newFileList)) {
        setSourceCommitList(newFileList);
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return newFileList;
  };

  const getCommitListTable = () => {
    switch (wizardModel?.getData("taskType")) {
      case TASK_TYPES.SALESFORCE_TO_GIT_MERGE_SYNC:
        return (
          <SalesforceToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable
            filePullCompleted={filePullCompleted}
            sourceCommitList={sourceCommitList}
            isLoading={isLoading}
            loadData={loadData}
            ruleCount={wizardModel?.getArrayData("fileSelectionRules")?.length}
          />
        );
      case TASK_TYPES.GIT_TO_GIT_MERGE_SYNC:
        return (
          <GitToGitMergeSyncTaskWizardFileSelectionSourceCommitListTable
            filePullCompleted={filePullCompleted}
            sourceCommitList={sourceCommitList}
            isLoading={isLoading}
            loadData={loadData}
            ruleCount={wizardModel?.getArrayData("fileSelectionRules")?.length}
          />
        );
    }
  };

  return (
    <div>
      <div className={"mb-2"}>
        <MergeSyncTaskFileSelectionRulesInputContainer
          isLoading={isLoading}
          filePullCompleted={filePullCompleted}
          wizardModel={wizardModel}
          setWizardModel={setWizardModel}
          fieldName={"fileSelectionRules"}
          fileList={sourceCommitList}
        />
      </div>
      {getCommitListTable()}
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => {
            setCurrentScreen(MERGE_SYNC_WIZARD_SCREENS.CONFIGURATION_SCREEN);
          }}
        />
        <MergeSyncTaskWizardSubmitSelectedFilesButton
          filteredFileCount={sourceCommitList?.length}
          setCurrentScreen={setCurrentScreen}
          wizardModel={wizardModel}
          isLoading={isLoading}
        />
        <CancelButton
          size={"sm"}
          className={"ml-2"}
          cancelFunction={handleClose}
        />
      </SaveButtonContainer>
    </div>
  );
};

MergeSyncTaskWizardFileSelector.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
  fileSelectionRulesString: PropTypes.string,
};

export default MergeSyncTaskWizardFileSelector;