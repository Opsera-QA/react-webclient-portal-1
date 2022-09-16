import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import SfdcPipelineWizardFileValidationTableBase
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_upload_validation/SfdcPipelineWizardFileValidationTableBase";
import {parseError} from "components/common/helpers/error-helpers";

const SfdcPipelineWizardValidatedGitFilesTable = ({ pipelineWizardModel, setPipelineWizardModel, setFilteredFileCount, filePullCompleted, setFilePullCompleted  }) => {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [originFilterModel, setOriginFilterModel] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [originFiles, setOriginFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
    setOriginFiles([]);

    loadData(originFilterModel, source).catch((error) => {
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

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach(timerId => clearTimeout(timerId));
    }
  };

  const loadData = async (newFilterModel = originFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await validatedFilePolling(cancelSource, newFilterModel);
    }
    catch (error) {
      toastContext.showInlineErrorMessage("Error pulling Validated Git Files. Check logs for more details.");
      console.error(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const validatedFilePolling = async (cancelSource = cancelTokenSource, newFilterModel = originFilterModel, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const sfdcCommitList = await getValidatedFiles(cancelSource, newFilterModel);

    if (!Array.isArray(sfdcCommitList) && count <= 5) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await validatedFilePolling(cancelSource, newFilterModel, count + 1);
    }
  };

  const getValidatedFiles = async (cancelSource = cancelTokenSource, newFilterDto = originFilterModel) => {
    const response = await sfdcPipelineActions.getSelectedFileList(getAccessToken, cancelSource, pipelineWizardModel, newFilterDto);
    const data = response?.data;
    const files = data?.data;

    if (isMounted?.current === true && data) {
      setFilteredFileCount(data.count);

      if (data?.error) {
        const parsedError = parseError(data?.error);
        toastContext.showInlineErrorMessage(`Service Error Fetching Validated File List: ${parsedError}`);
        setIsLoading(false);
        setFilePullCompleted(true);
      }

      if (Array.isArray(files)) {
        let newSfdcFilterDto = {...newFilterDto};
        newSfdcFilterDto.setData("totalCount", data.count);
        newSfdcFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());
        setOriginFilterModel({...newSfdcFilterDto});
        setPipelineWizardModel({...pipelineWizardModel});
        setOriginFiles(files);
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return files;
  };

  return (
    <SfdcPipelineWizardFileValidationTableBase
      data={originFiles}
      loadData={loadData}
      isLoading={isLoading}
      paginationModel={originFilterModel}
      setPaginationModel={setOriginFilterModel}
      title={"Validated Files"}
      pipelineWizardModel={pipelineWizardModel}
      filePullCompleted={filePullCompleted}
    />
  );
};

SfdcPipelineWizardValidatedGitFilesTable.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setFilteredFileCount: PropTypes.func,
  setFilePullCompleted: PropTypes.func,
  filePullCompleted: PropTypes.bool,
};

export default SfdcPipelineWizardValidatedGitFilesTable;