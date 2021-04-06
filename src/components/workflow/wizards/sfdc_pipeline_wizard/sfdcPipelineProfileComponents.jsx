import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, InputGroup, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward,
  faPlus,
  faCode,
  faSquare,
  faSearch,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import DropdownList from "react-widgets/lib/DropdownList";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import { propTypes } from "react-widgets/lib/SelectList";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "../../../../contexts/DialogToastContext";
import sfdcPipelineActions from "./sfdc-pipeline-actions";
import filterMetadata from "./filter-metadata";
import Model from "../../../../core/data_model/model";
import DtoBottomPagination from "components/common/pagination/DtoBottomPagination";
import PageSize from "components/common/pagination/page_options/PageSize";
import { isEquals } from "components/common/helpers/array-helpers";
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import CustomTable from "components/common/table/CustomTable";
import {
  getTableDateColumn,
  getTableTextColumn,
  getCheckBoxColumn
} from "components/common/table/table-column-helpers";
import { format } from "date-fns";
import FilterContainer from "components/common/table/FilterContainer";
import SfdcComponentFilter from "components/common/filters/sfdc/sfdc_component/SfdcComponentFilter";
import sfdcComponentFilterMetadata from './sfdc-component-filter-metadata';
import InlineBooleanFilter from "components/common/filters/boolean/InlineBooleanFilter";
import SfdcModifiedFilesTabView from "./tab_views/SfdcModifiedFilesTabView";

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

  const handleComponentCheck = (e) => {
    const newValue = e.target.name;
    if (!e.target.checked) {
      setSelectedProfileComponent(selectedProfileComponent.filter((item) => item.committedFile !== newValue));
      return;
    }
    let newObj = [...profileComponentList];
    let index = -1;
    for (let i = 0; i < newObj.length; i++) {
      if (newObj[i].committedFile === newValue) {
        index = i;
        setSelectedProfileComponent((selectedProfileComponent) => [...selectedProfileComponent, newObj[index]]);
      }
    }
  };

  const handleCheckAllClickComponentTypes = () => {
    // TODO: for advacned selection feature select only the items on this page
    // setSelectedProfileComponent(allProfileComponentType);
    setSelectedProfileComponent(profileComponentList);
  };

  const handleUnCheckAllClickComponentTypes = () => {
    // setSelectedProfileComponent(selectedProfileComponent.filter((item) =>  !profileComponentList.includes( item )));
    setSelectedProfileComponent([]);
  };

  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" {...props}>
      {message.length > 0 ? message : "No message found."}
    </Tooltip>
  );

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

  const handleComponentTypeChange = (selectedOption) => {
    console.log(selectedOption);
    setFormData({
      ...formData,
      componentType: selectedOption.value, committedFile: "",
    });
  };

  const getPaginator = (dtoObj, setDto, loading, loadData) => {
    return (
      <div>{dtoObj && dtoObj.getData("totalCount") != null &&
      <>
        <DtoBottomPagination paginationStyle={"stacked"} paginationDto={dtoObj} setPaginationDto={setDto} isLoading={loading}
                            loadData={loadData}/>
                            
        <Row className="justify-content-md-center">
          <Col className="px-0" sm={4}><PageSize paginationDto={dtoObj} setPaginationDto={setDto} pageSizeList={[50, 100, 150, 200]} loadData={loadData} /></Col>
        </Row>
      </>
      }</div>
    );
  };

  const getSfdcView = () => {
    return (
      <div className="d-flex w-100 pr-2">
        <div className="col-5 list-item-container mr-1">
          <div className="h6 opsera-secondary">SFDC Files</div>

          {profileComponentList && profileComponentList.length === 0 &&
          <div className="info-text mt-3">NO FILES</div>}

          <div className="d-flex w-100">
            <div className="col-4">
              <Form.Group controlId="fromProfiles">
                <Form.Check
                  type="checkbox"
                  label="Push from SFDC"
                  name="fromProfiles"
                  // disabled={!sfdcComponentFilterObject.nameSpacePrefix || sfdcComponentFilterObject.nameSpacePrefix.length === 0}
                  checked={fromProfiles ? fromProfiles : false}
                  onChange={(e) => setFromProfiles(e.target.checked)}
                />
              </Form.Group>
            </div>
            <div className="col-9">
              {fromProfiles && (
                <div className="align-self-end">
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip("This will select all the items on this page only")}>
                  <Button variant="secondary" size="sm" className="mr-1" disabled={profileCompCheckAll}
                          onClick={() => handleCheckAllClickComponentTypes()}>
                    <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>
                    Check All
                  </Button>
                  </OverlayTrigger>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mr-1"
                    onClick={() => handleUnCheckAllClickComponentTypes()}
                  >
                    <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1"/>
                    Uncheck All
                  </Button> 
                  <Button
                    variant="success"
                    size="sm"
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
                    Use All Files
                  </Button>
                  {/* <Form.Check
                    style={{paddingTop: "10px", paddingBottom: "10px"}}
                    inline
                    type={"switch"}
                    label={"Check All"}
                    id="profileComp"
                    name="profileComp"
                    checked={profileCompCheckAll}
                    onChange={handleSelectAll}
                  /> */}
                </div>
              )}
            </div>
          </div>

          {fromProfiles &&
          <div className="d-flex w-100 pr-2">
            <div className="col-5 mr-1">
              <DropdownList
                data={componentType}
                value={
                  componentType[
                    componentType.findIndex(
                      (x) => x.value === formData.componentType,
                    )
                    ]
                }
                valueField="value"
                textField="componentType"
                placeholder="Please select a component type"
                filter="contains"
                onChange={handleComponentTypeChange}
              />
            </div>
            <div className="col-7 mr-1">
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search for the file name"
                  value={formData.committedFile || ""}
                  onChange={e => setFormData({ ...formData, committedFile: e.target.value })}
                />
                <InputGroup.Append>
                  <Button variant="secondary" size="sm" onClick={handleSearch}>
                    {componentsLoading ? (
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
                    ) : (
                      <FontAwesomeIcon icon={faSearch} fixedWidth className="mr-1"/>
                    )}
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </div>
          </div>
          }
          { componentsLoading && (
            <LoadingDialog size="sm"/> ) 
          }
          {
            !componentsLoading && typeof profileComponentList === "object" &&
            profileComponentList
              .map((item, idx) => (
                <div key={idx} className="d-flex justify-content-center">
                  <div className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                    {item.commitAction && item.commitAction === "active" ? (
                      <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green"/>
                    ) : (
                      <FontAwesomeIcon icon={faCode} fixedWidth className="mr-1 dark-grey"/>
                    )}
                    {item.componentType}: {item.committedFile}
                  </div>
                  <div className="p-1">
                    {fromProfiles && (
                      <Form.Check
                        inline
                        type={"checkbox"}
                        name={item.committedFile}
                        id={idx}
                        disabled={profileCompCheckAll}
                        checked={selectedProfileComponent.some(selected => selected.componentType === item.componentType && selected.committedFile === item.committedFile && selected.commitAction === item.commitAction && selected.committedTime === item.committedTime)}
                        onChange={handleComponentCheck}
                      />
                    )}
                  </div>
                </div>
              ))}

          {getPaginator(filterDto, setFilterDto, loading, loadData)}
        </div>
      </div>
    );
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

  const getSfdcInlineFilters = () => {    
    return (
      <div className="px-2 d-flex small">
        <div className="pr-4">
          <InlineBooleanFilter
            toolTipText={"This will select all the items on this page only."}
            loadData={handleCheckAllClickComponentTypes}
            filterDto={filterDto}
            setFilterDto={setFilterDto}
            fieldName={"checkAll"}
          />
        </div>
        <div>
          <SfdcComponentFilter componentType={componentType} filterDto={filterDto} setFilterDto={setFilterDto} />
        </div>
      </div>
    );
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
            // <FilterContainer
            //   loadData={loadData}
            //   filterDto={filterDto}
            //   setFilterDto={setFilterDto}
            //   isLoading={loading}
            //   title={"SFDC Files"}
            //   titleIcon={faSalesforce}
            //   body={getModifiedFilesView()}              
            //   supportSearch={true}
            //   inlineFilters={getSfdcInlineFilters()}
            // />
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

          <Button
            variant="outline-secondary"
            size="sm"
            className="ml-2"
            onClick={() => {
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
