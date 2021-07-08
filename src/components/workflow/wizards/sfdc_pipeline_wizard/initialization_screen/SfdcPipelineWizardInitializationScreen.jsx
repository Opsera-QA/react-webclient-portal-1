import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Model from "core/data_model/model";
import sfdcPipelineWizardMetadata from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-wizard-metadata";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import LoadingDialog from "components/common/status_notifications/loading";
import {format} from "date-fns";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import CancelButton from "components/common/buttons/CancelButton";
import {Button} from "react-bootstrap";
import IconBase from "components/common/icons/IconBase";
import {faFileCode, faStepForward, faSync} from "@fortawesome/pro-light-svg-icons";
import {parseDate} from "utils/helpers";
import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import {faSalesforce} from "@fortawesome/free-brands-svg-icons";
import SfdcPipelineWizardFileUploadComponent
  from "components/workflow/wizards/sfdc_pipeline_wizard/csv_file_upload/SfdcPipelineWizardFileUploadComponent";

const SfdcPipelineWizardInitializationScreen = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, pipeline, gitTaskData, setError }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("manual");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [creatingNewRecord, setCreatingNewRecord] = useState(false);
  const [existingRecord, setExistingRecord] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    const newData = {...sfdcPipelineWizardMetadata.newObjectFields};
    let newPipelineWizardModel = new Model({...newData}, sfdcPipelineWizardMetadata, false);
    setPipelineWizardModel(newPipelineWizardModel);
    loadData(newPipelineWizardModel, gitTaskData, pipeline?.workflow?.plan).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipeline]);

  const loadData = async (newPipelineWizardModel, gitTaskData, plan) => {
    try {
      setIsLoading(true);
      let newPipelineWizardRecord;

      if (gitTaskData) {
        newPipelineWizardRecord = loadGitTaskInformation(newPipelineWizardModel, gitTaskData);
      }
      else {
        newPipelineWizardRecord = loadSfdcInitStep(newPipelineWizardModel, plan);
      }

      await initializePipelineWizardRecord(newPipelineWizardRecord);
    }
    catch (error) {
      console.error(error);
      setError("Could not initialize SFDC Pipeline Wizard");
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadGitTaskInformation = (newPipelineWizardModel, gitTaskData) => {
    const gitTaskId = gitTaskData.getData("_id");
    const sfdcToolId = gitTaskData.getData("configuration")?.sfdcToolId;
    const gitToolId = gitTaskData.getData("configuration")?.gitToolId;
    const sfdcDestToolId = gitTaskData.getData("configuration")?.sfdcDestToolId;

    if (gitTaskId == null || gitTaskId === "") {
      setError("Could not find Git Task");
    }

    if (sfdcToolId == null || sfdcToolId === "") {
      setError("No SFDC Tool is associated with this Git Task");
    }

    newPipelineWizardModel.setData("fromGitTasks", true);
    newPipelineWizardModel.setData("sfdcDestToolId", sfdcDestToolId);
    newPipelineWizardModel.setData("gitTaskId", gitTaskId);
    newPipelineWizardModel.setData("sfdcToolId", sfdcToolId);
    newPipelineWizardModel.setData("gitToolId", gitToolId);
    newPipelineWizardModel.setData("pipelineId", "N/A");
    newPipelineWizardModel.setData("stepId", "N/A");
    setPipelineWizardModel({...newPipelineWizardModel});
    return newPipelineWizardModel;
  };

  const loadSfdcInitStep = (newPipelineWizardModel, steps) => {
    let stepArrayIndex = steps.findIndex(
      (step) => step?.active && step?.tool?.tool_identifier === "jenkins" && (step?.tool?.job_type === "sfdc-ant" || step?.tool?.job_type === "sfdc-ant-profile")
    );
    if (stepArrayIndex === -1) {
      setError(
        "Warning, this pipeline is missing the default SFDC Jenkins Step needed. Please edit the workflow and add the SFDC Ant Job setting in order to run this pipeline."
      );
      return;
    }

    const stepId = steps[stepArrayIndex]?._id;
    const pipelineId = pipeline?._id;
    const sfdcToolId = steps[stepArrayIndex]?.tool?.configuration?.sfdcToolId;
    const gitToolId = steps[stepArrayIndex]?.tool?.configuration?.gitToolId;
    const sfdcDestToolId = steps[stepArrayIndex]?.tool?.configuration?.sfdcDestToolId;
    const isOrgToOrg = steps[stepArrayIndex]?.tool?.configuration?.isOrgToOrg === true;
    const jobType = steps[stepArrayIndex]?.tool?.job_type;
    const isProfiles = jobType === "sfdc-ant-profile" || jobType?.toUpperCase() === "SFDC PROFILE DEPLOY";

    if (pipelineId == null) {
      setError("Could not find Pipeline");
    }

    if (stepId == null || sfdcToolId == null) {
      setError("Could not find SFDC Jenkins step needed to run the Pipeline Wizard. Please edit the workflow and add the SFDC Ant Job setting in order to run this pipeline.");
    }

    newPipelineWizardModel.setData("sfdcToolId", sfdcToolId);
    newPipelineWizardModel.setData("sfdcDestToolId", sfdcDestToolId);
    newPipelineWizardModel.setData("gitToolId", gitToolId);
    newPipelineWizardModel.setData("pipelineId", pipelineId);
    newPipelineWizardModel.setData("stepId", stepId);
    newPipelineWizardModel.setData("isOrgToOrg", isOrgToOrg);
    newPipelineWizardModel.setData("isProfiles", isProfiles);
    newPipelineWizardModel.setData("unitTestSteps", getCustomUnitTestSteps(steps));
    setPipelineWizardModel({...newPipelineWizardModel});
    return newPipelineWizardModel;
  };

  const initializePipelineWizardRecord = async (newPipelineWizardModel = pipelineWizardModel) => {
    const result = await sfdcPipelineActions.findExistingRecordV2(getAccessToken, cancelTokenSource, newPipelineWizardModel);
    const existingRecord = result?.data;

    if (existingRecord) {
      setExistingRecord(existingRecord);
      newPipelineWizardModel.setData("recordId", existingRecord._id);
      setPipelineWizardModel({...newPipelineWizardModel});
    }
    else {
      await createNewPipelineWizardRecord(newPipelineWizardModel);
    }
  };

  const createNewPipelineWizardRecord = async (newPipelineWizardModel = pipelineWizardModel, moveToNextScreen) => {
    try {
      if (moveToNextScreen === true) {
        setCreatingNewRecord(true);
      }

      const response = await sfdcPipelineActions.createNewRecordV2(getAccessToken, cancelTokenSource, newPipelineWizardModel);
      const newRecord = response?.data;

      if (newRecord) {
        newPipelineWizardModel.setData("recordId", newRecord._id);
        setPipelineWizardModel({...newPipelineWizardModel});
      }

      if (moveToNextScreen === true) {
        setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR);
      }
    }
    catch (error) {
      console.error(error);
      setError("Could not create new SFDC Pipeline Wizard record");
    }
    finally {
      if (isMounted?.current === true) {
        setCreatingNewRecord(false);
      }
    }
  };

  const unpackPreviousPipelineRun = () => {
    let newPipelineWizardModel = {...pipelineWizardModel};
    newPipelineWizardModel.setData("recordId", existingRecord._id);
    newPipelineWizardModel.setData("customerId", existingRecord.customerId);

    if (Array.isArray(existingRecord?.selectedComponentTypes)) {
      newPipelineWizardModel.setData("selectedComponentTypes", existingRecord?.selectedComponentTypes);
    }

    if (Array.isArray(existingRecord?.sfdcModifiedRuleList)) {
      newPipelineWizardModel.setData("sfdcModifiedRuleList", existingRecord?.sfdcModifiedRuleList);
    }

    if (Array.isArray(existingRecord?.gitModifiedRuleList)) {
      newPipelineWizardModel.setData("gitModifiedRuleList", existingRecord?.gitModifiedRuleList);
    }

    if (Array.isArray(existingRecord?.profileComponentsRuleList)) {
      newPipelineWizardModel.setData("profileComponentsRuleList", existingRecord?.profileComponentsRuleList);
    }

    newPipelineWizardModel.setData("owner_name", existingRecord?.owner_name);
    newPipelineWizardModel.setData("createdAt", existingRecord?.createdAt);
    newPipelineWizardModel.setData("updatedAt", existingRecord?.updatedAt);

    if (typeof existingRecord?.namespacePrefix === "string") {
      newPipelineWizardModel.setData("namespacePrefix", existingRecord?.namespacePrefix);
    }

    if (typeof existingRecord?.includedComponentTypes === "string") {
      newPipelineWizardModel.setData("includedComponentTypes", existingRecord?.includedComponentTypes);
    }

    const parsedFromDate = parseDate(existingRecord?.fromDate);
    const parsedToDate = parseDate(existingRecord["toDate"], new Date());

    if (parsedFromDate) {
      newPipelineWizardModel.setData("fromDate", parsedFromDate);
    }

    if (parsedToDate) {
      newPipelineWizardModel.setData("toDate", parsedToDate);
    }

    setPipelineWizardModel({...newPipelineWizardModel});
    setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.COMPONENT_SELECTOR);
  };

  // TODO: Should this be moved to a helper class?
  const getCustomUnitTestSteps = (steps) => {
    return steps.map((step) =>
      (step?.tool
        && (step?.tool?.configuration?.jobType === "SFDC VALIDATE PACKAGE XML"
          || step?.tool?.configuration?.jobType === "SFDC UNIT TESTING"
          || step?.tool?.configuration?.jobType === "SFDC DEPLOY"))
      && step?.tool?.configuration?.sfdcUnitTestType === "RunSpecifiedTests" && step?.active ? step : '').filter(String);
  };

  const getBody = () => {
    if (isLoading || pipelineWizardModel == null) {
      return (
        <LoadingDialog message={"Initializing SFDC Pipeline Wizard"} size={"sm"} />
      );
    }

    if (existingRecord) {
      return (
        <div>
          <div>
            {`
          The SFDC Pipeline Run Wizard was previously initiated on ${format(new Date(existingRecord?.createdAt), "yyyy-MM-dd', 'hh:mm a")} by 
          ${existingRecord?.owner_name || "ERROR PULLING OWNER'S NAME"} but was not completed.
          `}
          </div>
          <div className={"mt-2"}>
            {`Would you like to start a new instance or continue where the last instance left off?`}
          </div>
          <div className={"mt-2"}>
            {`If you continue, you will be able to adjust all parameters that were previously applied.`}
          </div>
          <div className={"mt-2"}>
            {`Please note, if someone else is using Pipeline Wizard at the same time, this will lead to unintended side effects.`}
          </div>
          <SaveButtonContainer>
            <Button className={"mr-2"} size={"sm"} variant="primary" disabled={isLoading}
                    onClick={() => createNewPipelineWizardRecord(undefined, true)}>
              <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Instance</span>
            </Button>
            <Button size={"sm"} variant="success" disabled={isLoading} onClick={() => unpackPreviousPipelineRun()}>
              <span><IconBase icon={faStepForward} fixedWidth className="mr-2"/>Continue Where The Last Instance Left Off</span>
            </Button>
            <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose}
                          size={"sm"}/>
          </SaveButtonContainer>
        </div>
      );
    }

    return (
      <div>
        <div className={"mt-2"}>
          {`Would you like to start a new SFDC Pipeline Run Wizard Instance?`}
        </div>
        <SaveButtonContainer>
          <Button className={"mr-2"} size={"sm"} variant="primary" disabled={isLoading} onClick={() => createNewPipelineWizardRecord(undefined, true)}>
            <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Instance</span>
          </Button>
          <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
        </SaveButtonContainer>
      </div>
    );
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    let newDataObject = {...pipelineWizardModel};
    newDataObject.setData("fromFileUpload", tabSelection === "automatic");
    setPipelineWizardModel({...newDataObject});
    setActiveTab(tabSelection);
  };

  const getTabContainer = () => {
    if (pipelineWizardModel?.getData("isProfiles") === true) {
      return null;
    }

    return (
      <div>
        <div className={"mt-2"}>
          Would you like to start a manual Pipeline Wizard run or use the XML/File Upload Process?
        </div>
        <div className={"mt-2"}>
          <CustomTabContainer>
            <CustomTab activeTab={activeTab} tabText={"Manual Pipeline Wizard Run"} handleTabClick={handleTabClick} tabName={"manual"}
                       toolTipText={"Use SFDC Component Selection Deployment"} icon={faSalesforce}  />
            <CustomTab activeTab={activeTab} tabText={"XML/File Upload Process"} handleTabClick={handleTabClick} tabName={"automatic"}
                       toolTipText={"Deploy using XML or an Excel file"} icon={faFileCode}  />
          </CustomTabContainer>
        </div>
      </div>
    );
  };

  const getFileDeploymentBody = () => {
    return (
      <div>
        <SfdcPipelineWizardFileUploadComponent
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          setPipelineWizardModel={setPipelineWizardModel}
          handleClose={handleClose}
        />
      </div>
    );
  };

  const getView = () => {
    switch (activeTab) {
      case "manual":
        return getBody();
      case "automatic":
        return getFileDeploymentBody();
    }
  };

  const getMainView = () => {
    if (creatingNewRecord) {
      return (
        <LoadingDialog message={"Starting a new SFDC Pipeline Wizard Instance"} size={"sm"} />
      );
    }

    return (
      <div>
        <div className="h5">SalesForce Pipeline Run: Initialization</div>
        {getTabContainer()}
        <div className="my-3">
          {getView()}
        </div>
      </div>
    );
  };

  return (
    <div>
      {getMainView()}
    </div>
  );
};

SfdcPipelineWizardInitializationScreen.propTypes = {
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  pipeline: PropTypes.object,
  gitTaskData: PropTypes.object,
  setError: PropTypes.func
};

export default SfdcPipelineWizardInitializationScreen;
