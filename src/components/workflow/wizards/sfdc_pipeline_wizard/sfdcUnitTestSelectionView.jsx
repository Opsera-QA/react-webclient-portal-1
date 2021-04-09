import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import { RenderWorkflowItem } from "components/workflow/approvalModal";
import Model from "../../../../core/data_model/model";
import filterMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/filter-metadata";
import { CSVtoArray, commonItems, differentItems } from "components/common/helpers/array-helpers";
import SFDCUnitTestManagementPanel from "./unit_test_selection/SFDCUnitTestManagementPanel";
import LoadingDialog from "components/common/status_notifications/loading";

const SfdcUnitTestSelectionView = ({ 
  pipelineId, 
  stepId, 
  fromSFDC, 
  fromDestinationSFDC, 
  handleClose, 
  isProfiles, 
  setView, 
  unitTestSteps 
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [save, setSave] = useState(false);
  const [selectedStep, setSelectedStep] = useState({});
  const [unitTestRecordId, setUnitTestRecordId] = useState("");
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [unitTestListLoading, setUnitTestListLoading] = useState(false);
  const [unitTestClassesList, setUnitTestClassesList] = useState([]);
  const [selectedUnitTestClassesList, setSelectedUnitTestClassesList] = useState([]);
  const [unusedTestClassesList, setUnusedTestClassesList] = useState([]);
  const [inputFLag, setInputFlag] = useState(false);
  const [enteredUnitTestClassesList, setEnteredUnitTestClassesList] = useState("");
  const [toolFilterDto, setToolFilterDto] = useState(new Model({...filterMetadata.newObjectFields}, filterMetadata, false));
 
  useEffect(() => {
    if(Object.keys(selectedStep).length > 0){
      setSelectedUnitTestClassesList([]);
      setUnitTestClassesList([]);
      getUnitTestList();
    }
  }, [selectedStep]);

  const getUnitTestList = async (filterDto = toolFilterDto) => {
    setUnitTestListLoading(true);
    try {
       let newFilterDto = filterDto;
       newFilterDto.setData("pageSize", 500);
       setToolFilterDto({...newFilterDto});
       
      const response = await sfdcPipelineActions.getListFromPipelineStorage({"sfdcToolId": selectedStep.tool.configuration.sfdcToolId, "pipelineId": pipelineId, "stepId": selectedStep._id, "dataType": "sfdc-unitTesting" }, filterDto , getAccessToken);
      
      if(!response.data.data || !response.data.paginatedData) {
        toastContext.showLoadingErrorDialog("something went wrong! not a valid object");
      }
      // save the mongo record id so that we can update it when saving selected data
      setUnitTestRecordId(response.data._id);
      // get the selected data if the same record is already present in mongo
      setSelectedUnitTestClassesList( response.data.data.testClasses.filter((ele)=> response.data.paginatedData.selectedTestClasses.includes(ele)));

      // selected unit test classes
      setEnteredUnitTestClassesList(response.data.data.testClasses.filter((ele)=> response.data.paginatedData.selectedTestClasses.includes(ele)).toString());
        
      let arrOfObj = response.data.data.testClasses;
      // let res = arrOfObj.map(function(el) {
      //   let o = Object.assign({});
      //   o.label = el;
      //   o.value = el;
      //   return o;
      // });

      setUnitTestClassesList(arrOfObj);
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setUnitTestListLoading(false);
    }
  };
  
  // console.log(selectedUnitTestClassesList);
  // console.log(unitTestRecordId);

  const handleStepClick = async (step) => {
    // console.log("clicked step id ", step._id);
    let isSfdc = fromSFDC || fromDestinationSFDC ? true : false;
    await getTestClasses(step, isSfdc);
  };

  const getTestClasses = async(unitStep, isSfdc) => {
    
    setLoading(true);
    // call api to get test classes
    try {
      // const accessToken = await getAccessToken();
      const res = await sfdcPipelineActions.setTestClassesList({
        "sfdcToolId": unitStep.tool.configuration.sfdcToolId, 
        "pipelineId": pipelineId, 
        "stepId": unitStep._id, 
        "stepIdXML": stepId, 
        "isSfdc": isSfdc }, 
        getAccessToken);
      if (res.data.status != 200 ) {
        console.error("Error getting API Data: ", res.data.message);
        // TODO: Add a toast here
        toastContext.showLoadingErrorDialog(res.data.message);
        return;
      }
      setSelectedStep(unitStep);
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMultiSelect = (newValue) => {
    console.log(newValue);
    setSelectedUnitTestClassesList(newValue);
  };

  const saveSelectedClasses = async() => {
    setSave(true);
    if(!selectedStep || !selectedStep._id) {
      toastContext.showLoadingErrorDialog("please select a unit test step");
    }
    // let selectedList = selectedUnitTestClassesList.map(obj => obj.value)
    try {
        // convert csv to array and compare with our list
        let inputItems = CSVtoArray(enteredUnitTestClassesList);
        if(inputItems === null){
          toastContext.showLoadingErrorDialog("Please enter a valid input");
          return;
        }
        let inputCommonItems = commonItems(inputItems,unitTestClassesList);
        let diffItems = differentItems(inputItems,unitTestClassesList);

        console.log(inputCommonItems.length);
        console.log(diffItems);
        if(diffItems && diffItems.length > 0 )
        setUnusedTestClassesList(diffItems);
  
      const saveResponse = await sfdcPipelineActions.setListToPipelineStorage(
        { 
          "recordId": unitTestRecordId, 
          "sfdcToolId": selectedStep.tool.configuration.sfdcToolId, 
          "pipelineId": pipelineId,  
          "stepId": selectedStep._id, 
          "dataType": "sfdc-unitTesting", 
          "data": inputFLag ? inputCommonItems : selectedUnitTestClassesList
        }, getAccessToken);
      // TODO: add a success toast here
      toastContext.showUpdateSuccessResultDialog("Test Classes");
      // fetch back the new results
      await getUnitTestList();

    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
      setSave(false);
    } finally {
      setSave(false);
    }
  };

  return (
    <div className="ml-5 mr-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run: Unit Test Selection View</div>
          <div className="text-muted mb-2">Apex Classes with @isTest annotation will be part of selection for Selective Unit Testing.</div>
          <div className="px-2"></div>
          
          <div className="m-2">
          <div>
            During the unit testing process, the testing classes must be specified per step.  Please select each step below and then apply the required testing classes before proceeding.  Please note, without this step, the pipeline cannot complete successfully.
          </div>

          <div className="d-flex m-3 justify-content-center">
            <Row>
              {unitTestSteps.map((step, idx) => {
                return(
                  <Col key={idx}>
                    <div className="p-1" style={{cursor : loading ? "not-allowed" : "pointer"}} onClick={()=> loading ? null : handleStepClick(step)}>
                      <RenderWorkflowItem item={step} isSelected={selectedStep._id === step._id} stateColorClass="" />
                    </div>
                  </Col>
                );
              })} 
            </Row>         
          </div>
          </div>

          {/* unit test dropdown selection goes here */}
          {selectedStep && Object.keys(selectedStep).length > 0 && 
          <>
            <Row>
              <Col sm={10}>
                {/* <div className="custom-multiselect-input m-2">
                  <Multiselect
                    data={unitTestClassesList}
                    // valueField="value"
                    // textField="label"
                    busy={unitTestListLoading}
                    filter="contains"
                    value={selectedUnitTestClassesList}
                    placeholder="Select Test Classes"
                    onChange={newValue => handleMultiSelect(newValue)}
                  />
                </div> */}
                <Form.Check
                  className="ml-2"
                  type="switch"
                  id="inputFLag"
                  checked={inputFLag}
                  label="Enter Test classes?"
                  onChange={(e) => {
                    setInputFlag(e.target.checked);
                  }}
                />
                {inputFLag && 
                <div className="form-group m-2">
                  {/* <label className="mr-2 text-muted"><span>Enter Unit test classes:</span></label> */}
                  <textarea
                    disabled={unitTestListLoading}
                    value={enteredUnitTestClassesList}
                    onChange={event => setEnteredUnitTestClassesList(event.target.value)}
                    className="form-control"
                    rows={5}
                  />
                  
                  <small className="text-muted form-text">
                    <div>Accepts comma separated values, please save the changes before going to next view</div>
                  </small>
                        {typeof unusedTestClassesList === "object" && unusedTestClassesList.length > 0 &&
                          <>
                            <div className="text-muted">Note: These items are skipped as they don&apos;t match the Unit test list.</div>
                            <div className="invalid-feedback" style={{fontSize: "100%"}}>
                              <div className="scroller">
                                <div className="d-flex flex-wrap">
                                    {unusedTestClassesList.map((item, idx) => (
                                      <div key={idx} className="p-2 w-40">
                                        {item}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </>
                        }
                  </div>
                  }
              </Col>
              <Col sm={2}>
                {inputFLag ? (
                  <div className="m-2">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => saveSelectedClasses()}
                    disabled={save || unitTestListLoading}
                  >
                    {save ? (
                      <FontAwesomeIcon icon={faSpinner} spin className="mr-1" fixedWidth />
                    ) : (
                      <FontAwesomeIcon icon={faCheck} fixedWidth className="mr-1" />
                    )}
                    Save Test Classes
                  </Button>
                </div>
                ) : null }                
              </Col>
            </Row>
            <Row>
              {/* sfdc management panel goes here */}
              {/* { unitTestClassesList.length > 0 ? ( */}
              { loading || unitTestListLoading ? (
                <LoadingDialog/>
                ) : (
                  <SFDCUnitTestManagementPanel
                    unitTestRecordId={unitTestRecordId}
                    selectedStep={selectedStep}
                    pipelineId={pipelineId}
                    filterDto={toolFilterDto}
                    setUnitTestRecordId={setUnitTestRecordId}
                    reload={getUnitTestList}
                    members={selectedUnitTestClassesList}
                    setMembers={setSelectedUnitTestClassesList}
                    totalMembers={unitTestClassesList}
                    setTotalMembers={setUnitTestClassesList}
                    setEnteredMembers={setEnteredUnitTestClassesList}
                  />
                )
              }
            </Row>
          </>
          }
          
          </div>
          <div className="flex-container-bottom pr-2 mt-4 mb-2 text-right">
          {/* TODO : add next and back buttons */}
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
              setView(4);
            }}
          >
            <FontAwesomeIcon icon={faStepForward} fixedWidth className="mr-1"/>
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

SfdcUnitTestSelectionView.propTypes = {
  pipelineId: PropTypes.string,
  stepId: PropTypes.string,
  setView: PropTypes.func,
  isProfiles: PropTypes.bool,
  fromSFDC: PropTypes.bool,
  fromDestinationSFDC: PropTypes.bool,
  handleClose: PropTypes.func,
  unitTestSteps: PropTypes.array,
};

export default SfdcUnitTestSelectionView;