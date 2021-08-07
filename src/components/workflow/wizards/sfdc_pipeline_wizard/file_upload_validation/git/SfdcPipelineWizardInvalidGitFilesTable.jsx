import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import Model from "core/data_model/model";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import {parseError} from "components/common/helpers/error-helpers";
import SfdcPipelineWizardGitFilesValidationTableBase
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_upload_validation/git/SfdcPipelineWizardGitFilesValidationTableBase";

const SfdcPipelineWizardInvalidGitFilesTable = ({ pipelineWizardModel}) => {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [destinationFiles, setDestinationFiles] = useState([]);
  const [destinationFilterModel, setDestinationFilterModel] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
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
    setDestinationFiles([]);

    const newDestinationFilterModel = new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false);
    setDestinationFilterModel({...newDestinationFilterModel});
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

  const loadData = async (newFilterModel = destinationFilterModel, cancelSource = cancelTokenSource) => {
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

  const invalidFilePolling = async (cancelSource = cancelTokenSource, newFilterModel = destinationFilterModel, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const destSfdcList = await getInvalidFiles(cancelSource, newFilterModel);

    if (!Array.isArray(destSfdcList) && count <= 5 && filePullCompleted === false) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await invalidFilePolling(cancelSource, newFilterModel, count + 1);
    }
  };

  const getInvalidFiles = async (cancelSource = cancelTokenSource, newFilterModel = destinationFilterModel) => {
    const destSfdcResponse = await sfdcPipelineActions.getInvalidFileList(getAccessToken, cancelSource, pipelineWizardModel, newFilterModel);
    const data = destSfdcResponse?.data;
    const fileList = destSfdcResponse?.data?.data;

    if (isMounted?.current === true && data) {
      if (data.error) {
        const parsedError = parseError(data?.error);
        toastContext.showInlineErrorMessage(`Service Error Fetching Destination File List From SFDC: ${parsedError}`);
      }

      if (Array.isArray(fileList)) {
        let newDestSfdcFilterDto = newFilterModel;
        newDestSfdcFilterDto.setData("totalCount", data.count);
        newDestSfdcFilterDto.setData("activeFilters", newDestSfdcFilterDto.getActiveFilters());
        setDestinationFilterModel({...newDestSfdcFilterDto});
        setDestinationFiles(fileList);
        setIsLoading(false);
        setFilePullCompleted(true);
      }
    }

    return fileList;
  };

  return (
    <SfdcPipelineWizardGitFilesValidationTableBase
      data={destinationFiles}
      loadData={loadData}
      isLoading={isLoading}
      paginationModel={destinationFilterModel}
      setPaginationModel={setDestinationFilterModel}
      title={"Destination SFDC Files"}
      pipelineWizardModel={pipelineWizardModel}
    />
  );
};

SfdcPipelineWizardInvalidGitFilesTable.propTypes = {
  pipelineWizardModel: PropTypes.object,
};

export default SfdcPipelineWizardInvalidGitFilesTable;