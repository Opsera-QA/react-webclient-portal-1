import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward,
  faPlus,
  faMinus,
  faPen,
  faCode,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import DropdownList from "react-widgets/lib/DropdownList";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import { propTypes } from "react-widgets/lib/SelectList";
import { AuthContext } from "contexts/AuthContext";
import { axiosApiService } from "api/apiService";
import sfdcPipelineActions from "./sfdc-pipeline-actions";

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
  setDestSFDCSelectedComponent
}) => {
  const { getAccessToken } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [save, setSave] = useState(false);
  const [gitModified, setGitModified] = useState([]);
  const [sfdcModified, setSfdcModified] = useState([]);
  const [destSfdcModified, setDestSfdcModified] = useState([]);
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [SFDCComponentType, setSFDCComponentType] = useState([]);
  const [gitComponentType, setGitComponentType] = useState([]);

  useEffect(() => {
    console.log(modifiedFiles);    
    setGitModified(modifiedFiles.gitModified);
    setSfdcModified(modifiedFiles.sfdcModified);
    setDestSfdcModified(modifiedFiles.destSfdcModified);
    // selected components
    setGitSelectedComponent(modifiedFiles.gitModified);
    setSFDCSelectedComponent(modifiedFiles.sfdcModified);
    setDestSFDCSelectedComponent(modifiedFiles.destSfdcModified);
  }, [modifiedFiles]);

  useEffect(() => {
    if (fromSFDC) {
      setFromDestinationSFDC(false);
      setFromGit(false);
      let componentTypesArr =[{"componentType": "All", "value" : ""}];
      let uniqueComponentTypes = [...new Set(sfdcModified.map(item => item.componentType))];
      uniqueComponentTypes.map(item=> componentTypesArr.push({"componentType": item, "value": item}));
      setSFDCComponentType(componentTypesArr);
    }
  }, [fromSFDC]);

  useEffect(() => {
    if (fromDestinationSFDC) {
      setFromSFDC(false);
      setFromGit(false);
      
      // let componentTypesArr =[];
      // let uniqueComponentTypes = [...new Set(destSfdcModified.map(item => item.componentType))];
      // uniqueComponentTypes.map(item=> componentTypesArr.push({"componentType": item}));
      // setComponentType(componentTypesArr);
    }
  }, [fromDestinationSFDC]);

  useEffect(() => {
    if (fromGit) {
      setFromDestinationSFDC(false);
      setFromSFDC(false);
      
      let componentTypesArr =[{"componentType": "All", "value" : ""}];
      let uniqueComponentTypes = [...new Set(gitModified.map(item => item.componentType))];
      uniqueComponentTypes.map(item=> componentTypesArr.push({"componentType": item, "value": item}));
      setGitComponentType(componentTypesArr);
    }
  }, [fromGit]);

  // useEffect(() => {
  //   if (sfdcSelectedComponent.length > 1000 || destSFDCSelectedComponent.length > 1000 || gitSelectedComponent.length > 1000 ) {
  //    setError("You have selected the maximum limit of components");
  //   } else {
  //     setError(false);
  //   }

  // }, [sfdcSelectedComponent,destSFDCSelectedComponent,gitSelectedComponent]);


  const handleSFDCComponentCheck = (e) => {
    const newValue = e.target.name;
    if(!e.target.checked) {
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
    if(!e.target.checked) {
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
    if(!e.target.checked) {
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
    switch(type) { 
      case "sfdc":
        setSFDCSelectedComponent([...sfdcModified])
        break; 
      case "destSFDC":
        setDestSFDCSelectedComponent([...destSfdcModified])
        break;
      case "git":
        setGitSelectedComponent([...gitModified])
        break;
      default :
        break; 
    }
  };

  const handleUnCheckAllClickComponentTypes = (type) => {
    switch(type) { 
      case "sfdc":
        setSFDCSelectedComponent([])
        break; 
      case "destSFDC":
        setDestSFDCSelectedComponent([])
        break;
      case "git":
        setGitSelectedComponent([])
        break;
      default :
        break; 
    }
  };

  const checkDisabled = () => {
    if (fromGit || fromSFDC || fromDestinationSFDC) return false;
    return true;
  };

  const handleApproveChanges = async () => {
    // console.log(fromSFDC,fromDestinationSFDC,fromGit);
    let selectedList = [];
    if (fromSFDC) {
      selectedList = [...sfdcSelectedComponent];
    }
    if (fromDestinationSFDC) {
      selectedList = [...destSFDCSelectedComponent];
    }
    if (fromGit) {
      selectedList = [...gitSelectedComponent];
    }
    if ( selectedList.length < 1 ) {
      setError("Please select atlest one component to proceed!");
      setSave(false);
      return;
    }
    // if ( selectedList.length > 1000 ) {
    //   setError("Too many components selected!");
    //   setSave(false);
    //   return;
    // }
    const postBody = {
      pipelineId: pipelineId,
      stepId: stepId,
      isProfiles : isProfiles,
      componentTypes: isProfiles ? selectedComponentTypes : [],
      commitList: selectedList,
      isSfdc: fromSFDC || fromDestinationSFDC ? true : false,
    };

    await generateXML(postBody);
  };

  const generateXML = async (data) => {
    try {
      const result = await sfdcPipelineActions.generateXML(data, getAccessToken);

      if (result.data.status != 200) {
        console.error("Error getting API Data: ", result.data.message);
        setSave(false);
        setError(result.data.message);
      } else {
        setXML(result.data.message);
        setView(3); //move to next view
      }
    } catch (err) {
      console.error(err.message);
      setError(error);
    }
  };


  const handleSFDCComponentTypeChange = (selectedOption) => {
    console.log(selectedOption);
    setFormData({
      ...formData,
      SFDCComponentType: selectedOption.value, SFDCCommittedFile: ""
    })
  } 
  const handleGitComponentTypeChange = (selectedOption) => {
    console.log(selectedOption);
    setFormData({
      ...formData,
      gitComponentType: selectedOption.value, gitCommittedFile: ""
    })
  }
  
  const handleDestSFDCComponentTypeChange = (selectedOption) => {
    console.log(selectedOption);
    setFormData({
      ...formData,
      destSFDComponentType: selectedOption.value, destSFDCCommittedFile: ""
    })
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
          {error && (
            <div className="mt-3">
              <ErrorDialog error={error} />
            </div>
          )}
          {save && <LoadingDialog />}

          {modifiedFiles && (
            <>
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
                        <Button variant="secondary" size="sm" className="mr-1" onClick={()=>handleCheckAllClickComponentTypes("sfdc")}>
                          <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
                          Check All
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mr-1"
                          onClick={()=>handleUnCheckAllClickComponentTypes("sfdc")}
                        >
                          <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1" />
                          Uncheck All
                        </Button>
                      </div>
                    )}
                    </div>
                  </div>
                 
                  {fromSFDC && 
                  <div className="d-flex w-100 pr-2">
                  <div className="col-5 mr-1">
                   <DropdownList
                       data={SFDCComponentType}
                       value={
                        SFDCComponentType[
                          SFDCComponentType.findIndex(
                             (x) => x === formData.SFDCComponentType
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
                   <Form.Group controlId="searchField">
                     <Form.Control type="text" placeholder="Search for the file name" value={formData.SFDCCommittedFile || ""} onChange={e => setFormData({ ...formData, SFDCCommittedFile: e.target.value })} />
                   </Form.Group>
                 </div>
                 </div>
                  }
                                   
                  {typeof sfdcModified === "object" &&
                  sfdcModified
                  .filter(item => item.componentType.includes(formData.SFDCComponentType) && item.committedFile.toLowerCase().includes(formData.SFDCCommittedFile.toLowerCase()) )
                  .map((item,idx) => (
                      <div key={idx} className="d-flex justify-content-center">
                        <div className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                          {item.commitAction && item.commitAction === "active" ? (
                            <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green" />
                          ) : (
                            <FontAwesomeIcon icon={faCode} fixedWidth className="mr-1 dark-grey" />
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
                              checked={sfdcSelectedComponent.includes(item)}
                              onChange={handleSFDCComponentCheck}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                <div className="col-7 list-item-container">
                  {isOrgToOrg ? (
                    <>
                      <div className="h6 opsera-blue">Destination SFDC Files</div>
                      {destSfdcModified && destSfdcModified.length === 0 && (
                        <div className="info-text mt-3">NO FILES</div>
                      )}
                      
                      {typeof destSfdcModified === "object" &&
                        destSfdcModified.map((item, idx) => (
                          <div key={idx} className="d-flex justify-content-center">
                            <div className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                              {item.commitAction && item.commitAction === "active" ? (
                                <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green" />
                              ) : (
                                <FontAwesomeIcon icon={faCode} fixedWidth className="mr-1 dark-grey" />
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
                                  checked={destSFDCSelectedComponent.includes(item)}
                                  onChange={handleDestSFDCComponentCheck}
                                />
                              )}
                            </div>
                          </div>
                        ))}
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
                              <Button variant="secondary" size="sm" className="mr-1" onClick={()=>handleCheckAllClickComponentTypes("git")}>
                                <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
                                Check All
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="mr-1"
                                onClick={()=>handleUnCheckAllClickComponentTypes("git")}
                              >
                                <FontAwesomeIcon icon={faSquare} fixedWidth className="mr-1" />
                                Uncheck All
                              </Button>
                            </div>
                          )}
                          </div>
                        </div>
                      
                        {fromGit && 
                        <div className="d-flex w-100 pr-2">
                        <div className="col-5 mr-1">
                        <DropdownList
                            data={gitComponentType}
                            value={
                              gitComponentType[
                                gitComponentType.findIndex(
                                  (x) => x === formData.gitComponentType
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
                      <div className="col-7 mr-1">
                        <Form.Group controlId="searchField">
                          <Form.Control type="text" placeholder="Search for the file name" value={formData.gitCommittedFile || ""} onChange={e => setFormData({ ...formData, gitCommittedFile: e.target.value })} />
                        </Form.Group>
                      </div>
                      </div>
                      }
                            
                      {typeof gitModified === "object" &&
                      gitModified
                        .filter(item => item.componentType.includes(formData.gitComponentType) && item.committedFile.toLowerCase().includes(formData.gitCommittedFile.toLowerCase()) )
                        .map((item,idx) => (
                          <div key={idx} className="d-flex justify-content-center">
                            <div className="thick-list-item-container-green  w-100 force-text-wrap p-1">
                              {item.commitAction && item.commitAction === "added" && (
                                <FontAwesomeIcon icon={faPlus} fixedWidth className="mr-1 green" />
                              )}
                              {item.commitAction && item.commitAction === "modified" && (
                                <FontAwesomeIcon icon={faPen} fixedWidth className="mr-1 yellow" />
                              )}
                              {item.commitAction && item.commitAction === "deleted" && (
                                <FontAwesomeIcon icon={faMinus} fixedWidth className="mr-1 dark-grey" />
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
                                  checked={gitSelectedComponent.includes(item)}
                                  onChange={handleGitComponentCheck}
                                />
                              )}
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
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
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-1" />
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
              <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
            ) : (
              <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
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
            <FontAwesomeIcon icon={faTimes} fixedWidth className="mr-1" />
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
};

export default SfdcPipelineModifiedFiles;
