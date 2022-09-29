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

const SfdcPipelineWizardInvalidGitFilesTable = ({ pipelineWizardModel}) => {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [invalidFiles, setInvalidFiles] = useState([]);
  const [invalidFilterModel, setInvalidFilterModel] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [isLoading, setIsLoading] = useState(false);
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
    setInvalidFiles([]);

    const newDestinationFilterModel = new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false);
    setInvalidFilterModel({...newDestinationFilterModel});
    loadData(newDestinationFilterModel, source).catch((error) => {
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

  const loadData = async (newFilterModel = invalidFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await invalidFilePolling(cancelSource, newFilterModel);
    }
    catch (error) {
      toastContext.showInlineErrorMessage("Error pulling Invalid Git Files. Check logs for more details.");
      console.error(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach(timerId => clearTimeout(timerId));
    }
  };

  const invalidFilePolling = async (cancelSource = cancelTokenSource, newFilterModel = invalidFilterModel, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const invalidFileList = await getInvalidFiles(cancelSource, newFilterModel);

    if (!Array.isArray(invalidFileList) && count <= 5 && filePullCompleted === false) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await invalidFilePolling(cancelSource, newFilterModel, count + 1);
    }
  };

  const getInvalidFiles = async (cancelSource = cancelTokenSource, newFilterModel = invalidFilterModel) => {
    const response = await sfdcPipelineActions.getInvalidFileList(getAccessToken, cancelSource, pipelineWizardModel, newFilterModel);
    const data = response?.data;
    const fileList = response?.data?.data;

    if (isMounted?.current === true && Array.isArray(fileList)) {
      let newDestSfdcFilterDto = newFilterModel;
      newDestSfdcFilterDto.setData("totalCount", data.count);
      newDestSfdcFilterDto.setData("activeFilters", newDestSfdcFilterDto.getActiveFilters());
      setInvalidFilterModel({...newDestSfdcFilterDto});
      setInvalidFiles(fileList);
      setIsLoading(false);
      setFilePullCompleted(true);
    }

    return fileList;
  };

  return (
    <SfdcPipelineWizardFileValidationTableBase
      data={invalidFiles}
      loadData={loadData}
      isLoading={isLoading}
      paginationModel={invalidFilterModel}
      setPaginationModel={setInvalidFilterModel}
      filePullCompleted={filePullCompleted}
      title={"Invalid Files"}
      pipelineWizardModel={pipelineWizardModel}
      reasonAvailable={true}
    />
  );
};

SfdcPipelineWizardInvalidGitFilesTable.propTypes = {
  pipelineWizardModel: PropTypes.object,
};

export default SfdcPipelineWizardInvalidGitFilesTable;