import React, {useState, useMemo, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import {
  getTableTextColumn,
} from "components/common/table/table-column-helpers-v2";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import FilterContainer from "components/common/table/FilterContainer";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import "../../workflowWizard.css";
import CSVFileUploadComponent from '../csv_file_upload/CSVFileUploadComponent';
import axios from "axios";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";
import Model from "core/data_model/model";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import SfdcRulesInputContainer from "components/common/inputs/rules/sfdc_pipeline_wizard/SfdcRulesInputContainer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VanityTable from "components/common/table/VanityTable";

// TODO: This should further be broken down into two components. I will do it soon, hopefully - Noah
const SfdcProfileSelectionView = (
  {
    fileUploadFlag,
    recordId,
    updateAttribute,
    callbackFunc,
    gitTaskData,
    pipelineId,
    stepId,
    ruleList,
    setRecordId,
    gitTaskId,
    setRuleList
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const fields = sfdcTableConstants.fields;
  const [files, setFiles] = useState([]);
  const [destSfdcLoading, setDestSfdcLoading] = useState(false);
  const [destSfdcModified, setDestSfdcModified] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [destSfdcFilterDto, setDestSfdcFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [sfdcWarningMessage, setSfdcWarningMessage] = useState("");
  const [sfdcFilterDto, setSfdcFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [sfdcModified, setSfdcModified] = useState([]);
  const [sfdcLoading, setSfdcLoading] = useState(false);

  // TODO: Remove after node-side status fix
  const [rulesReloading, setRulesReloading] = useState(false);
  const [reloadCancelToken, setReloadCancelToken] = useState(undefined);

  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setSfdcModified([]);
    setDestSfdcModified([]);

    loadData(source, sfdcFilterDto, destSfdcFilterDto).catch((error) => {
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

    rulesReload(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

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

  const loadData = async (cancelSource = cancelTokenSource, newSfdcFilterDto = sfdcFilterDto, newDestFilterDto = destSfdcFilterDto) => {
    try {
      setSfdcLoading(true);
      setDestSfdcLoading(true);
      await destSfdcPolling(cancelSource, newDestFilterDto);
      await sfdcPolling(cancelSource, newSfdcFilterDto);
    }
    catch (error) {
      toastContext.showInlineErrorMessage("Error pulling SFDC Files. Check logs for more details.");
      console.error(error);
    }
    finally {
      if (isMounted?.current === true) {
        setSfdcLoading(false);
        setDestSfdcLoading(false);
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
          setDestSfdcLoading(false);
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

  const sfdcPolling = async (cancelSource = cancelTokenSource, newSfdcFilterDto = sfdcFilterDto, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const sfdcCommitList = await getModifiedFiles(cancelSource, newSfdcFilterDto);

    if ((!Array.isArray(sfdcCommitList) || sfdcCommitList?.length === 0) && count <= 5) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await sfdcPolling(cancelSource, newSfdcFilterDto, count + 1);
    }
  };

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

  const destSfdcPolling = async (cancelSource = cancelTokenSource, newFilterDto = destSfdcFilterDto, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const destSfdcList = await getModifiedDestinationFiles(cancelSource, newFilterDto);

    if ((!Array.isArray(destSfdcList) || destSfdcList?.length === 0) && count <= 5) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await destSfdcPolling(cancelSource, count + 1);
    }
  };

  const getModifiedDestinationFiles = async (cancelSource = cancelTokenSource, newFilterDto = destSfdcFilterDto) => {
    const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      dataType: "sfdc-packageXml",
      fetchAttribute: "destSfdcCommitList",
      rules: ruleList,
      page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
      size: newFilterDto ? newFilterDto.getData("pageSize") : 1500,
      search: newFilterDto ? newFilterDto.getData("search") : "",
      classFilter: newFilterDto ? newFilterDto.getData("classFilter") : ""
    };

    const destSfdcResponse = await sfdcPipelineActions.getListFromPipelineStorageV2(getAccessToken, cancelSource, postBody);

    if (isMounted?.current === true && destSfdcResponse) {
      if (destSfdcResponse?.data?.data?.destSfdcErrorMessage) {
        toastContext.showInlineErrorMessage("Dest SFDC Fetch Error : " + destSfdcResponse.data.data.destSfdcErrorMessage);
      }

      if (!destSfdcResponse?.data?.data || !destSfdcResponse?.data?.data?.destSfdcCommitList) {
        toastContext.showInlineErrorMessage("something went wrong! not a valid object");
      }

      if (destSfdcResponse?.data?.data?.destSfdcCommitList) {
        let newDestSfdcFilterDto = destSfdcFilterDto;
        newDestSfdcFilterDto.setData("totalCount", destSfdcResponse.data.data.destSfdcCommitList.count);
        newDestSfdcFilterDto.setData("activeFilters", newDestSfdcFilterDto.getActiveFilters());
        setDestSfdcFilterDto({...newDestSfdcFilterDto});

        setDestSfdcModified(destSfdcResponse?.data?.data?.destSfdcCommitList?.data);

        if ((Array.isArray(destSfdcResponse.data.data.sfdcCommitList.data) && destSfdcResponse.data.data.sfdcCommitList.data.length > 0)) {
          setDestSfdcLoading(false);
        }
      }
    }

    return destSfdcResponse?.data?.data?.destSfdcCommitList?.data;
  };


  const columnsWithOutCheckBoxCell = useMemo(
    () => [      
      {...getTableTextColumn(fields.find(field => { return field.id === "committedFile";})), class: "force-text-wrap"},
    ],
    [],
  );

  const getDestSfdcModifiedFilesView = () => {
    return (        
      <VanityTable
        className={"table-no-border" + (files.length > 0 ? " opacity-half" : " ") }
        columns={columnsWithOutCheckBoxCell}
        data={destSfdcModified}
        isLoading={destSfdcLoading}
        loadData={destSfdcPolling}
        noDataMessage={sfdcTableConstants.noDataMessage}
        paginationModel={destSfdcFilterDto}
        setPaginationModel={setDestSfdcFilterDto}
      />
    );
  };

  const getSfdcModifiedFilesView = () => {
    return (  
        <VanityTable
          className={"table-no-border" + (files.length > 0 ? " opacity-half" : " ") }
          columns={columnsWithOutCheckBoxCell}
          data={sfdcModified}
          isLoading={sfdcLoading || rulesReloading}
          loadData={sfdcPolling}
          noDataMessage={sfdcTableConstants.noDataMessage}
          paginationModel={sfdcFilterDto}
          setPaginationModel={setSfdcFilterDto}
        />
    );
  };

  return (
    <>
      <div className={"my-4"}>
        <SfdcRulesInputContainer ruleList={ruleList} setRuleList={setRuleList} postBody={getPostBody()} modifiedFiles={sfdcModified} />
      </div>
      <InlineWarning warningMessage={sfdcWarningMessage} className="pl-3"/>
      {fileUploadFlag && !sfdcLoading && !rulesReloading &&
        <CSVFileUploadComponent
          recordId={recordId}
          updateAttribute={updateAttribute}
          callbackFunc={callbackFunc}
          pullComponentsFunction={getAllModifiedFiles}
          setFiles={setFiles}
          gitTaskData={gitTaskData}
        />
      }
      <Row className="mt-2 d-flex">
        <Col xs={6}>
          <FilterContainer
              loadData={sfdcPolling}
              filterDto={sfdcFilterDto}
              setFilterDto={setSfdcFilterDto}
              isLoading={sfdcLoading}
              title={"SFDC Files"}
              titleIcon={faSalesforce}
              body={getSfdcModifiedFilesView()}
              supportSearch={true}
          />
        </Col>
        <Col xs={6}>
          <FilterContainer
            loadData={destSfdcPolling}
            filterDto={destSfdcFilterDto}
            setFilterDto={setDestSfdcFilterDto}
            isLoading={destSfdcLoading}
            title={"Destination SFDC Files"}
            titleIcon={faSalesforce}
            body={getDestSfdcModifiedFilesView()}
            supportSearch={true}
          />
        </Col>
      </Row>
    </>
  );

};

SfdcProfileSelectionView.propTypes = {
  fileUploadFlag:  PropTypes.bool,
  recordId: PropTypes.string,
  updateAttribute: PropTypes.string,
  callbackFunc: PropTypes.func,  
  gitTaskData: PropTypes.object,
  stepId: PropTypes.string,
  gitTaskId: PropTypes.string,
  pipelineId: PropTypes.string,
  ruleList: PropTypes.array,
  setRecordId: PropTypes.func,
  setRuleList: PropTypes.func
};

export default SfdcProfileSelectionView;