import React, { useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSpinner,
  faTimes,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import "../../workflows.css";
import {
  getErrorDialog
} from "components/common/toasts/toasts";
import { Multiselect } from 'react-widgets'
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import ErrorDialog from "components/common/status_notifications/error";
import LoadingDialog from "components/common/status_notifications/loading";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import { RenderWorkflowItem } from "components/workflow/approvalModal";
import MultiSelectInputBase from "components/common/inputs/MultiSelectInputBase";
import Model from "../../../../core/data_model/model";
import filterMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/filter-metadata";

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
  const [selectedStep, setSelectedStep] = useState([]);
  const [unitTestRecordId, setUnitTestRecordId] = useState("");
  const toastContext = useContext(DialogToastContext);
  const [loading, setLoading] = useState(false);
  const [unitTestListLoading, setUnitTestListLoading] = useState(false);
  const [unitTestClassesList, setUnitTestClassesList] = useState([]);
  const [selectedUnitTestClassesList, setSelectedUnitTestClassesList] = useState([]);
  const [toolFilterDto, setToolFilterDto] = useState(new Model({...filterMetadata.newObjectFields}, filterMetadata, false));
 
  useEffect(() => {
    if(Object.keys(selectedStep).length > 0){
      setSelectedUnitTestClassesList([])
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
      setSelectedUnitTestClassesList( response.data.data.testClasses.filter((ele)=> response.data.paginatedData.selectedTestClasses.includes(ele)) );
        
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
  }
  
  // console.log(selectedUnitTestClassesList);
  // console.log(unitTestRecordId);

  const handleStepClick = async (step) => {
    // console.log("clicked step id ", step._id);
    let isSfdc = fromSFDC || fromDestinationSFDC ? true : false;
    setSelectedStep(step);
    await getTestClasses(step, isSfdc);
  }

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

    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setLoading(false);
    }
  }

  const handleMultiSelect = (newValue) => {
    console.log(newValue);
    setSelectedUnitTestClassesList(newValue);
  }

  const saveSelectedClasses = async() => {
    setSave(true);
    // let selectedList = selectedUnitTestClassesList.map(obj => obj.value)
    try {
      const saveResponse = await sfdcPipelineActions.setListToPipelineStorage(
        { 
          "recordId": unitTestRecordId, 
          "sfdcToolId": selectedStep.tool.configuration.sfdcToolId, 
          "pipelineId": pipelineId,  
          "stepId": selectedStep._id, 
          "dataType": "sfdc-unitTesting", 
          "data": selectedUnitTestClassesList
        }, getAccessToken);
      // TODO: add a success toast here
      toastContext.showUpdateSuccessResultDialog("Test Classes");

    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
      setSave(false);
    } finally {
      setSave(false);
    }
  }

  return (
    <div className="ml-5 mr-5">
      <div className="flex-container">
        <div className="flex-container-top"></div>
        <div className="flex-container-content">
          <div className="h5">SalesForce Pipeline Run: Unit Test Selection View</div>
          <div className="text-muted mb-4">Apex Classes with @isTest annotation will be part of selection for Selective Unit Testing.</div>
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
                )
              })} 
            </Row>         
          </div>
          </div>

          {/* unit test dropdown selection goes here */}
          <Row>
            <Col sm={10}>
              <div className="custom-multiselect-input m-2">
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
              </div>
            </Col>
            <Col sm={2}>
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
                  Save
                </Button>
              </div>
            </Col>
          </Row>
          
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