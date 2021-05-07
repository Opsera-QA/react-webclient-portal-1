import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Tooltip, InputGroup, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward,
  faPlus,
  faMinus,
  faEdit,
  faPen,
  faCode,
  faSquare,
  faSearch,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import "../../workflows.css";
import DropdownList from "react-widgets/lib/DropdownList";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "../../../../contexts/DialogToastContext";
import sfdcPipelineActions from "./sfdc-pipeline-actions";
import filterMetadata from "./filter-metadata";
import Model from "../../../../core/data_model/model";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import PageSize from "components/common/pagination/page_options/PageSize";
import { isEquals } from "components/common/helpers/array-helpers";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import { format } from "date-fns";
import SfdcComponentFilter from "components/common/filters/sfdc/sfdc_component/SfdcComponentFilter";
import sfdcComponentFilterMetadata from './sfdc-component-filter-metadata';
import InlineBooleanFilter from "components/common/filters/boolean/InlineBooleanFilter";
import TooltipWrapper from "components/common/tooltip/TooltipWrapper";
import SfdcModifiedFilesTabView from "./tab_views/SfdcModifiedFilesTabView";
import GitModifiedFilesTabView from "./tab_views/GitModifiedFilesTabView";
import SfdcDestModifiedFilesTabView from "./tab_views/SfdcDestModifiedFilesTabView";
import SfdcProfileSelectionView from "./tab_views/SfdcProfileSelectionView";
import InlineWarning from "components/common/status_notifications/inline/InlineWarning";

let timerIds = [];

