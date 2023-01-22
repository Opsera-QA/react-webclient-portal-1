import React, {useContext, useState, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/pro-light-svg-icons";
import { AuthContext } from "contexts/AuthContext";
import { DialogToastContext } from "contexts/DialogToastContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import Model from "core/data_model/model";
import filterMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/filter-metadata";
import SfdcUnitTestManagementPanel from "components/workflow/wizards/sfdc_pipeline_wizard/unit_test_selector/SfdcUnitTestManagementPanel";
import LoadingDialog from "components/common/status_notifications/loading";
import CancelButton from "components/common/buttons/CancelButton";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import axios from "axios";
import SfdcPipelineWizardManualTestClassSelector
  from "components/workflow/wizards/sfdc_pipeline_wizard/unit_test_selector/SfdcPipelineWizardManualTestClassSelector";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import IconBase from "components/common/icons/IconBase";
import {UnitTestStepView} from "./UnitTestStepView";

// TODO: This should really be altered to be a part of each of the workflow boxes rather than having it rely on selected object
const SfdcPipelineWizardUnitTestSelector = ({ pipelineWizardModel, handleClose, setPipelineWizardScreen }) => {
  const {getAccessToken} = useContext(AuthContext);
  const [selectedStep, setSelectedStep] = useState(undefined);
  const [unitTestRecordId, setUnitTestRecordId] = useState("");
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [unitTestListLoading, setUnitTestListLoading] = useState(false);
  const [unitTestClassesList, setUnitTestClassesList] = useState([]);
  const [selectedUnitTestClassesList, setSelectedUnitTestClassesList] = useState([]);
  const [testClassFilterDto, setTestClassFilterDto] = useState(new Model({...filterMetadata.newObjectFields}, filterMetadata, false));
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filePullCompleted, setFilePullCompleted] = useState(false);
  const isMounted = useRef(false);

  let timerIds = [];

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setSelectedUnitTestClassesList([]);
    setUnitTestClassesList([]);

    return () => {
      source.cancel();
      isMounted.current = false;
      // stopPolling();
    };
  }, []);


  const stopPolling = () => {
    if (Array.isArray(timerIds) && timerIds.length > 0) {
      timerIds?.forEach(timerId => clearTimeout(timerId));
    }
  };

  const unitTestPolling = async (testClassFilterDto, unitClassStep, count = 1) => {
    if (isMounted?.current !== true) {
      return;
    }

    const testClasses = await getUnitTestList(testClassFilterDto, unitClassStep, selectedStep);

    if (!Array.isArray(testClasses) && count <= 5 && filePullCompleted === false) {
      await new Promise(resolve => timerIds.push(setTimeout(resolve, 15000)));
      return await unitTestPolling(testClassFilterDto, unitClassStep,count + 1);
    }
  };

  const getUnitTestList = async (filterDto = testClassFilterDto, step = selectedStep) => {
    setUnitTestListLoading(true);
    try {
       let newFilterDto = filterDto;
       newFilterDto.setData("pageSize", 500);
       setTestClassFilterDto({...newFilterDto});

       setSelectedUnitTestClassesList([]);
      const response = await sfdcPipelineActions.getUnitTestClassesListV2(getAccessToken, cancelTokenSource, pipelineWizardModel, step);
      const testClasses = response?.data?.testClasses?.data;
      const selectedTestClasses = response?.data?.selectedTestClasses?.data;
      if (isMounted?.current === true && Array.isArray(testClasses) && Array.isArray(selectedTestClasses)) {
        // save the mongo record id so that we can update it when saving selected data
        setUnitTestRecordId(response?.data?._id);
        if (Array.isArray(selectedTestClasses) && selectedTestClasses.length > 0) {
          setSelectedUnitTestClassesList(testClasses?.filter((testClasses)=> selectedTestClasses.includes(testClasses)));
        }
        setUnitTestClassesList(testClasses);
        console.log("files pull completed");
        setFilePullCompleted(true);
        setUnitTestListLoading(false);
      }

      return testClasses;
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    }
  };

  const handleStepClick = async (step) => {
    await getTestClasses(step);
  };

  const getTestClasses = async (unitClassStep) => {
    try {
      setIsLoading(true);
      stopPolling();
      setFilePullCompleted(false);
        setSelectedStep(unitClassStep);

        if (Object.keys(unitClassStep).length > 0) {
          setSelectedUnitTestClassesList([]);
          setUnitTestClassesList([]);
          // start polling
          await unitTestPolling(testClassFilterDto, unitClassStep);
          // await getUnitTestList(testClassFilterDto, unitClassStep);
        }
    } catch (error) {
      console.error("Error getting API Data: ", error);
      toastContext.showLoadingErrorDialog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUnitTestSteps = () => {
    const unitTestSteps = pipelineWizardModel?.getArrayData("unitTestSteps");

    if (Array.isArray(unitTestSteps) && unitTestSteps.length > 0) {
      return (
        <div className="d-flex m-3 justify-content-center">
          <Row>
            {pipelineWizardModel?.getArrayData("unitTestSteps").map((step, idx) => {
              return (
                <Col key={idx}>
                  <div className="p-1" style={{cursor: isLoading ? "not-allowed" : "pointer"}} onClick={() => isLoading ? null : handleStepClick(step)}>
                    <UnitTestStepView item={step} isSelected={selectedStep?._id === step._id} stateColorClass=""/>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      );
    }
  };

  // TODO: Should we make this its own component?
  const getUnitTestSelection = () => {
    if (isLoading) {
      return (
        <LoadingDialog size={"sm"} message={"Loading Data"}/>
      );
    }

    if (selectedStep && Object.keys(selectedStep).length > 0) {
      return (
        <div>
          <SfdcPipelineWizardManualTestClassSelector
            isLoading={isLoading}
            pipelineWizardModel={pipelineWizardModel}
            getUnitTestList={getUnitTestList}
            selectedStep={selectedStep}
            selectedUnitTestClasses={selectedUnitTestClassesList}
            unitTestClassesList={unitTestClassesList}
            unitTestRecordId={unitTestRecordId}
          />
          <SfdcUnitTestManagementPanel
            unitTestRecordId={unitTestRecordId}
            reload={getUnitTestList}
            isLoading={isLoading || unitTestListLoading}
            members={selectedUnitTestClassesList}
            setMembers={setSelectedUnitTestClassesList}
            unitTestClassesList={unitTestClassesList}
          />
        </div>
      );
    }
  };

  const handleBackButtonClick = () => {
    if (pipelineWizardModel.getData("fromGitTasks") === true) {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.GIT_TASKS_FILE_SELECTOR);
    } else if (pipelineWizardModel.getData("fromFileUpload") === true) {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN);
    } else if (pipelineWizardModel.getData("isOrgToOrg") === true) {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.ORG_TO_ORG_FILE_SELECTOR);
    } else {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.STANDARD_FILE_SELECTOR);
    }
  };

  const handleNextClick = async() => {
    const unitTestSteps = pipelineWizardModel?.getArrayData("unitTestSteps");
    const isUnitTestSelectedResponse = await sfdcPipelineActions.checkTestClassesCount(getAccessToken, cancelTokenSource, pipelineWizardModel, unitTestSteps);
    if(!isUnitTestSelectedResponse?.data) {
      toastContext.showSystemErrorToast("No Test Classes were selected, Please select test classes for above steps to proceed further.");
      return;
    }
    setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.XML_VIEWER);
  };

  return (
    <div className="ml-5 mr-5">
      <div className="flex-container">
        <div className="flex-container-content">
          <div className="h5">Salesforce Pipeline Run: Unit Test Selection View</div>
          <div className="text-muted mb-2">Apex Classes with @isTest annotation will be part of selection for Selective Unit Testing.</div>

          <div className="m-2">
            <div>
              During the unit testing process, the testing classes must be specified per step.
              Please select each step below and then apply the required testing classes before proceeding.
              Please note, without this step, the pipeline cannot complete successfully.
            </div>
            {getUnitTestSteps()}
          </div>

          {getUnitTestSelection()}

          </div>
          <SaveButtonContainer>
             <Button
              variant="secondary"
              size="sm"
              className="mr-2"
              onClick={() => { handleBackButtonClick(); }}
            >
              <IconBase icon={faArrowLeft} className={"mr-1"}/>
              Back
            </Button>

            <Button
              variant="success"
              size="sm"
              onClick={() => {
                handleNextClick();
              }}
            >
              <IconBase icon={faArrowRight} className={"mr-1"}/>
              Next
            </Button>

            <CancelButton className={"ml-2"} cancelFunction={handleClose} />
          </SaveButtonContainer>
      </div>
    </div>
  );
};

SfdcPipelineWizardUnitTestSelector.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default SfdcPipelineWizardUnitTestSelector;