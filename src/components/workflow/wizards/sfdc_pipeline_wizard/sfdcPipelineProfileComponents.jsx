import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faTimes,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "../../../../contexts/DialogToastContext";
import sfdcPipelineActions from "./sfdc-pipeline-actions";
import Model from "../../../../core/data_model/model";
import { isEquals } from "components/common/helpers/array-helpers";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import sfdcComponentFilterMetadata from './sfdc-component-filter-metadata';
import SfdcModifiedFilesTabView from "./tab_views/SfdcModifiedFilesTabView";
import CancelButton from "components/common/buttons/CancelButton";

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  componentType: "",
  committedFile: "",
};

const SfdcPipelineProfileComponents = ({
  pipelineId,
  stepId,
  handleClose,
  selectedComponentTypes,
  setView,
  isProfiles,
  isOrgToOrg,
  fromProfiles,
  setFromProfiles,
  selectedProfileComponent,
  setSelectedProfileComponent,
  recordId,
  setRecordId,
  profileCompCheckAll,
  setProfileCompCheckAll,
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [componentsLoading, setComponentsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);
  const [componentType, setComponentType] = useState([]);
  const [allProfileComponentType, setAllProfileComponentType] = useState([]);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [profileComponentList, setProfileComponentList] = useState([]);
  const [filterDto, setFilterDto] = useState(new Model({ ...sfdcComponentFilterMetadata.newObjectFields }, sfdcComponentFilterMetadata, false));

  const [activeTab, setActiveTab] = useState("sfdc");
  const [modifiedFilesTable, setModifiedFilesTable] = useState([]);

  useEffect(() => {
    async function loadInitialData() {
      await loadData();
      let componentTypesArr = [];
      let uniqueComponentTypes = [...new Set(selectedComponentTypes.map(item => item))];
      uniqueComponentTypes.map(item => componentTypesArr.push({ "text": item, "value": item }));
      setComponentType(componentTypesArr);
    }

    setLoading(true);
    loadInitialData();
    setFromProfiles(true);
  }, []);

  useEffect(()=>{
    if(isEquals(selectedProfileComponent, allProfileComponentType)){
      setProfileCompCheckAll(true);
    } else {
      setProfileCompCheckAll(false);
    }
  },[allProfileComponentType, selectedProfileComponent]);

  useEffect(()=>{    
    if(isEquals(selectedProfileComponent, profileComponentList) || selectedProfileComponent.length === 0){
      getProfileComponentTableData(profileComponentList, allProfileComponentType);
    }    
  },[selectedProfileComponent]);
  

  const loadData = async () => {
    setComponentsLoading(true);
    try {
      const response = await sfdcPipelineActions.getListFromPipelineStorage({
        "pipelineId": pipelineId,
        "stepId": stepId,
        "dataType": "sfdc-packageXml",
        "fetchAttribute": "profileComponentList",
      }, filterDto, getAccessToken);

      if (!response.data.data || !response.data.paginatedData) {
        toastContext.showInlineErrorMessage("something went wrong! not a valid object");
      }
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.paginatedData.profileComponentList.count);
      newFilterDto.setData("activeFilters", newFilterDto.getActiveFilters());      
      filterDto.setData("checkAll", isEquals(selectedProfileComponent, response.data.paginatedData.profileComponentList.data));
      setFilterDto({ ...newFilterDto });

      setProfileComponentList(response.data.paginatedData.profileComponentList.data);
      setAllProfileComponentType(response.data.data.profileComponentList);
      getProfileComponentTableData(response.data.paginatedData.profileComponentList.data, response.data.data.profileComponentList);      

      //storing _id so that we can edit this object
      setRecordId(response.data._id);

    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showInlineErrorMessage(error);
    }
    setComponentsLoading(false);
    setLoading(false);
  };

  const checkDisabled = () => {
    if(modifiedFilesTable.length === 0) return true;
    if (fromProfiles) return false;
    return true;
  };

  const handleSearch = async () => {
    let newFilterDto = filterDto;
    newFilterDto.setData("pageSize", 50);
    newFilterDto.setData("currentPage", 1);
    newFilterDto.setData("classFilter", formData.componentType);
    newFilterDto.setData("search", formData.committedFile);
    setFilterDto({ ...newFilterDto });

    await loadData();
  };

  const handleSelectAll = () => {
      setProfileCompCheckAll(true);
      setSelectedProfileComponent(allProfileComponentType);
      handleApproveChanges(true);
  };

  const handleApproveChanges = async (checkall) => {
    
    setSave(true);
    // let selectedList = [];
    // if (fromProfiles) {
    let selectedList = (profileCompCheckAll || checkall) ? "all" : [...selectedProfileComponent];
    let typeOfSelection = "profileComponentList";
    // }
    if (selectedList.length < 1) {
      setError("Please select atleast one component to proceed!");
      setSave(false);
      return;
    }
    // saving selected files to mongo before calling generate xml func
    try {

      let triggerResponse = await sfdcPipelineActions.setListToPipelineStorage({
        "recordId": recordId,
        "pipelineId": pipelineId,
        "stepId": stepId,
        "dataType": "sfdc-packageXml",
        "updateAttribute": "selectedFileList",
        "typeOfSelection" : typeOfSelection,
        "data": selectedList,
      }, getAccessToken);
      
    if (triggerResponse.status != 200) {
      console.error("Error getting API Data: ", triggerResponse.data.message);
      setSave(false);
      // setError(result.data.message);
      toastContext.showInlineErrorMessage(error);
    } else {      
      await generateXML();
    }

    } catch (err) {
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
        isProfiles: isProfiles,
        componentTypes: isProfiles ? selectedComponentTypes : "",
        isSfdc: true,
      };

      const result = await sfdcPipelineActions.generateXML(postBody, getAccessToken);

      if (result.data.status != 200) {
        console.error("Error getting API Data: ", result.data.message);
        setSave(false);
        toastContext.showInlineErrorMessage(error);
      } else {
        // setXML(result.data.message); // not saving anything from response here
        setView(4); //move to next view
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
  };

  const handleComponentCheckNew = (data) => {
    if (!data.isChecked) {      
      setSelectedProfileComponent((selectedProfileComponent) => selectedProfileComponent.filter((item) => item.committedFile !== data.committedFile));
      return;
    }
    const newObj = {
      componentType: data.componentType,
      committedFile: data.committedFile,
      committedTime: data.committedTime,
      commitAction: data.commitAction
    };
    setSelectedProfileComponent((selectedProfileComponent) => [...selectedProfileComponent, newObj]);
  };

  const handleCheckAllClickComponentTypesProfile = () => {    
    if(filterDto.getData("checkAll")){
      setSelectedProfileComponent(profileComponentList);
    }else{
      setSelectedProfileComponent([]);
    }
  };

  const getProfileComponentTableData = (data, allProfile) => {
    setModifiedFilesTable(data.map(d => {
       return Object.assign(
        {
          checkAll: isEquals(selectedProfileComponent, allProfile),
          isChecked: selectedProfileComponent.some(selected => selected.componentType === d.componentType && selected.committedFile === d.committedFile && selected.commitAction === d.commitAction && selected.committedTime === d.committedTime)          
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

  if (save || loading) {
    return (<LoadingDialog size="sm" message="Loading Selection..."/>);
  }

  return (
    <div className="mx-5">
      <div className="flex-container">        
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run: Component Selection</div>
          <div className="text-muted mb-2">
            Listed below are the files with changes impacted in this pipeline run. Please confirm that you want to
            proceed with this operation.
          </div>
          <CustomTabContainer>
            <CustomTab activeTab={activeTab} tabText={"SFDC Files"} handleTabClick={handleTabClick} tabName={"sfdc"}
                      toolTipText={"SFDC Files"} icon={faSalesforce} />            
          </CustomTabContainer>
          {activeTab === "sfdc" ? (
            <SfdcModifiedFilesTabView 
              loadData={loadData}
              filterDto={filterDto}
              setFilterDto={setFilterDto}
              loading={loading}
              componentType={componentType}
              data={modifiedFilesTable}
              handleComponentCheck={handleComponentCheckNew}
              handleCheckAllClickComponentTypes={handleCheckAllClickComponentTypesProfile}
              fileUploadFlag={true}
              recordId={recordId}
              updateAttribute= {"selectedFileList"}
              callbackFunc={generateXML}
              fromGit={false}
              fromSFDC={false}
              fromDestinationSFDC={false}
              fromProfileComponents={true}
              allSFDCComponentType={[]}
              allGitComponentType={[]}
              allDestSfdcComponentType={[]}
              allProfileComponentType={allProfileComponentType}
            />
          ) : null }          
        </div>
        <div className="flex-container-bottom pr-2 mt-3 mb-2 text-right">
          <Button
            variant="secondary"
            size="sm"
            className="mr-2"
            onClick={() => {
              setView(2);
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
              handleSelectAll();
            }}
            disabled={checkDisabled()}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
            ) : (
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>
            )}
            Use All SFDC Files
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              handleApproveChanges();
            }}
            disabled={checkDisabled()}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
            ) : (
              <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>
            )}
            Proceed with Selected SFDC Files
          </Button>
          <CancelButton cancelFunction={handleClose} size={"sm"} className={"ml-1"} />
        </div>
      </div>
    </div>
  );
};

SfdcPipelineProfileComponents.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  isOrgToOrg: PropTypes.bool,
  isProfiles: PropTypes.bool,
  stepToolConfig: PropTypes.object,
  selectedComponentTypes: PropTypes.array,
  selectedProfileComponent: PropTypes.array,
  setSelectedProfileComponent: PropTypes.func,
  handleClose: PropTypes.func,
  recordId: PropTypes.string,
  setRecordId: PropTypes.func,
  fromProfiles: PropTypes.bool,
  setFromProfiles: PropTypes.func,
  profileCompCheckAll: PropTypes.bool,
  setProfileCompCheckAll: PropTypes.func,
};

export default SfdcPipelineProfileComponents;
