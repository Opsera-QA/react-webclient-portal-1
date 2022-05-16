import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import SfdcPipelineWizardOrganizationFilesTableBase
  from "components/workflow/wizards/sfdc_pipeline_wizard/file_selector/org_to_org/SfdcPipelineWizardOrganizationFilesTableBase";
import Model from "core/data_model/model";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";

const SfdcPipelineWizardOriginOrganizationFilesTable = ({ pipelineWizardModel, setPipelineWizardModel, setFilteredFileCount, filePullCompleted, setFilePullCompleted  }) => {
  const {getAccessToken} = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [sfdcWarningMessage, setSfdcWarningMessage] = useState("");
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
  }, [JSON.stringify(pipelineWizardModel.getData("sfdcModifiedRuleList"))]);

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach(timerId => clearTimeout(timerId));
    }
  };

  const loadData = async (newFilterModel = originFilterModel, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await sfdcPolling(cancelSource, newFilterModel);
    }
    catch (error) {
      toastContext.showInlineErrorMessage("Error pulling Salesforce Files. Check logs for more details.");
      console.error(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const sfdcPolling = async (cancelSource = cancelTokenSource, newFilterModel = originFilterModel, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const sfdcCommitList = await getModifiedFiles(cancelSource, newFilterModel);

    if (!Array.isArray(sfdcCommitList) && count <= 5) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await sfdcPolling(cancelSource, newFilterModel, count + 1);
    }
  };

  const getModifiedFiles = async (cancelSource = cancelTokenSource, newFilterDto = originFilterModel) => {
    const response = await sfdcPipelineActions.getSfdcFilesV2(getAccessToken, cancelSource, pipelineWizardModel, newFilterDto);
    const data = response?.data;
    const files = data?.data;

    if (isMounted?.current === true && data) {
      if (data?.error) {
        toastContext.showInlineErrorMessage("Salesforce Fetch Error : " + data.sfdcErrorMessage);
      }

      if (data.warning) {
        setSfdcWarningMessage(data.warning);
      }

      setFilteredFileCount(data.count);

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
    <>
      <InlineWarning warningMessage={sfdcWarningMessage} className="pl-3"/>
      <SfdcPipelineWizardOrganizationFilesTableBase
        data={originFiles}
        loadData={loadData}
        isLoading={isLoading}
        paginationModel={originFilterModel}
        setPaginationModel={setOriginFilterModel}
        title={"Salesforce Files"}
        pipelineWizardModel={pipelineWizardModel}
        filePullCompleted={filePullCompleted}
      />
    </>
  );
};

SfdcPipelineWizardOriginOrganizationFilesTable.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setFilteredFileCount: PropTypes.func,
  setFilePullCompleted: PropTypes.func,
  filePullCompleted: PropTypes.bool,
  fileUploadFlag: PropTypes.bool,
  setFileUploadFlag: PropTypes.func
};

export default SfdcPipelineWizardOriginOrganizationFilesTable;