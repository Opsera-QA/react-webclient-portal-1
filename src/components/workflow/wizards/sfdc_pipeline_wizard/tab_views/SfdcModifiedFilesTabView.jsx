import React, {useState, useMemo, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import {
  getTableDateTimeColumn,
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import InlineSfdcComponentTypesFilter from "components/common/filters/sfdc/sfdc_component/InlineSfdcComponentTypesFilter";
import CSVFileUploadComponent from '../csv_file_upload/CSVFileUploadComponent';
import ToggleUploadButton from "components/common/buttons/toggle/ToggleUploadButton";
import VanityTable from "components/common/table/VanityTable";
import axios from "axios";
import Model from "core/data_model/model";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import {DialogToastContext} from "contexts/DialogToastContext";
import {AuthContext} from "contexts/AuthContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import SfdcRulesInputContainer from "components/common/inputs/rules/sfdc_pipeline_wizard/SfdcRulesInputContainer";

const SfdcModifiedFilesTabView = (
  {
    componentType,
    recordId,
    updateAttribute,
    callbackFunc,
    gitTaskData,
    pipelineId,
    stepId,
    gitTaskId,
    ruleList,
    setRecordId,
    setRuleList
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [files, setFiles] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const fields = sfdcTableConstants.fields;
  const [isLoading, setIsLoading] = useState(true);
  const [sfdcWarningMessage, setSfdcWarningMessage] = useState("");
  const [sfdcFilterDto, setSfdcFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [sfdcModified, setSfdcModified] = useState([]);
  let timerIds = [];

  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  // TODO: Remove after node-side status fix
  const [rulesReloading, setRulesReloading] = useState(false);
  const [reloadCancelToken, setReloadCancelToken] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (reloadCancelToken) {
      reloadCancelToken.cancel();
    }

    const source = axios.CancelToken.source();
    setReloadCancelToken(source);

    if (isLoading !== true && isMounted?.current === true) {
      rulesReload(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
    };
  }, [ruleList]);

  const rulesReload = async (cancelSource = cancelTokenSource, newFilterDto = sfdcFilterDto) => {
    try {
      if (isMounted?.current === true) {
        setRulesReloading(true);
        newFilterDto?.setData("currentPage", 1);
        await getModifiedFiles(cancelSource, newFilterDto);
      }
    }
    catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      setRulesReloading(false);
    }
  };

  const loadData = async (cancelSource = cancelTokenSource, newFilterDto = sfdcFilterDto) => {
    try {
      setIsLoading(true);
      setSfdcWarningMessage("");
      await sfdcPolling(cancelSource, newFilterDto);
    }
    catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getModifiedFiles = async (cancelSource = cancelTokenSource, newFilterDto = sfdcFilterDto) => {
    const postBody = {
      pipelineId: gitTaskData ? "N/A" : pipelineId,
      stepId: gitTaskData ? "N/A" : stepId,
      dataType: gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml",
      gitTaskId: gitTaskData ? gitTaskId : false,
      fetchAttribute: "sfdcCommitList",
      rules: ruleList,
      page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
      size: newFilterDto ? newFilterDto.getData("pageSize") : 1500,
      search: newFilterDto ? newFilterDto.getData("search") : "",
      classFilter: newFilterDto ? newFilterDto.getData("classFilter") : ""
    };

    const sfdcResponse = await sfdcPipelineActions.getListFromPipelineStorageV2(getAccessToken, cancelSource, postBody);

    if (isMounted?.current === true && sfdcResponse) {
      if (sfdcResponse?.sfdcErrorMessage) {
        toastContext.showInlineErrorMessage("SFDC Fetch Error : " + sfdcResponse.sfdcErrorMessage);
      }

      if (sfdcResponse?.data?.data?.sfdcWarnMessage) {
        setSfdcWarningMessage(sfdcResponse?.data?.data?.sfdcWarnMessage);
      }

      if (sfdcResponse?.data?.data?.sfdcErrorMessage) {
        throw sfdcResponse?.data?.data?.sfdcErrorMessage;
      }

      if (sfdcResponse?.data?.data?.sfdcCommitList) {
        let newSfdcFilterDto = newFilterDto;
        newSfdcFilterDto.setData("totalCount", sfdcResponse.data.data.sfdcCommitList.count);
        newSfdcFilterDto.setData("activeFilters", newSfdcFilterDto.getActiveFilters());
        setSfdcFilterDto({...newSfdcFilterDto});
        setSfdcModified(sfdcResponse.data.data.sfdcCommitList.data);

        // TODO: Is this important?
        //storing _id so that we can edit this object
        setRecordId(sfdcResponse?.data?._id);

        if (Array.isArray(sfdcResponse.data.data.sfdcCommitList.data) && sfdcResponse.data.data.sfdcCommitList.data.length > 0) {
          setIsLoading(false);
        }
      }
    }

    return sfdcResponse?.data?.data?.sfdcCommitList;
  };

  const getAllModifiedFiles = async () => {
    const postBody = {
      pipelineId: gitTaskData ? "N/A" : pipelineId,
      stepId: gitTaskData ? "N/A" : stepId,
      dataType: gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml",
      gitTaskId: gitTaskData ? gitTaskId : false,
      fetchAttribute: "sfdcCommitList",
      pullAllComponents: true
    };

    const sfdcResponse = await sfdcPipelineActions.getListFromPipelineStorageV2(getAccessToken, cancelTokenSource, postBody);
    return sfdcResponse?.data?.data?.sfdcCommitList?.data;
  };

  const sfdcPolling = async (cancelSource = cancelTokenSource, newFilterDto = sfdcFilterDto, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const sfdcCommitList = await getModifiedFiles(cancelSource, newFilterDto);

    if ((!Array.isArray(sfdcCommitList) || sfdcCommitList?.length === 0) && count <= 5) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await sfdcPolling(cancelSource, newFilterDto, count + 1);
    }
  };

  const sfdcColumnsWithCheckBoxCell = useMemo(
    () => [      
      getTableTextColumn(fields.find(field => { return field.id === "committedFileId";})),
      getTableTextColumn(fields.find(field => { return field.id === "componentType";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedFile";}), "force-text-wrap"),
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
      getTableTextColumn(fields.find(field => { return field.id === "committedBy";})),
    ],
    [],
  );

  const getPostBody = () => {
    return (
      {
        pipelineId: gitTaskData ? "N/A" : pipelineId,
        stepId: gitTaskData ? "N/A" : stepId,
        dataType: gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml",
        gitTaskId: gitTaskData ? gitTaskId : false,
        fetchAttribute: "sfdcCommitList",
      }
    );
  };

  const getSfdcModifiedFilesView = () => {
    return (  
      <div>
        {showFileUpload &&
          <CSVFileUploadComponent
            recordId={recordId}
            updateAttribute={updateAttribute}
            callbackFunc={callbackFunc}
            fetchAttribute={"sfdcCommitList"}
            pullComponentsFunction={getAllModifiedFiles}
            setFiles={setFiles}
            gitTaskData={gitTaskData}
          />
        }
        <VanityTable
          className={"table-no-border" + (files.length > 0 ? " opacity-half" : " ") }
          columns={sfdcColumnsWithCheckBoxCell}
          data={sfdcModified}
          isLoading={isLoading || rulesReloading}
          loadData={loadData}
          noDataMessage={sfdcTableConstants?.noDataMessage}
          paginationModel={sfdcFilterDto}
          setPaginationModel={setSfdcFilterDto}
        />
      </div>
    );
  };


  const getSfdcInlineFilters = () => {    
    return (
      <div className="px-2 d-flex small">
        <div>
          <InlineSfdcComponentTypesFilter className={"mx-2"} componentTypes={componentType} filterDto={sfdcFilterDto} setFilterDto={setSfdcFilterDto} inline={true} />
        </div>
        <div className={"mx-2"}><ToggleUploadButton toggleUpload={() => {setShowFileUpload(!showFileUpload);}} uploadType={"File CSV"} /></div>
      </div>
    );
  };

  return (
    <>
      <div className={"my-4"}>
        <SfdcRulesInputContainer ruleList={ruleList} setRuleList={setRuleList} postBody={getPostBody()} modifiedFiles={sfdcModified} />
      </div>
      <InlineWarning warningMessage={sfdcWarningMessage} className="pl-3" />
      <FilterContainer
        loadData={loadData}
        filterDto={sfdcFilterDto}
        setFilterDto={setSfdcFilterDto}
        isLoading={isLoading || rulesReloading}
        title={"SFDC Files"}
        titleIcon={faSalesforce}
        body={getSfdcModifiedFilesView()}
        supportSearch={true}
        inlineFilters={getSfdcInlineFilters()}
      />
    </>
  );
};

SfdcModifiedFilesTabView.propTypes = {
  loadData: PropTypes.func,
  componentType: PropTypes.arrayOf(PropTypes.object),
  filterDto: PropTypes.object,
  setFilterDto: PropTypes.func,
  recordId: PropTypes.string,
  updateAttribute: PropTypes.string,
  callbackFunc: PropTypes.func,
  gitTaskData: PropTypes.object,
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  gitTaskId: PropTypes.string,
  ruleList: PropTypes.array,
  setRecordId: PropTypes.func,
  setRuleList: PropTypes.func
};

export default SfdcModifiedFilesTabView;