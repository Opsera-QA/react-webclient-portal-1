import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import {parseError} from "components/common/helpers/error-helpers";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.actions";
import BackButton from "components/common/buttons/back/BackButton";
import {
  MERGE_SYNC_WIZARD_SCREENS
} from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.constants";
import MergeSyncTaskWizardCommitSelectorVerticalTabContainer
  from "components/tasks/details/tasks/merge-sync-task/wizard/screens/commit_selection_screen/MergeSyncTaskWizardCommitSelectorVerticalTabContainer";

const MergeSyncTaskWizardCommitSelector = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [diffFileList, setDiffFileList] = useState(undefined);
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
    setDiffFileList([]);

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

  const loadData = async (
    cancelSource = cancelTokenSource,
  ) => {
    try {
      setIsLoading(true);
      await handleFilePolling(cancelSource);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
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

    const newFileList = await getDiffFileList(cancelSource);

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

  const getDiffFileList = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response = await mergeSyncTaskWizardActions.pullDiffFileListV2(
      getAccessToken,
      cancelSource,
      wizardModel?.getData("recordId"),
    );
    const errorMessage = response?.data?.data?.errorMessage;
    const newFileList = response?.data?.data?.diffFileList;

    if (isMounted?.current === true) {
      if (errorMessage) {
        const parsedError = parseError(errorMessage);
        toastContext.showInlineErrorMessage(
          `Service Error Fetching Diff File List: ${parsedError}`,
        );
      }

      if (Array.isArray(newFileList)) {
        setDiffFileList([...newFileList]);
        setFilePullCompleted(true);
      }
    }

    return newFileList;
  };

  return (
    <div>
      <MergeSyncTaskWizardCommitSelectorVerticalTabContainer
        handleClose={handleClose}
        setCurrentScreen={setCurrentScreen}
        diffFileList={diffFileList}
        setWizardModel={setWizardModel}
        wizardModel={wizardModel}
        isLoading={isLoading}
        loadDataFunction={loadData}
        filePullCompleted={filePullCompleted}
      />
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => {
            setCurrentScreen(MERGE_SYNC_WIZARD_SCREENS.FILE_SELECTION_SCREEN);
          }}
        />
        {/*<MergeSyncTaskWizardSubmitSelectedFilesButton*/}
        {/*  setCurrentScreen={setCurrentScreen}*/}
        {/*  wizardModel={wizardModel}*/}
        {/*  isLoading={isLoading}*/}
        {/*/>*/}
        <CancelButton
          size={"sm"}
          className={"ml-2"}
          cancelFunction={handleClose}
        />
      </SaveButtonContainer>
    </div>
  );
};

MergeSyncTaskWizardCommitSelector.propTypes = {
  wizardModel: PropTypes.object,
  setWizardModel: PropTypes.func,
  setCurrentScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default MergeSyncTaskWizardCommitSelector;