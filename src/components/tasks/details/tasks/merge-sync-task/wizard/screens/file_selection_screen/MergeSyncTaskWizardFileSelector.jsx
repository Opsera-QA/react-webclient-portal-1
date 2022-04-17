import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import SfdcPipelineWizardSubmitSfdcFilesButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/sfdc/SfdcPipelineWizardSubmitSfdcFilesButton";
import {parseError} from "components/common/helpers/error-helpers";
import mergeSyncTaskWizardActions
  from "components/tasks/details/tasks/merge-sync-task/wizard/mergeSyncTaskWizard.actions";
import BackButton from "components/common/buttons/back/BackButton";

const MergeSyncTaskWizardFileSelector = ({
  wizardModel,
  setWizardModel,
  setCurrentScreen,
  handleClose,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [sourceFileList, setSourceFileList] = useState([]);
  const [diffFileList, setDiffFileList] = useState([]);
  const [filePullCompleted, setFilePullCompleted] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [totalFileCount, setTotalFileCount] = useState(0);
  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setSourceFileList([]);
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
      setErrorMessage("");
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

    const sfdcCommitList = await getModifiedFiles(cancelSource);

    if (
      !Array.isArray(sfdcCommitList) &&
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

  const getModifiedFiles = async (
    cancelSource = cancelTokenSource,
  ) => {
    const response = await mergeSyncTaskWizardActions.triggerComparisonFilePull(
      getAccessToken,
      cancelSource,
      wizardModel,
    );
    const data = response?.data;

    if (isMounted?.current === true && data) {
      const files = data.data;

      if (data?.error) {
        const parsedError = parseError(data?.error);
        toastContext.showInlineErrorMessage(
          `Service Error Fetching File List: ${parsedError}`,
        );
      }

      if (Array.isArray(files)) {
        setTotalFileCount(data.count);
        setWizardModel({ ...wizardModel });
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return data?.data;
  };

  return (
    <div>
      {/*<SfdcPipelineWizardSfdcFilesTable*/}
      {/*  sfdcFiles={sfdcFiles}*/}
      {/*  wizardModel={wizardModel}*/}
      {/*  setCurrentScreen={setCurrentScreen}*/}
      {/*  isLoading={isLoading}*/}
      {/*  loadData={loadData}*/}
      {/*  sfdcFilesPaginationModel={sfdcFilterDto}*/}
      {/*  setSfdcFilesPaginationModel={setSfdcFilterDto}*/}
      {/*  filePullCompleted={filePullCompleted}*/}
      {/*  setWizardModel={setWizardModel}*/}
      {/*/>*/}
      <SaveButtonContainer>
        <BackButton
          className={"mr-2"}
          backButtonFunction={() => {
            setCurrentScreen(PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR);
          }}
        />
        <SfdcPipelineWizardSubmitSfdcFilesButton
          setCurrentScreen={setCurrentScreen}
          wizardModel={wizardModel}
          filteredFileCount={totalFileCount}
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
};

export default MergeSyncTaskWizardFileSelector;