const SfdcPipelineModifiedFiles = ({
  pipelineId,
  stepId,
  handleClose,
  setView,
  isProfiles,
  isOrgToOrg,
  stepToolConfig,
  modifiedFiles,
  fromSFDC,
  fromGit,
  fromDestinationSFDC,
  setFromSFDC,
  setFromGit,
  setXML,
  setFromDestinationSFDC,
  selectedComponentTypes,
  gitSelectedComponent,
  setGitSelectedComponent,
  sfdcSelectedComponent,
  setSFDCSelectedComponent,
  destSFDCSelectedComponent,
  setDestSFDCSelectedComponent,
  recordId,
  setRecordId,
  unitTestSteps,
  selectedComp,
  setSelectedComp,
  sfdcCheckAll,
  setSfdcCheckAll,
  destSfdcCheckAll,
  setDestSfdcCheckAll,
  gitCheckAll,
  setGitCheckAll,
  gitTaskData,
  gitTaskId,
  closePanel
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [sfdcLoading, setSfdcLoading] = useState(false);
  const [gitLoading, setGitLoading] = useState(false);
  const [destSfdcLoading, setDestSfdcLoading] = useState(false);
  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);
  const [gitModified, setGitModified] = useState([]);
  const [sfdcModified, setSfdcModified] = useState([]);
  const [destSfdcModified, setDestSfdcModified] = useState([]);
  const [componentType, setComponentType] = useState([]);
  const [allGitComponentType, setAllGitComponentType] = useState([]);
  const [allSFDCComponentType, setAllSFDCComponentType] = useState([]);
  const [allDestSfdcComponentType, setAllDestSfdcComponentType] = useState([]);
  const [sfdcFilterDto, setSfdcFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [gitFilterDto, setGitFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [destSfdcFilterDto, setDestSfdcFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));
  const [activeTab, setActiveTab] = useState("sfdc");
  const [sfdcModifiedFilesTable, setSfdcModifiedFilesTable] = useState([]);
  const [gitModifiedFilesTable, setGitModifiedFilesTable] = useState([]);
  const [sfdcWarningMessage, setSfdcWarningMessage] = useState("");
  const [gitWarningMessage, setGitWarningMessage] = useState("");
  
  useEffect(() => {
    async function loadInitialData() {
      if(gitTaskData) {
        setLoading(true);
        loadSfdcData();
        let componentTypesArr = [];
        let uniqueComponentTypes =  isProfiles ? [...new Set(selectedComp.map(item => item))] : [...new Set(selectedComponentTypes.map(item => item))];
        uniqueComponentTypes.map(item => componentTypesArr.push({ "text": item, "value": item }));
        setComponentType(componentTypesArr);
        setLoading(false);
        setFromSFDC(true);
        return;
      }
      setLoading(true);
      loadSfdcData();
      if(!isOrgToOrg){
        loadGitData();
      }else{
        loadDestSfdcData();
      }
      let componentTypesArr = [];
      let uniqueComponentTypes =  isProfiles ? [...new Set(selectedComp.map(item => item))] : [...new Set(selectedComponentTypes.map(item => item))];
      uniqueComponentTypes.map(item => componentTypesArr.push({ "text": item, "value": item }));
      setComponentType(componentTypesArr);
      setLoading(false);
      setFromSFDC(true);
    }

    loadInitialData();

    return function cleanup() {      
      timerIds.forEach(timerId => clearTimeout(timerId));
    };

  }, []);

  const sfdcPolling = async (count = 1) => {
    try {
      let sfdcResponse = await sfdcPipelineActions.getListFromPipelineStorage({
        "pipelineId": gitTaskData ? "N/A" : pipelineId,
        "stepId": gitTaskData ? "N/A" : stepId,
        "dataType": gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml",
        "gitTaskId": gitTaskData ? gitTaskId : false,
        "fetchAttribute": "sfdcCommitList",
      }, sfdcFilterDto, getAccessToken);

      if(sfdcResponse.data.data.sfdcWarnMessage){
        setSfdcWarningMessage(sfdcResponse.data.data.sfdcWarnMessage);
      }

      if(!sfdcResponse.data.data.sfdcErrorMessage && 
          sfdcResponse.data.data.sfdcCommitList?.length === 0 && 
          count < 5 ) {
        
        await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));        
        count++;
        return await sfdcPolling(count);
      }else{        
        return sfdcResponse;
      }
    } catch (error) {      
      toastContext.showInlineErrorMessage(error);
    }     
  };

  const gitPolling = async (count = 1) => {
    try {
      let gitResponse = await sfdcPipelineActions.getListFromPipelineStorage({
        "pipelineId": pipelineId,
        "stepId": stepId,
        "dataType": "sfdc-packageXml",
        "fetchAttribute": "gitCommitList",
      }, gitFilterDto, getAccessToken);

      if(gitResponse.data.data.gitWarnMessage){
        setGitWarningMessage(gitResponse.data.data.gitWarnMessage);
      }
        
      if(!gitResponse.data.data.gitErrorMessage && 
          gitResponse.data.data.gitCommitList?.length === 0 
          && count < 5) {                
        await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
        count++;
        return await gitPolling(count);
      }else{        
        return gitResponse;
      }
    } catch (error) {      
      toastContext.showInlineErrorMessage(error);
    }     
  };

  const destSfdcPolling = async (count = 1) => {
    try {
      const destSfdcResponse = await sfdcPipelineActions.getListFromPipelineStorage({
        "pipelineId": pipelineId,
        "stepId": stepId,
        "dataType": "sfdc-packageXml",
        "fetchAttribute": "destSfdcCommitList",
      }, destSfdcFilterDto, getAccessToken);

      if(!destSfdcResponse.data.data.destSfdcErrorMessage && 
          destSfdcResponse.data.data.destSfdcCommitList?.length === 0 && 
          count < 5) {        
        await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
        count++;
        return await destSfdcPolling(count);
      }else{        
        return destSfdcResponse;
      }

    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
  };

  

  const loadSfdcData = async () => {    
    setSfdcLoading(true);    
    try {
      setSfdcWarningMessage("");
      const sfdcResponse = await sfdcPolling();

      if(sfdcResponse.data.data.sfdcErrorMessage){
        toastContext.showInlineErrorMessage("SFDC Fetch Error : "+ sfdcResponse.data.data.sfdcErrorMessage);
      }

      if (!sfdcResponse.data.data || !sfdcResponse.data.paginatedData) {
        toastContext.showInlineErrorMessage("something went wrong! not a valid object");
      }

      let newSfdcFilterDto = sfdcFilterDto;
      newSfdcFilterDto.setData("totalCount", sfdcResponse.data.paginatedData.sfdcCommitList.count);
      newSfdcFilterDto.setData("activeFilters", newSfdcFilterDto.getActiveFilters());
      newSfdcFilterDto.setData("checkAll", sfdcSelectedComponent.length > 0 && isEquals(sfdcSelectedComponent, sfdcResponse.data.paginatedData.sfdcCommitList.data));
      setSfdcFilterDto({ ...newSfdcFilterDto });      
      setSfdcModified(sfdcResponse.data.paginatedData.sfdcCommitList.data);
      setAllSFDCComponentType(sfdcResponse.data.data.sfdcCommitList);
      getSfdcTableData(sfdcResponse.data.paginatedData.sfdcCommitList.data, sfdcResponse.data.data.sfdcCommitList);
      //storing _id so that we can edit this object
      setRecordId(sfdcResponse.data._id);
      
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    setSfdcLoading(false);
  };

  const loadGitData = async () => {

    setGitLoading(true);
    try {
      setGitWarningMessage("");
      const gitResponse = await gitPolling();

      if(gitResponse.data.data.gitErrorMessage){
        toastContext.showInlineErrorMessage("Git Fetch Error : "+ gitResponse.data.data.gitErrorMessage);
      }

      if (!gitResponse.data.data || !gitResponse.data.paginatedData) {
        toastContext.showInlineErrorMessage("something went wrong! not a valid object");
      }

      let newGitFilterDto = gitFilterDto;
      newGitFilterDto.setData("totalCount", gitResponse.data.paginatedData.gitCommitList.count);
      newGitFilterDto.setData("activeFilters", newGitFilterDto.getActiveFilters());
      newGitFilterDto.setData("checkAll", gitSelectedComponent.length > 0 && isEquals(gitSelectedComponent, gitResponse.data.paginatedData.gitCommitList.data));
      setGitFilterDto({ ...newGitFilterDto });

      setGitModified(gitResponse.data.paginatedData.gitCommitList.data);
      setAllGitComponentType(gitResponse.data.data.gitCommitList);
      getGitTableData(gitResponse.data.paginatedData.gitCommitList.data, gitResponse.data.data.gitCommitList);
      //storing _id so that we can edit this object
      setRecordId(gitResponse.data._id);

    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    setGitLoading(false);
  };

  const loadDestSfdcData = async () => {
    setDestSfdcLoading(true);
    try {
      const destSfdcResponse = await destSfdcPolling();

      if(destSfdcResponse.data.data.destSfdcErrorMessage){
        toastContext.showInlineErrorMessage("Dest SFDC Fetch Error : "+ destSfdcResponse.data.data.destSfdcErrorMessage);
      }

      if (!destSfdcResponse.data.data || !destSfdcResponse.data.paginatedData) {
        toastContext.showInlineErrorMessage("something went wrong! not a valid object");
      }
      let newDestSfdcFilterDto = destSfdcFilterDto;
      newDestSfdcFilterDto.setData("totalCount", destSfdcResponse.data.paginatedData.destSfdcCommitList.count);
      newDestSfdcFilterDto.setData("activeFilters", newDestSfdcFilterDto.getActiveFilters());
      setDestSfdcFilterDto({ ...newDestSfdcFilterDto });

      setDestSfdcModified(destSfdcResponse.data.paginatedData.destSfdcCommitList.data);
      setAllDestSfdcComponentType(destSfdcResponse.data.data.destSfdcCommitList);

    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    setDestSfdcLoading(false);
  };

  useEffect(() => {
    if (fromSFDC) {
      setFromDestinationSFDC(false);
      setFromGit(false);
    }
  }, [fromSFDC]);

  useEffect(() => {
    if (fromDestinationSFDC) {
      setFromSFDC(false);
      setFromGit(false);
    }
  }, [fromDestinationSFDC]);

  useEffect(() => {
    if (fromGit) {
      setFromDestinationSFDC(false);
      setFromSFDC(false);
    }
  }, [fromGit]);

  useEffect(()=>{
    // console.log(isEquals(sfdcSelectedComponent, allSFDCComponentType));    
    if(sfdcSelectedComponent.length > 0 && isEquals(sfdcSelectedComponent, allSFDCComponentType)){
      setSfdcCheckAll(true);
      sfdcFilterDto.setData("checkAll", true);
      getSfdcTableData(sfdcModified, allSFDCComponentType);
    } else {
      setSfdcCheckAll(false);
    }
  },[allSFDCComponentType, sfdcSelectedComponent]);

  useEffect(()=>{    
    if(isEquals(sfdcSelectedComponent, sfdcModified) || sfdcSelectedComponent.length === 0){
      getSfdcTableData(sfdcModified, allSFDCComponentType);
    }    
  },[sfdcSelectedComponent]);

  useEffect(()=>{    
    if(isEquals(gitSelectedComponent, gitModified) || gitSelectedComponent.length === 0){            
      getGitTableData(gitModified, allGitComponentType);
    }    
  },[gitSelectedComponent]);
  
  useEffect(()=>{
    if(isEquals(destSFDCSelectedComponent, allDestSfdcComponentType)){
      setDestSfdcCheckAll(true);
    } else {
      setDestSfdcCheckAll(false);
    }
  },[allDestSfdcComponentType, destSFDCSelectedComponent]);
  
  useEffect(()=>{    
    if(gitSelectedComponent.length > 0 && isEquals(gitSelectedComponent, allGitComponentType)){
      setGitCheckAll(true);
      gitFilterDto.setData("checkAll", true);
      getGitTableData(gitModified, allGitComponentType);
    } else {
      setGitCheckAll(false);
    }
  },[allGitComponentType, gitSelectedComponent]);

  const handleSFDCComponentCheckNew = (data) => {        
    if (!data.isChecked) {
      setSFDCSelectedComponent((sfdcSelectedComponent) => sfdcSelectedComponent.filter((item) => item.committedFile !== data.committedFile));
      return;
    }
    const newObj = {
      componentType: data.componentType,
      committedFile: data.committedFile,
      committedTime: data.committedTime,
      committedBy: data.committedBy,
      committedFileId: data.committedFileId
    };
    setSFDCSelectedComponent((sfdcSelectedComponent) => [...sfdcSelectedComponent, newObj]);
  };
  const handleGitComponentCheckNew = (data) => {    
    if (!data.isChecked) {
      setGitSelectedComponent((gitSelectedComponent) => gitSelectedComponent.filter((item) => item.committedFile !== data.committedFile));
      return;
    }

    const newObj = {
      componentType: data.componentType,
      committedFile: data.committedFile,
      committedTime: data.committedTime,      
      commitAction: data.commitAction,
      committedBy: data.committedBy
    };

    setGitSelectedComponent((gitSelectedComponent) => [...gitSelectedComponent, newObj]);
  };

  const handleCheckAllClickComponentTypesSfdc = () => {    
    if(sfdcFilterDto.getData("checkAll")){
      handleCheckAllClickComponentTypes("sfdc");
    }else{
      handleUnCheckAllClickComponentTypes("sfdc");
    }
  };

  const handleCheckAllClickComponentTypesGit = () => {    
    if(gitFilterDto.getData("checkAll")){
      handleCheckAllClickComponentTypes("git");
    }else{
      handleUnCheckAllClickComponentTypes("git");
    }
  };

  const handleCheckAllClickComponentTypes = (type) => {
    // for advanced obj selection we have to select items which are visible on this page itself not all
    switch (type) {
    case "sfdc":
      // setSFDCSelectedComponent(allSFDCComponentType);
      setSFDCSelectedComponent(sfdcModified);
      break;
    case "destSFDC":
      // setDestSFDCSelectedComponent(allDestSfdcComponentType);
      setDestSFDCSelectedComponent(destSfdcModified);
      break;
    case "git":
      // setGitSelectedComponent(allGitComponentType);
      setGitSelectedComponent(gitModified);
      break;
    default :
      break;
    }
  };

  const handleUnCheckAllClickComponentTypes = (type) => {
    switch (type) {
    case "sfdc":
      setSFDCSelectedComponent([]);
      break;
    case "destSFDC":
      setDestSFDCSelectedComponent([]);
      break;
    case "git":
      setGitSelectedComponent([]);
      break;
    default :
      break;
    }
  };

  const handleSelectAll = (type) => {
    // const type = e.target.name;
    // set checkall flag for selected type 

    switch (type) {
      case "sfdc":
        setSfdcCheckAll(true);
        setDestSfdcCheckAll(false);
        setGitCheckAll(false);
        setSFDCSelectedComponent(allSFDCComponentType);
        handleApproveChanges(true);
        break;
      case "destSFDC":
        // setSfdcCheckAll(false);
        // setDestSfdcCheckAll(true);
        setGitCheckAll(false);
        setSfdcCheckAll(true);
        setDestSfdcCheckAll(false);
        setSFDCSelectedComponent(allSFDCComponentType);
        // setDestSFDCSelectedComponent(allDestSfdcComponentType);
        handleApproveChanges(true);
        break;
      case "git":
        setSfdcCheckAll(false);
        setDestSfdcCheckAll(false);
        setGitCheckAll(true);
        setGitSelectedComponent(allGitComponentType);
        handleApproveChanges(true);
        break;
      default :
        break;
      }

  };

  const checkDisabled = () => {
    if(((fromSFDC || fromDestinationSFDC) && sfdcModifiedFilesTable.length === 0) || 
      (fromGit && gitModifiedFilesTable.length === 0)) return true;
    if (fromGit || fromSFDC || fromDestinationSFDC) return false;
    return true;
  };

  const handleApproveChanges = async (checkall) => {
    // TODO: This needs to be handled differently
    let selectedList = [];
    let typeOfSelection;
    if (fromSFDC) {
      selectedList = (sfdcCheckAll || checkall) ? "all" : [...sfdcSelectedComponent];
      typeOfSelection = "sfdcCommitList"; 
    }
    if (fromDestinationSFDC) {
      // selectedList = (destSfdcCheckAll || checkall) ? "all" : [...destSFDCSelectedComponent];
      // typeOfSelection = "destSfdcCommitList";
      selectedList = (sfdcCheckAll || checkall) ? "all" : [...sfdcSelectedComponent];
      typeOfSelection = "sfdcCommitList";
    }
    if (fromGit) {
      selectedList = (gitCheckAll || checkall) ? "all" : [...gitSelectedComponent];
      typeOfSelection = "gitCommitList"; 
    }
    if (selectedList.length < 1) {
      setError("Please select atlest one component to proceed!");
      setSave(false);
      return;
    }
    // saving selected files to mongo before calling generate xml func
    try {
      if (isProfiles) {
        await saveSelectedList(selectedList, typeOfSelection);
        return;
      } else {
        await sfdcPipelineActions.setListToPipelineStorage({
          "recordId": recordId,
          "pipelineId": gitTaskData ? "N/A" :pipelineId,
          "stepId": gitTaskData ? "N/A" : stepId,
          "dataType": gitTaskData ? "sync-sfdc-repo" : "sfdc-packageXml",
          "gitTaskId": gitTaskData ? gitTaskId : false,
          "updateAttribute": "selectedFileList",
          "typeOfSelection" : typeOfSelection,
          "data": selectedList,
        }, getAccessToken);
       
        await generateXML();
      }
    } catch (err) {
      console.error("Error saving selected data: ", error);
      toastContext.showInlineErrorMessage(error);
    }
  };

  const saveSelectedList = async (selectedList, typeOfSelection) => {
    try {
      await sfdcPipelineActions.setListToPipelineStorage({
        "recordId": recordId,
        "pipelineId": pipelineId,
        "stepId": stepId,
        "dataType": "sfdc-packageXml",
        "updateAttribute": "profilesList",
        "typeOfSelection" : typeOfSelection,
        "data": selectedList,
      }, getAccessToken);
      getProfileComponentList();
    } catch (err) {
      console.error("Error saving selected data: ", error);
      toastContext.showInlineErrorMessage(error);
    }
  };
  const getProfileComponentList = async () => {
    const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      isProfiles: isProfiles,
      componentTypes: isProfiles ? selectedComponentTypes : [],
      // commitList: selectedList,
      isSfdc: fromSFDC || fromDestinationSFDC ? true : false,
    };

    try {
      let getProfileComponentListRes = await sfdcPipelineActions.getProfileComponentList(postBody, getAccessToken);
      
      if (getProfileComponentListRes.data.status != 200) {
        console.error("Error getting API Data: ", getProfileComponentListRes.data.message);
        setSave(false);
        // setError(result.data.message);
        toastContext.showInlineErrorMessage(error);
      } else {      
        setView(3);
      }
    } catch (err) {
      console.error("Error saving selected data: ", error);
      toastContext.showInlineErrorMessage(error);
    }
  };

  const generateXML = async () => {
    try {
       
      const postBody = {
        pipelineId: gitTaskData ? "N/A" : pipelineId,
        stepId: gitTaskData ? "N/A" : stepId,
        gitTaskId: gitTaskData ? gitTaskId : false,
        isProfiles: isProfiles,
        componentTypes: isProfiles ? selectedComponentTypes : [],
        // commitList: selectedList,
        isSfdc: fromSFDC || fromDestinationSFDC ? true : false,
      };

      const result = await sfdcPipelineActions.generateXML(postBody, getAccessToken);

      if (result.data.status != 200) {
        console.error("Error getting API Data: ", result.data.message);
        setSave(false);
        // setError(result.data.message);
        toastContext.showInlineErrorMessage(error);
      } else {
        // setXML(result.data.message); // not saving anything from response here
        // setView(4); //move to next view
         if(unitTestSteps.length > 0) {
            setView(5);
            return;
          }
          setView(4);
          return;
      }
    } catch (err) {
      console.error(err.message);
      toastContext.showInlineErrorMessage(error);
      setSave(false);
    }
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);
    if(tabSelection === 'sfdc'){
      setFromSFDC(true);
    }else if(tabSelection === 'git'){
      setFromGit(true);
    }else if(tabSelection === 'destsfdc'){
      setFromDestinationSFDC(true);
    }    
  };

  const getSfdcTableData = (sfdcData, allSfdc) => {
    setSfdcModifiedFilesTable(sfdcData.map(d => {
       return Object.assign(
        {
          checkAll: isEquals(sfdcSelectedComponent, allSfdc),
          isChecked: sfdcSelectedComponent.some(selected => selected.componentType === d.componentType && selected.committedFile === d.committedFile && selected.commitAction === d.commitAction && selected.committedTime === d.committedTime)
        },
        d
      );
    }));
  };

  const getGitTableData = (gitData, allGit) => {        
    setGitModifiedFilesTable(gitData.map(d => {
      return Object.assign(
        {
          checkAll: isEquals(gitSelectedComponent, allGit),
          isChecked: gitSelectedComponent.some(selected => selected.componentType === d.componentType && selected.committedFile === d.committedFile && selected.commitAction === d.commitAction && selected.committedTime === d.committedTime)
        },
        d
      );
    }));
  };

  if (error) {
    return (<div className="mt-3">
      <ErrorDialog error={error}/>
    </div>);
  }

  if (save || loading ) {
    return (<LoadingDialog size="sm" message="Loading Files..."/>);
  }

  return (
    <div>
      <div className="flex-container">
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run: File Comparison</div>
          <div className="text-muted mb-2">
            Listed below are the files with changes impacted in this pipeline run. Please confirm that you want to
            proceed with this operation.
          </div>
          { activeTab === "git" && gitWarningMessage ? (
            <InlineWarning warningMessage={gitWarningMessage} className="pl-3" />
          ) : activeTab !== "git" && sfdcWarningMessage ? (
              <InlineWarning warningMessage={sfdcWarningMessage} className="pl-3" />
          ) : null }
          
          <CustomTabContainer>            
            <CustomTab activeTab={activeTab} tabText={"SFDC Files"} handleTabClick={handleTabClick} tabName={"sfdc"} disabled={gitTaskData ? true : false}
                      toolTipText={"SFDC Files"} icon={faSalesforce} />
            { !isOrgToOrg ? (
              <CustomTab activeTab={activeTab} tabText={"Git Files"} handleTabClick={handleTabClick} tabName={"git"} disabled={gitTaskData ? true : false}
              toolTipText={"Git Files"} icon={faCode} />
            ) : null
            }
          </CustomTabContainer>
          {activeTab === "sfdc" && !isOrgToOrg ? (            
            <SfdcModifiedFilesTabView 
              loadData={loadSfdcData}
              filterDto={sfdcFilterDto}
              setFilterDto={setSfdcFilterDto}
              loading={sfdcLoading}
              componentType={componentType}
              data={sfdcModifiedFilesTable}
              handleComponentCheck={handleSFDCComponentCheckNew}
              handleCheckAllClickComponentTypes={handleCheckAllClickComponentTypesSfdc}
              fileUploadFlag={true}
              recordId={recordId}
              updateAttribute= {isProfiles ? "profilesList" : "selectedFileList"}
              callbackFunc={isProfiles ? getProfileComponentList : generateXML}
              fromGit={fromGit}
              fromSFDC={fromSFDC}
              fromDestinationSFDC={fromDestinationSFDC}
              fromProfileComponents={false}
              allSFDCComponentType={allSFDCComponentType}
              allGitComponentType={allGitComponentType}
              allDestSfdcComponentType={allDestSfdcComponentType}
              allProfileComponentType={[]}
              gitTaskData={gitTaskData}
            />              
          ) : activeTab === "git" ? (          
            <GitModifiedFilesTabView 
              loadData={loadGitData}
              filterDto={gitFilterDto}
              setFilterDto={setGitFilterDto}
              loading={gitLoading}
              componentType={componentType}
              data={gitModifiedFilesTable}
              handleComponentCheck={handleGitComponentCheckNew}
              handleCheckAllClickComponentTypes={handleCheckAllClickComponentTypesGit}
              // fileUploadFlag={true}
              // recordId={recordId}
              // updateAttribute= {isProfiles ? "profilesList" : "selectedFileList"}
              // callbackFunc={isProfiles ? getProfileComponentList : generateXML}
              // fromGit={fromGit}
              // fromSFDC={fromSFDC}
              // fromDestinationSFDC={fromDestinationSFDC}
              // allSFDCComponentType={allSFDCComponentType}
              // allGitComponentType={allGitComponentType}
              // allDestSfdcComponentType={allDestSfdcComponentType}   
            />
          ) : activeTab === "sfdc" && isOrgToOrg ? (            
            <SfdcProfileSelectionView 
              destLoadData={loadDestSfdcData}
              destFilterDto={destSfdcFilterDto}
              setDestFilterDto={setDestSfdcFilterDto}
              destLoading={destSfdcLoading}
              destComponentType={componentType}
              destData={destSfdcModified}
              loadData={loadSfdcData}
              filterDto={sfdcFilterDto}
              setFilterDto={setSfdcFilterDto}
              loading={sfdcLoading}
              componentType={componentType}
              data={sfdcModifiedFilesTable}
              handleComponentCheck={handleSFDCComponentCheckNew}
              handleCheckAllClickComponentTypes={handleCheckAllClickComponentTypesSfdc}   
              fileUploadFlag={true}
              recordId={recordId}
              updateAttribute= {isProfiles ? "profilesList" : "selectedFileList"}
              callbackFunc={isProfiles ? getProfileComponentList : generateXML}
              fromGit={fromGit}
              fromSFDC={fromSFDC}
              fromDestinationSFDC={fromDestinationSFDC}
              fromProfileComponents={false}
              allSFDCComponentType={allSFDCComponentType}
              allGitComponentType={[]}
              allDestSfdcComponentType={allDestSfdcComponentType}
              allProfileComponentType={[]}
              gitTaskData={gitTaskData}                   
            />
          ) : null }            
        </div>
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
          <Button
            variant="secondary"
            size="sm"
            className="mr-2"
            onClick={() => {
              setView(1);
            }}
          >
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1"/>
            Back
          </Button>
          <Button
            variant="success"
            size="sm"
            className="mr-2"
            onClick={() => {
              setSave(true);
              handleSelectAll(activeTab);
            }}
            disabled={checkDisabled()}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
            ) : (
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>
            )}            
            { activeTab === "git" ? 'Use All Git Files' : 'Use All SFDC Files' }
          </Button>            
          <Button
            variant="success"
            size="sm"
            onClick={() => {              
              setSave(true);
              handleApproveChanges();
            }}
            disabled={checkDisabled()}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
            ) : (
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>
            )}
            { activeTab === "git" ? 'Proceed with Selected Git Files' : 'Proceed with Selected SFDC Files' }
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            className="ml-2"
            onClick={() => {
              if(gitTaskData) {
                closePanel();
                return;
              }
              handleClose();
            }}
          >
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1"/>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

