import React, {useContext, useState, useEffect, useRef, useMemo} from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import { AuthContext } from "contexts/AuthContext";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import CancelButton from "components/common/buttons/CancelButton";
import sfdcComponentFilterMetadata
  from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-component-filter-metadata";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import IconBase from "components/common/icons/IconBase";
import CSVFileUploadComponent
  from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/CSVFileUploadComponent";
import {getTableDateTimeColumn, getTableTextColumn} from "components/common/table/table-column-helpers-v2";
import SfdcRulesInputContainer from "components/common/inputs/rules/sfdc_pipeline_wizard/SfdcRulesInputContainer";
import VanityTable from "components/common/table/VanityTable";
import sfdcTableConstants from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-table-constants";
import {DialogToastContext} from "contexts/DialogToastContext";
import Model from "core/data_model/model";
import FilterContainer from "components/common/table/FilterContainer";
import ToggleUploadButton from "components/common/buttons/toggle/ToggleUploadButton";
import sfdcRuleMetadata from "components/common/inputs/rules/sfdc_pipeline_wizard/sfdc-rule-metadata";

const SfdcPipelineProfileComponentsView = (
  {
    pipelineId,
    stepId,
    handleClose,
    setView,
    recordId,
    setRecordId,
    profileComponentsRuleList,
    setProfileComponentsRuleList,
    gitTaskData // TODO: Is this ever allowed?
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [componentsLoading, setComponentsLoading] = useState(true);
  const [save, setSave] = useState(false);
  const [files, setFiles] = useState([]);
  const [profileComponentList, setProfileComponentList] = useState([]);
  const [filterDto, setFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  let timerIds = [];
  const [showFileUpload, setShowFileUpload] = useState(false);

  const [activeTab, setActiveTab] = useState("sfdc");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const fields = sfdcTableConstants.fields;

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

    setProfileComponentList([]);
    const source = axios.CancelToken.source();
    setReloadCancelToken(source);

    if (componentsLoading !== true && isMounted?.current === true) {
      filterDto?.setData("currentPage", 1);
      rulesReload(source, filterDto).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();

      if (Array.isArray(timerIds) && timerIds.length > 0) {
        timerIds?.forEach(timerId => clearTimeout(timerId));
      }
    };
  }, [profileComponentsRuleList]);


  const rulesReload = async (cancelSource = cancelTokenSource, newFilterDto = filterDto) => {
    try {
      if (isMounted?.current === true) {
        setRulesReloading(true);
        await getProfileFiles(cancelSource, newFilterDto);
      }
    }
    catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      setRulesReloading(false);
    }
  };

  const loadData = async (cancelSource = cancelTokenSource, newFilterDto = filterDto) => {
    try {
      setComponentsLoading(true);
      await profilePolling(cancelSource, undefined, newFilterDto);
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true) {
        setComponentsLoading(false);
      }
    }
  };

  const profilePolling = async (cancelSource = cancelTokenSource, count = 1, newFilterDto = filterDto) => {
    if (isMounted?.current !== true || rulesReloading === true) {
      return;
    }

    const sfdcCommitList = await getProfileFiles(cancelSource, newFilterDto);

    if (isMounted?.current === true
      && (!Array.isArray(sfdcCommitList) || sfdcCommitList?.length === 0)
      && count <= 5) {

      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await profilePolling(cancelSource, count + 1, newFilterDto);
    }
  };

  const getProfileFiles = async (cancelSource = cancelTokenSource, newFilterDto = filterDto) => {
    const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      dataType: "sfdc-packageXml",
      fetchAttribute: "profileComponentList",
      rules: profileComponentsRuleList,
      page: newFilterDto ? newFilterDto.getData("currentPage") : 1,
      size: newFilterDto ? newFilterDto.getData("pageSize") : 1500,
      search: newFilterDto ? newFilterDto.getData("search") : "",
      classFilter: newFilterDto ? newFilterDto.getData("classFilter") : ""
    };

    const sfdcResponse = await sfdcPipelineActions.getListFromPipelineStorageV2(getAccessToken, cancelSource, postBody);

    if (isMounted?.current === true && sfdcResponse?.data?.data?.profileComponentList) {
      let newSfdcFilterDto = newFilterDto;
      newSfdcFilterDto.setData("totalCount", sfdcResponse.data.data.profileComponentList.count);
      newSfdcFilterDto.setData("activeFilters", newSfdcFilterDto.getActiveFilters());
      setFilterDto({...newSfdcFilterDto});
      setProfileComponentList(sfdcResponse.data.data.profileComponentList.data);

      // TODO: Is this important?
      //storing _id so that we can edit this object
      setRecordId(sfdcResponse?.data?._id);
      setComponentsLoading(false);
    }

    return sfdcResponse?.data?.data?.profileComponentList;
  };

  const handleApproveChanges = async () => {
    setSave(true);
    try {
      const postBody = {
        recordId: recordId,
        pipelineId: pipelineId,
        stepId: stepId,
        dataType: "sfdc-packageXml",
        updateAttribute: "selectedFileList",
        typeOfSelection : "profileComponentList",
        rules: profileComponentsRuleList
      };

      const response = await sfdcPipelineActions.setListToPipelineStorageV2(getAccessToken, cancelTokenSource, postBody);

      if (response?.status !== 200) {
        const error = "Error getting API Data: " + response?.data?.message;
        console.error(error);
        setSave(false);
        toastContext.showInlineErrorMessage(error);
      } else {
        await generateXML();
      }

    } catch (error) {
      console.error("Error saving selected data: ", error);
      setSave(false);
      toastContext.showInlineErrorMessage(error);
    }

  };

  const generateXML = async () => {
    try {
      const postBody = {
        pipelineId: pipelineId,
        stepId: stepId,
      };

      const result = await sfdcPipelineActions.generateProfileXML(getAccessToken, cancelTokenSource, postBody);

      if (result?.data?.status !== 200) {
        const error = "Error getting API Data: " + result?.data?.message;
        console.error(error);
        setSave(false);
        toastContext.showInlineErrorMessage(error);
      } else {
        // setXML(result.data.message); // not saving anything from response here
        setView(4); //move to next view
      }
    } catch (err) {
      console.error(err);
      toastContext.showInlineErrorMessage(err);
      setSave(false);
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
  };

  const getAllModifiedFiles = async () => {
    const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      dataType: "sfdc-packageXml",
      fetchAttribute: "profileComponentList",
      pullAllComponents: true
    };

    const sfdcResponse = await sfdcPipelineActions.getListFromPipelineStorageV2(getAccessToken, cancelTokenSource, postBody);
    return sfdcResponse?.data?.data?.profileComponentList?.data;
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
        pipelineId: pipelineId,
        stepId: stepId,
        dataType: "sfdc-packageXml",
        fetchAttribute: "profileComponentList",
      }
    );
  };

  const getProfileFilesView = () => {
    return (
      <div>
        {showFileUpload &&
        <CSVFileUploadComponent
          recordId={recordId}
          updateAttribute={"selectedFileList"}
          callbackFunc={generateXML}
          fetchAttribute={"profileComponentList"}
          pullComponentsFunction={getAllModifiedFiles}
          setFiles={setFiles}
          gitTaskData={gitTaskData}
        />
        }
        <VanityTable
          className={"table-no-border" + (files.length > 0 ? " opacity-half" : " ") }
          columns={sfdcColumnsWithCheckBoxCell}
          data={profileComponentList}
          isLoading={componentsLoading || rulesReloading}
          loadData={rulesReload}
          noDataMessage={sfdcTableConstants?.noDataMessage}
          paginationModel={filterDto}
          setPaginationModel={setFilterDto}
        />
      </div>
    );
  };

  const getSfdcInlineFilters = () => {
    return (
      <div className="px-2 d-flex small">
        {/*<div>*/}
        {/*  <InlineSfdcComponentTypesFilter className={"mx-2"} componentTypes={componentType} filterDto={filterDto} setFilterDto={setFilterDto} inline={true} />*/}
        {/*</div>*/}
        <div className={"mx-2"}><ToggleUploadButton toggleUpload={() => {setShowFileUpload(!showFileUpload);}} uploadType={"File CSV"} /></div>
      </div>
    );
  };

  if (save) {
    return (<LoadingDialog size="sm" message="Loading Selection..."/>);
  }

  return (
    <div>
      <div>
        <div>
          <div className="h5">SalesForce Pipeline Run: Component Selection</div>
          <div className="text-muted mb-2">
            Listed below are the files with changes impacted in this pipeline run. Please confirm that you want to
            proceed with this operation.
          </div>
          <CustomTabContainer>
            <CustomTab activeTab={activeTab} tabText={"SFDC Files"} handleTabClick={handleTabClick} tabName={"sfdc"}
                       toolTipText={"SFDC Files"} icon={faSalesforce} />
          </CustomTabContainer>
        </div>
        <div className={"my-4"}>
          <SfdcRulesInputContainer ruleList={profileComponentsRuleList} setRuleList={setProfileComponentsRuleList} postBody={getPostBody()} modifiedFiles={profileComponentList} />
        </div>
        <FilterContainer
          loadData={rulesReload}
          filterDto={filterDto}
          setFilterDto={setFilterDto}
          isLoading={componentsLoading || rulesReloading}
          title={"Profile Components"}
          titleIcon={faSalesforce}
          body={getProfileFilesView()}
          supportSearch={true}
          inlineFilters={getSfdcInlineFilters()}
        />
        <SaveButtonContainer>
          <div className={"ml-auto my-3"}>
            <Button variant="secondary" size="sm" className="mr-2" onClick={() => {
              setView(2);
            }}>
              <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>Back
            </Button>
            <Button variant="success" size="sm" onClick={() => handleApproveChanges()}
                    disabled={!Array.isArray(profileComponentList) || profileComponentList.length === 0}
            >
              <IconBase isLoading={save} icon={faStepForward} fixedWidth className="mr-1"/>
              Proceed with Filtered Files
            </Button>
            <CancelButton size={"sm"} className={"ml-2"} cancelFunction={handleClose}/>
          </div>
        </SaveButtonContainer>
      </div>
    </div>
  );
};

SfdcPipelineProfileComponentsView.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  handleClose: PropTypes.func,
  recordId: PropTypes.string,
  setRecordId: PropTypes.func,
  gitTaskData: PropTypes.object,
  profileComponentsRuleList: PropTypes.array,
  setProfileComponentsRuleList: PropTypes.func
};

export default SfdcPipelineProfileComponentsView;

