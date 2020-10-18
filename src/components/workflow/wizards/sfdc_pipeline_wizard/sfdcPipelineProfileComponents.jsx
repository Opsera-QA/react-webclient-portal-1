import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, InputGroup } from "react-bootstrap";
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
  const [filterDto, setFilterDto] = useState(new Model({ ...filterMetadata.newObjectFields }, filterMetadata, false));

  useEffect(() => {
    async function loadInitialData() {
      await loadData();
      let componentTypesArr = [{ "componentType": "All", "value": "" }];
      let uniqueComponentTypes = [...new Set(selectedComponentTypes.map(item => item))];
      uniqueComponentTypes.map(item => componentTypesArr.push({ "componentType": item, "value": item }));
      setComponentType(componentTypesArr);
    }

    setLoading(true);
    loadInitialData();
  }, []);


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
        toastContext.showLoadingErrorDialog("something went wrong! not a valid object");
      }
      let newFilterDto = filterDto;
      newFilterDto.setData("totalCount", response.data.paginatedData.profileComponentList.count);
      setFilterDto({ ...newFilterDto });

      setProfileComponentList(response.data.paginatedData.profileComponentList.data);
      setAllProfileComponentType(response.data.data.profileComponentList);

      //storing _id so that we can edit this object
      setRecordId(response.data._id);

    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
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
    setSelectedProfileComponent(allProfileComponentType);
  };

  const handleUnCheckAllClickComponentTypes = () => {
    // setSelectedProfileComponent(selectedProfileComponent.filter((item) =>  !profileComponentList.includes( item )));
    setSelectedProfileComponent([]);
  };

  const checkDisabled = () => {
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

  const handleApproveChanges = async () => {
    // let selectedList = [];
    // if (fromProfiles) {
    let selectedList = [...selectedProfileComponent];
    // }
    if (selectedList.length < 1) {
      setError("Please select atlest one component to proceed!");
      setSave(false);
      return;
    }
    // saving selected files to mongo before calling generate xml func
    try {
      await sfdcPipelineActions.setListToPipelineStorage({
        "recordId": recordId,
        "pipelineId": pipelineId,
        "stepId": stepId,
        "dataType": "sfdc-packageXml",
        "updateAttribute": "selectedFileList",
        "data": selectedList,
      }, getAccessToken);
    } catch (err) {
      console.error("Error saving selected data: ", error);
      toastContext.showLoadingErrorDialog(error);
    }
    const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      isProfiles: isProfiles,
      componentTypes: isProfiles ? selectedComponentTypes : "",
      isSfdc: true,
    };

    await generateXML(postBody);
  };

  const generateXML = async (data) => {
    try {
      const result = await sfdcPipelineActions.generateXML(data, getAccessToken);

      if (result.data.status != 200) {
        console.error("Error getting API Data: ", result.data.message);
        setSave(false);
        toastContext.showLoadingErrorDialog(error);
      } else {
        // setXML(result.data.message); // not saving anything from response here
        setView(4); //move to next view
      }
    } catch (err) {
      console.error(err.message);
      toastContext.showLoadingErrorDialog(error);
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
      <DtoBottomPagination paginationDto={dtoObj} setPaginationDto={setDto} isLoading={loading}
                           paginationStyle={"stacked"}
                           loadData={loadData}/>}</div>
    );
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
    <div className="ml-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run: Component Selection</div>
          <div className="text-muted mb-4">
            Listed below are the files with changes impacted in this pipeline run. Please confirm that you want to
            proceed with this operation.
          </div>

          <div className="d-flex w-100 pr-2">
            <div className="list-item-container mr-1">
              <div className="h6 opsera-blue">SFDC Files</div>

              {profileComponentList && profileComponentList.length === 0 &&
              <div className="info-text mt-3">NO FILES</div>}

              <div className="d-flex w-100">
                <div className="col-5">
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
                      <Button variant="secondary" size="sm" className="mr-1"
                              onClick={() => handleCheckAllClickComponentTypes()}>
                        <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>
                        Check All
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="mr-1"
                        onClick={() => handleUnCheckAllClickComponentTypes()}
                      >
                        <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1"/>
                        Uncheck All
                      </Button>
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
            onClick={() => {
              setSave(true);
              handleApproveChanges();
            }}
            disabled={checkDisabled()}
          >
            {save ? (
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth/>
            ) : (
              <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1"/>
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

SfdcPipelineProfileComponents.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  isOrgToOrg: PropTypes.bool,
  isProfiles: PropTypes.bool,
  stepToolConfig: PropTypes.object,
  selectedComponentTypes: PropTypes.object,
  selectedProfileComponent: PropTypes.object,
  setSelectedProfileComponent: PropTypes.func,
  handleClose: PropTypes.func,
  recordId: PropTypes.string,
  setRecordId: PropTypes.func,
  fromProfiles: PropTypes.bool,
  setFromProfiles: PropTypes.func,
};

export default SfdcPipelineProfileComponents;