SfdcPipelineModifiedFiles.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  isOrgToOrg: PropTypes.bool,
  isProfiles: PropTypes.bool,
  stepToolConfig: PropTypes.object,
  modifiedFiles: PropTypes.object,
  setFromSFDC: PropTypes.func,
  fromSFDC: PropTypes.bool,
  selectedComponentTypes: PropTypes.array,
  setFromDestinationSFDC: PropTypes.func,
  fromDestinationSFDC: PropTypes.bool,
  setFromGit: PropTypes.func,
  setXML: PropTypes.func,
  fromGit: PropTypes.bool,
  handleClose: PropTypes.func,
  gitSelectedComponent: PropTypes.array,
  setGitSelectedComponent: PropTypes.func,
  sfdcSelectedComponent: PropTypes.array,
  setSFDCSelectedComponent: PropTypes.func,
  destSFDCSelectedComponent: PropTypes.array,
  setDestSFDCSelectedComponent: PropTypes.func,
  recordId: PropTypes.string,
  setRecordId: PropTypes.func,
  unitTestSteps: PropTypes.array,
  selectedComp: PropTypes.object,
  setSelectedComp: PropTypes.func,
  sfdcCheckAll: PropTypes.bool,
  setSfdcCheckAll: PropTypes.func,
  destSfdcCheckAll: PropTypes.bool,
  setDestSfdcCheckAll: PropTypes.func,
  gitCheckAll: PropTypes.bool,
  setGitCheckAll: PropTypes.func,
  gitTaskData: PropTypes.object,
  gitTaskId: PropTypes.string,
  closePanel: PropTypes.func
};

export default SfdcPipelineModifiedFiles;
