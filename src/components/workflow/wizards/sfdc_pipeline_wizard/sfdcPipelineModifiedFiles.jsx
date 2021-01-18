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
import { isEquals } from "components/common/helpers/array-helpers"

//This must match the form below and the data object expected.  Each tools' data object is different
const INITIAL_DATA = {
  SFDCComponentType: "",
  SFDCCommittedFile: "",
  destSFDCComponentType: "",
  destSFDCCommittedFile: "",
  gitComponentType: "",
  gitCommittedFile: "",
};

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
  setGitCheckAll
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
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [componentType, setComponentType] = useState([]);
  const [allGitComponentType, setAllGitComponentType] = useState([]);
  const [allSFDCComponentType, setAllSFDCComponentType] = useState([]);
  const [allDestSfdcComponentType, setAllDestSfdcComponentType] = useState([]);
  const [sfdcFilterDto, setSfdcFilterDto] = useState(new Model({ ...filterMetadata.newObjectFields }, filterMetadata, false));
  const [gitFilterDto, setGitFilterDto] = useState(new Model({ ...filterMetadata.newObjectFields }, filterMetadata, false));
  const [destSfdcFilterDto, setDestSfdcFilterDto] = useState(new Model({ ...filterMetadata.newObjectFields }, filterMetadata, false));

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      loadSfdcData();
      loadGitData();
      loadDestSfdcData();
      let componentTypesArr = [{ "componentType": "All", "value": "" }];
      let uniqueComponentTypes =  isProfiles ? [...new Set(selectedComp.map(item => item))] : [...new Set(selectedComponentTypes.map(item => item))];
      uniqueComponentTypes.map(item => componentTypesArr.push({ "componentType": item, "value": item }));
      setComponentType(componentTypesArr);
      setLoading(false);
    }

    loadInitialData();
  }, []);


  const loadSfdcData = async () => {
    setSfdcLoading(true);
    try {
      const sfdcResponse = await sfdcPipelineActions.getListFromPipelineStorage({
        "pipelineId": pipelineId,
        "stepId": stepId,
        "dataType": "sfdc-packageXml",
        "fetchAttribute": "sfdcCommitList",
      }, sfdcFilterDto, getAccessToken);

      if (!sfdcResponse.data.data || !sfdcResponse.data.paginatedData) {
        toastContext.showLoadingErrorDialog("something went wrong! not a valid object");
      }
      let newSfdcFilterDto = sfdcFilterDto;
      newSfdcFilterDto.setData("totalCount", sfdcResponse.data.paginatedData.sfdcCommitList.count);
      setSfdcFilterDto({ ...newSfdcFilterDto });

      setSfdcModified(sfdcResponse.data.paginatedData.sfdcCommitList.data);
      setAllSFDCComponentType(sfdcResponse.data.data.sfdcCommitList);

      //storing _id so that we can edit this object
      setRecordId(sfdcResponse.data._id);

    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    setSfdcLoading(false);
  };

  const loadGitData = async () => {
    setGitLoading(true);
    try {
      const gitResponse = await sfdcPipelineActions.getListFromPipelineStorage({
        "pipelineId": pipelineId,
        "stepId": stepId,
        "dataType": "sfdc-packageXml",
        "fetchAttribute": "gitCommitList",
      }, gitFilterDto, getAccessToken);

      if (!gitResponse.data.data || !gitResponse.data.paginatedData) {
        toastContext.showLoadingErrorDialog("something went wrong! not a valid object");
      }
      let newGitFilterDto = gitFilterDto;
      newGitFilterDto.setData("totalCount", gitResponse.data.paginatedData.gitCommitList.count);
      setGitFilterDto({ ...newGitFilterDto });

      setGitModified(gitResponse.data.paginatedData.gitCommitList.data);
      setAllGitComponentType(gitResponse.data.data.gitCommitList);

      //storing _id so that we can edit this object
      setRecordId(gitResponse.data._id);

    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
    }
    setGitLoading(false);
  };

  const loadDestSfdcData = async () => {
    setDestSfdcLoading(true);
    try {
      const destSfdcResponse = await sfdcPipelineActions.getListFromPipelineStorage({
        "pipelineId": pipelineId,
        "stepId": stepId,
        "dataType": "sfdc-packageXml",
        "fetchAttribute": "destSfdcCommitList",
      }, destSfdcFilterDto, getAccessToken);

      if (!destSfdcResponse.data.data || !destSfdcResponse.data.paginatedData) {
        toastContext.showLoadingErrorDialog("something went wrong! not a valid object");
      }
      let newDestSfdcFilterDto = destSfdcFilterDto;
      newDestSfdcFilterDto.setData("totalCount", destSfdcResponse.data.paginatedData.destSfdcCommitList.count);
      setDestSfdcFilterDto({ ...newDestSfdcFilterDto });

      setDestSfdcModified(destSfdcResponse.data.paginatedData.destSfdcCommitList.data);
      setAllDestSfdcComponentType(destSfdcResponse.data.data.destSfdcCommitList);

    } catch (error) {
      toastContext.showLoadingErrorDialog(error);
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
    if(isEquals(sfdcSelectedComponent, allSFDCComponentType)){
      setSfdcCheckAll(true);
    } else {
      setSfdcCheckAll(false);
    }
  },[allSFDCComponentType, sfdcSelectedComponent]);
  
  useEffect(()=>{
    if(isEquals(destSFDCSelectedComponent, allDestSfdcComponentType)){
      setDestSfdcCheckAll(true);
    } else {
      setDestSfdcCheckAll(false);
    }
  },[allDestSfdcComponentType, destSFDCSelectedComponent]);
  
  useEffect(()=>{
    if(isEquals(gitSelectedComponent, allGitComponentType)){
      setGitCheckAll(true);
    } else {
      setGitCheckAll(false);
    }
  },[allGitComponentType, gitSelectedComponent]);
  
  const renderTooltip = (message, props) => (
    <Tooltip id="button-tooltip" {...props}>
      {message.length > 0 ? message : "No message found."}
    </Tooltip>
  );

  const handleSFDCComponentCheck = (e) => {
    const newValue = e.target.name;
    if (!e.target.checked) {
      setSFDCSelectedComponent(sfdcSelectedComponent.filter((item) => item.committedFile !== newValue));
      return;
    }
    let newObj = [...sfdcModified];
    let index = -1;
    for (let i = 0; i < newObj.length; i++) {
      if (newObj[i].committedFile === newValue) {
        index = i;
        setSFDCSelectedComponent((sfdcSelectedComponent) => [...sfdcSelectedComponent, newObj[index]]);
      }
    }
  };

  const handleDestSFDCComponentCheck = (e) => {
    const newValue = e.target.name;
    if (!e.target.checked) {
      setDestSFDCSelectedComponent(destSFDCSelectedComponent.filter((item) => item.committedFile !== newValue));
      return;
    }
    let newObj = [...destSfdcModified];
    let index = -1;
    for (let i = 0; i < newObj.length; i++) {
      if (newObj[i].committedFile === newValue) {
        index = i;
        setDestSFDCSelectedComponent((destSFDCSelectedComponent) => [...destSFDCSelectedComponent, newObj[index]]);
      }
    }
  };

  const handleGitComponentCheck = (e) => {
    const newValue = e.target.name;
    if (!e.target.checked) {
      setGitSelectedComponent(gitSelectedComponent.filter((item) => item.committedFile !== newValue));
      return;
    }
    let newObj = [...gitModified];
    let index = -1;
    for (let i = 0; i < newObj.length; i++) {
      if (newObj[i].committedFile === newValue) {
        index = i;
        setGitSelectedComponent((gitSelectedComponent) => [...gitSelectedComponent, newObj[index]]);
      }
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

  const handleSelectAll = (e) => {
    const type = e.target.name;
    // set checkall flag for selected type 
    switch (type) {
      case "sfdc":
        setSfdcCheckAll(e.target.checked);
        if (e.target.checked) {
          setSFDCSelectedComponent(allSFDCComponentType);
        } else {
          setSFDCSelectedComponent([]);
        }
        break;
      case "destSFDC":
        setDestSfdcCheckAll(e.target.checked);
        if (e.target.checked) {
          setDestSFDCSelectedComponent(allDestSfdcComponentType);
        } else {
          setDestSFDCSelectedComponent([]);
        }
        break;
      case "git":
        setGitCheckAll(e.target.checked);
        if (e.target.checked) {
          setGitSelectedComponent(allGitComponentType);
        } else {
          setGitSelectedComponent([]);
        }
        break;
      default :
        break;
      }

  }

  const checkDisabled = () => {
    if (fromGit || fromSFDC || fromDestinationSFDC) return false;
    return true;
  };

  const handleSfdcSearch = async () => {
    let newFilterDto = sfdcFilterDto;
    newFilterDto.setData("pageSize", 50);
    newFilterDto.setData("currentPage", 1);
    newFilterDto.setData("classFilter", formData.SFDCComponentType);
    newFilterDto.setData("search", formData.SFDCCommittedFile);
    setSfdcFilterDto({ ...newFilterDto });

    await loadSfdcData();
  };

  const handleGitSearch = async () => {
    let newFilterDto = gitFilterDto;
    newFilterDto.setData("pageSize", 50);
    newFilterDto.setData("currentPage", 1);
    newFilterDto.setData("classFilter", formData.gitComponentType);
    newFilterDto.setData("search", formData.gitCommittedFile);
    setGitFilterDto({ ...newFilterDto });

    await loadGitData();
  };

  const handleDestSfdcSearch = async () => {
    let newFilterDto = destSfdcFilterDto;
    newFilterDto.setData("pageSize", 50);
    newFilterDto.setData("currentPage", 1);
    newFilterDto.setData("classFilter", formData.destSFDCComponentType);
    newFilterDto.setData("search", formData.destSFDCCommittedFile);
    setDestSfdcFilterDto({ ...newFilterDto });

    await loadDestSfdcData();
  };

  const handleApproveChanges = async () => {
    // console.log(fromSFDC,fromDestinationSFDC,fromGit);
    // TODO: This needs to be handled differently
    let selectedList = [];
    let typeOfSelection;
    if (fromSFDC) {
      selectedList = sfdcCheckAll ? "all" : [...sfdcSelectedComponent];
      typeOfSelection = "sfdcCommitList"; 
    }
    if (fromDestinationSFDC) {
      selectedList = destSfdcCheckAll ? "all" : [...destSFDCSelectedComponent];
      typeOfSelection = "destSfdcCommitList"; 
    }
    if (fromGit) {
      selectedList = gitCheckAll ? "all" : [...gitSelectedComponent];
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
          "pipelineId": pipelineId,
          "stepId": stepId,
          "dataType": "sfdc-packageXml",
          "updateAttribute": "selectedFileList",
          "typeOfSelection" : typeOfSelection,
          "data": selectedList,
        }, getAccessToken);
        
        const postBody = {
          pipelineId: pipelineId,
          stepId: stepId,
          isProfiles: isProfiles,
          componentTypes: isProfiles ? selectedComponentTypes : [],
          // commitList: selectedList,
          isSfdc: fromSFDC || fromDestinationSFDC ? true : false,
        };

        await generateXML(postBody);
      }
    } catch (err) {
      console.error("Error saving selected data: ", error);
      toastContext.showLoadingErrorDialog(error);
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
      toastContext.showLoadingErrorDialog(error);
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
        toastContext.showLoadingErrorDialog(error);
      } else {      
        setView(3);
      }
    } catch (err) {
      console.error("Error saving selected data: ", error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const generateXML = async (data) => {
    try {
      const result = await sfdcPipelineActions.generateXML(data, getAccessToken);

      if (result.data.status != 200) {
        console.error("Error getting API Data: ", result.data.message);
        setSave(false);
        // setError(result.data.message);
        toastContext.showLoadingErrorDialog(error);
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
      toastContext.showLoadingErrorDialog(error);
      setSave(false);
    }
  };


  const handleSFDCComponentTypeChange = (selectedOption) => {
    // console.log(selectedOption);
    setFormData({
      ...formData,
      SFDCComponentType: selectedOption.value, SFDCCommittedFile: "",
    });
  };
  const handleGitComponentTypeChange = (selectedOption) => {
    // console.log(selectedOption);
    setFormData({
      ...formData,
      gitComponentType: selectedOption.value, gitCommittedFile: "",
    });
  };

  const handleDestSFDCComponentTypeChange = (selectedOption) => {
    // console.log(selectedOption);
    setFormData({
      ...formData,
      destSFDComponentType: selectedOption.value, destSFDCCommittedFile: "",
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


  if (error) {
    return (<div className="mt-3">
      <ErrorDialog error={error}/>
    </div>);
  }

  if (save || loading ) {
    return (<LoadingDialog size="sm" message="Loading Files..."/>);
  }

  return (
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run: File Comparison</div>
          <div className="text-muted mb-4">
            Listed below are the files with changes impacted in this pipeline run. Please confirm that you want to
            proceed with this operation.
          </div>

          <div className="d-flex w-100 pr-2">
            <div className="col-5 list-item-container mr-1">
              <div className="h6 opsera-blue">SFDC Files</div>

              {sfdcModified && sfdcModified.length === 0 && <div className="info-text mt-3">NO FILES</div>}

              <div className="d-flex w-100">
                <div className="col-5">
                  <Form.Group controlId="fromSFDC">
                    <Form.Check
                      type="checkbox"
                      label="Push from SFDC"
                      name="fromSFDC"
                      // disabled={!sfdcComponentFilterObject.nameSpacePrefix || sfdcComponentFilterObject.nameSpacePrefix.length === 0}
                      checked={fromSFDC ? fromSFDC : false}
                      onChange={(e) => setFromSFDC(e.target.checked)}
                    />
                  </Form.Group>
                </div>
                <div className="col-9">
                  {fromSFDC && (
                    <div className="align-self-end">
                      <OverlayTrigger
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip("This will select all the items on this page only")}>
                        <Button variant="secondary" size="sm" className="mr-1" disabled={sfdcCheckAll}
                                onClick={() => handleCheckAllClickComponentTypes("sfdc")}>
                          <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>
                          Check All
                        </Button>
                      </OverlayTrigger>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mr-1"
                        onClick={() => handleUnCheckAllClickComponentTypes("sfdc")}
                      >
                        <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1"/>
                        Uncheck All
                      </Button>
                      <Form.Check
                        style={{paddingTop: "10px", paddingBottom: "10px"}}
                        inline
                        type={"switch"}
                        label={"Check All"}
                        id="sfdc"
                        name="sfdc"
                        checked={sfdcCheckAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  )}
                </div>
              </div>

              {fromSFDC &&
              <div className="d-flex w-100 pr-2">
                <div className="col-5 mr-1">
                  <DropdownList
                    data={componentType}
                    value={
                      componentType[
                        componentType.findIndex(
                          (x) => x.value === formData.SFDCComponentType,
                        )
                        ]
                    }
                    valueField="value"
                    textField="componentType"
                    placeholder="Please select a component type"
                    filter="contains"
                    onChange={handleSFDCComponentTypeChange}
                  />
                </div>
                <div className="col-7 mr-1">
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search for the file name"
                      value={formData.SFDCCommittedFile || ""}
                      onChange={e => setFormData({ ...formData, SFDCCommittedFile: e.target.value })}
                    />
                    <InputGroup.Append>
                      <Button variant="secondary" size="sm" onClick={handleSfdcSearch}>
                        {sfdcLoading ? (
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
              
              { sfdcLoading && (
                <LoadingDialog size="sm"/>
              ) }

              {!sfdcLoading && typeof sfdcModified === "object" &&
              sfdcModified
                // .filter(item => item.componentType.includes(formData.SFDCComponentType) && item.committedFile.toLowerCase().includes(formData.SFDCCommittedFile.toLowerCase()) )
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
                      {fromSFDC && (
                        <Form.Check
                          inline
                          type={"checkbox"}
                          name={item.committedFile}
                          id={idx}
                          checked={sfdcSelectedComponent.some(selected => selected.componentType === item.componentType && selected.committedFile === item.committedFile && selected.commitAction === item.commitAction && selected.committedTime === item.committedTime)}
                          onChange={handleSFDCComponentCheck}
                        />
                      )}
                    </div>
                  </div>
                ))}

              {/*pagination component goes here */}
              {getPaginator(sfdcFilterDto, setSfdcFilterDto, sfdcLoading, loadSfdcData)}
            </div>
            <div className="col-7 list-item-container">
              {isOrgToOrg ? (
                <>
                  <div className="h6 opsera-blue">Destination SFDC Files</div>
                  {destSfdcModified && destSfdcModified.length === 0 && (
                    <div className="info-text mt-3">NO FILES</div>
                  )}

                  {destSfdcLoading ? (
                    <LoadingDialog size="sm"/>
                  ) : (
                    <>
                      {typeof destSfdcModified === "object" &&
                      destSfdcModified.map((item, idx) => (
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
                            {fromDestinationSFDC && (
                              <Form.Check
                                inline
                                type={"checkbox"}
                                name={item.committedFile}
                                id={idx}
                                checked={destSFDCSelectedComponent.some(selected => selected.componentType === item.componentType && selected.committedFile === item.committedFile && selected.commitAction === item.commitAction && selected.committedTime === item.committedTime)}
                                onChange={handleDestSFDCComponentCheck}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {/* pagination goes here */}
                  {getPaginator(destSfdcFilterDto, setDestSfdcFilterDto, destSfdcLoading, loadDestSfdcData)}
                </>
              ) : (
                <>
                  <div className="h6 opsera-blue">Git Files</div>
                  {gitModified && gitModified.length === 0 && <div className="info-text mt-3">NO FILES</div>}

                  <div className="d-flex w-100">
                    <div className="col-5">
                      <Form.Group controlId="fromGit">
                        <Form.Check
                          type="checkbox"
                          label="Push from Git"
                          name="fromGit"
                          // disabled={!sfdcComponentFilterObject.nameSpacePrefix || sfdcComponentFilterObject.nameSpacePrefix.length === 0}
                          checked={fromGit ? fromGit : false}
                          onChange={(e) => setFromGit(e.target.checked)}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-9">
                      {fromGit && (
                        <div className="align-self-end">
                           <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip("This will select all the items on this page only")}>
                            <Button variant="secondary" size="sm" className="mr-1" disabled={gitCheckAll}
                                    onClick={() => handleCheckAllClickComponentTypes("git")}>
                              <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>
                              Check All
                            </Button>
                          </OverlayTrigger>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="mr-1"
                            onClick={() => handleUnCheckAllClickComponentTypes("git")}
                          >
                            <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1"/>
                            Uncheck All
                          </Button>
                          <Form.Check
                            style={{paddingTop: "10px", paddingBottom: "10px"}}
                            inline
                            type={"switch"}
                            label={"Check All"}
                            id="git"
                            name="git"
                            checked={gitCheckAll}
                            onChange={handleSelectAll}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {fromGit &&
                  <div className="d-flex w-100 pr-2">
                    <div className="col-5">
                      <DropdownList
                        data={componentType}
                        value={
                          componentType[
                            componentType.findIndex(
                              (x) => x.value === formData.gitComponentType,
                            )
                            ]
                        }
                        valueField="value"
                        textField="componentType"
                        placeholder="Please select a component type"
                        filter="contains"
                        onChange={handleGitComponentTypeChange}
                      />
                    </div>
                    <div className="col-7">
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder="Search for the file name"
                          value={formData.gitCommittedFile || ""}
                          onChange={e => setFormData({ ...formData, gitCommittedFile: e.target.value })}
                        />
                        <InputGroup.Append>
                          <Button variant="secondary" size="sm" onClick={handleGitSearch}>
                            {gitLoading ? (
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

                  {gitLoading ? (
                    <LoadingDialog size="sm"/>
                  ) : (
                    <>
                      {typeof gitModified === "object" &&
                      gitModified
                        // .filter(item => item.componentType.includes(formData.gitComponentType) && item.committedFile.toLowerCase().includes(formData.gitCommittedFile.toLowerCase()) )
                        .map((item, idx) => (
                          <div key={idx} className="d-flex justify-content-center">
                            <div className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                              {item.commitAction && item.commitAction === "added" && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip id="button-tooltip-2">Added File</Tooltip>}
                                >
                                <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green"/>
                                </OverlayTrigger>
                              )}
                              {item.commitAction && item.commitAction === "modified" && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip id="added-tooltip">Modified File</Tooltip>}
                                >
                                <FontAwesomeIcon icon={faEdit} fixedWidth className="mr-1 yellow"/>
                                </OverlayTrigger>
                              )}
                              {item.commitAction && item.commitAction === "removed" && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip id="removed-tooltip">Removed File</Tooltip>}
                                >
                                <FontAwesomeIcon icon={faMinus} fixedWidth className="mr-1 red"/>
                                </OverlayTrigger>
                              )}
                              {item.commitAction && item.commitAction === "renamed" && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip id="renamed-tooltip">Renamed File</Tooltip>}
                                >
                                <FontAwesomeIcon icon={faPen} fixedWidth className="mr-1 dark-grey"/>
                                </OverlayTrigger>
                              )}
                              {item.componentType}: {item.committedFile}
                            </div>
                            <div className="p-1">
                              {fromGit && (
                                <Form.Check
                                  inline
                                  type={"checkbox"}
                                  name={item.committedFile}
                                  id={idx}
                                  checked={gitSelectedComponent.some(selected => selected.componentType === item.componentType && selected.committedFile === item.committedFile && selected.commitAction === item.commitAction && selected.committedTime === item.committedTime)}
                                  onChange={handleGitComponentCheck}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                  {/* pagination goes here */}
                  {getPaginator(gitFilterDto, setGitFilterDto, gitLoading, loadGitData)}
                </>
              )}
            </div>
          </div>

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
            Next
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
};

export default SfdcPipelineModifiedFiles;
