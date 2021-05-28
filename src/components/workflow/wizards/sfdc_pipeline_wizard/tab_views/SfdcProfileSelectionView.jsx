import React, {useState, useMemo, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import {
  getTableDateTimeColumn,
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
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import IconBase from "components/common/icons/IconBase";
import CancelButton from "components/common/buttons/CancelButton";

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
    setRuleList,
    setView,
    handleApproveChanges,
    handleClose,
    save
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
  const [sfdcLoading, setSfdcLoading] = useState(true);

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

    if (sfdcLoading !== true && isMounted?.current === true) {
      sfdcFilterDto?.setData("currentPage", 1);
      destSfdcFilterDto?.setData("currentPage", 1);
      rulesReload(source, sfdcFilterDto, destSfdcFilterDto).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      stopPolling();
    };
  }, [ruleList]);

  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach(timerId => clearTimeout(timerId));
    }
  };

  const rulesReload = async (cancelSource = cancelTokenSource, newFilterDto = sfdcFilterDto, newDestFilterDto = destSfdcFilterDto) => {
    try {
      if (isMounted?.current === true) {
        setSfdcModified([]);
        setDestSfdcModified([]);
        setRulesReloading(true);
        await getModifiedFiles(cancelSource, newFilterDto);
        await getModifiedDestinationFiles(cancelSource, newDestFilterDto);
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
          setSfdcLoading(false);
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
    if (isMounted?.current !== true || rulesReloading === true) {
      return;
    }

    const sfdcCommitList = await getModifiedFiles(cancelSource, newSfdcFilterDto);

    if (sfdcCommitList?.data?.data?.sfdcErrorMessage?.length === 0 &&
      (!sfdcCommitList?.data?.data?.gitCommitList || sfdcCommitList?.data?.data?.sfdcCommitList?.count === 0)
      && count < 5) {
      
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      count++;
      return await sfdcPolling(cancelSource, newSfdcFilterDto, count);
    } else {
      // console.log("stop polling");
      stopPolling();
    }

    // if ((!Array.isArray(sfdcCommitList) || sfdcCommitList?.length === 0) && count <= 5) {
    //   await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
    //   return await sfdcPolling(cancelSource, newSfdcFilterDto, count + 1);
    // }
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
      return await destSfdcPolling(cancelSource, newFilterDto, count + 1);
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

        if ((Array.isArray(destSfdcResponse.data.data.destSfdcCommitList.data) && destSfdcResponse.data.data.destSfdcCommitList.data.length > 0)) {
          setDestSfdcLoading(false);
        }
      }
    }

    return destSfdcResponse?.data?.data?.destSfdcCommitList?.data;
  };


  const columnsWithOutCheckBoxCell = useMemo(
    () => [      
      {...getTableTextColumn(fields.find(field => { return field.id === "committedFile";})), class: "force-text-wrap"},
      getTableDateTimeColumn(fields.find(field => { return field.id === "committedTime";})),
    ],
    [],
  );

  const getDestSfdcModifiedFilesView = () => {
    return (        
      <VanityTable
        className={"table-no-border" + (files.length > 0 ? " opacity-half" : " ") }
        columns={columnsWithOutCheckBoxCell}
        data={destSfdcModified}
        isLoading={destSfdcLoading || rulesReloading}
        loadData={rulesReload}
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
          loadData={rulesReload}
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
      <Row className="mt-2 d-flex" style={{minWidth: "1400px"}}>
        <Col xs={6} className={"pr-1"} style={{minWidth: "675px"}}>
          <FilterContainer
              loadData={rulesReload}
              filterDto={sfdcFilterDto}
              setFilterDto={setSfdcFilterDto}
              isLoading={sfdcLoading || rulesReloading}
              title={"SFDC Files"}
              titleIcon={faSalesforce}
              body={getSfdcModifiedFilesView()}
              supportSearch={true}
          />
        </Col>
        <Col xs={6} className={"pl-1"} style={{minWidth: "675px"}}>
          <FilterContainer
            loadData={rulesReload}
            filterDto={destSfdcFilterDto}
            setFilterDto={setDestSfdcFilterDto}
            isLoading={destSfdcLoading || rulesReloading}
            title={"Destination SFDC Files"}
            titleIcon={faSalesforce}
            body={getDestSfdcModifiedFilesView()}
            supportSearch={true}
          />
        </Col>
      </Row>
      <SaveButtonContainer>
        <div className={"ml-auto my-3"}>
          <Button variant="secondary" size="sm" className="mr-2" onClick={() => {setView(1);}}>
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>Back
          </Button>
          <Button variant="success" size="sm" onClick={() => handleApproveChanges()}
                  disabled={!Array.isArray(sfdcModified) || sfdcModified.length === 0}
          >
            <IconBase isLoading={save} icon={faStepForward} fixedWidth className="mr-1"/>
            Proceed with Filtered Files
          </Button>
          <CancelButton size={"sm"} className={"ml-2"} cancelFunction={handleClose} />
        </div>
      </SaveButtonContainer>
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
  setRuleList: PropTypes.func,
  handleApproveChanges: PropTypes.func,
  setView: PropTypes.func,
  handleClose: PropTypes.func,
  save: PropTypes.bool
};

export default SfdcProfileSelectionView;