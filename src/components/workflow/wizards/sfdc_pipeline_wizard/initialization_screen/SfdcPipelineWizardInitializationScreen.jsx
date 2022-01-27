import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
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
import SfdcPipelineWizardPastRunComponent
  from "components/workflow/wizards/sfdc_pipeline_wizard/initialization_screen/past_run_xml/SfdcPipelineWizardPastRunComponent";
import toolsActions from "components/inventory/tools/tools-actions";

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
    loadData(pipelineWizardModel, gitTaskData, pipeline?.workflow?.plan, source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [pipeline]);

  const loadData = async (newPipelineWizardModel, gitTaskData, plan, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      let newPipelineWizardRecord;

      if (gitTaskData) {
        newPipelineWizardRecord = loadGitTaskInformation(newPipelineWizardModel, gitTaskData);
      }
      else {
        newPipelineWizardRecord = await loadSfdcInitStep(newPipelineWizardModel, plan, cancelSource);
      }

      await initializePipelineWizardRecord(newPipelineWizardRecord);
    }
    catch (error) {
      console.error(error);
      setError("Could not initialize Salesforce Pipeline Wizard");
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
    const accountUsername = gitTaskData.getData("configuration")?.accountUsername;
    const gitBranch = gitTaskData.getData("configuration")?.gitBranch;


    if (gitTaskId == null || gitTaskId === "") {
      setError("Could not find Git Task");
    }

    if (sfdcToolId == null || sfdcToolId === "") {
      setError("No Salesforce Tool is associated with this Task");
    }

    newPipelineWizardModel.setData("accountUsername", accountUsername);
    newPipelineWizardModel.setData("gitBranch", gitBranch);
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

  const loadSfdcInitStep = async (newPipelineWizardModel, steps, cancelSource = cancelTokenSource) => {
    let stepArrayIndex = steps.findIndex(
      (step) => step?.active && step?.tool?.tool_identifier === "jenkins" && (step?.tool?.job_type === "sfdc-ant" || step?.tool?.job_type === "sfdc-ant-profile")
    );
    if (stepArrayIndex === -1) {
      setError(
        "Warning, this pipeline is missing the default SFDC Jenkins Step needed. Please edit the workflow and add the SFDC Ant Job setting in order to run this pipeline."
      );
      return;
    }

    const sfdcStep = steps[stepArrayIndex];

    const stepId = sfdcStep?._id;
    const pipelineId = pipeline?._id;
    const runCount = pipeline?.workflow?.run_count;
    const accountUsername = sfdcStep?.tool?.configuration?.accountUsername;
    const sfdcToolId = sfdcStep?.tool?.configuration?.sfdcToolId;
    const gitToolId = sfdcStep?.tool?.configuration?.gitToolId;
    const gitBranch = sfdcStep?.tool?.configuration?.gitBranch;
    const sfdcDestToolId = sfdcStep?.tool?.configuration?.sfdcDestToolId;
    const isOrgToOrg = sfdcStep?.tool?.configuration?.isOrgToOrg === true;
    const jobType = sfdcStep?.tool?.job_type;
    const isProfiles = jobType === "sfdc-ant-profile" || jobType?.toUpperCase() === "SFDC PROFILE DEPLOY";
    const isTranslations = false;

    if (pipelineId == null) {
      setError("Could not find Pipeline");
    }

    if (stepId == null || sfdcToolId == null) {
      setError(`
        Could not find Salesforce Jenkins step needed to run the Pipeline Wizard. 
        Please edit the workflow and add the SFDC Ant Job setting in order to run this pipeline.
      `);
    }

    if (runCount != null) {
      newPipelineWizardModel.setData("run_count", (runCount + 1));
      newPipelineWizardModel.setData("selectedRunNumber", runCount);
    }

    newPipelineWizardModel.setData("accountUsername", accountUsername);
    newPipelineWizardModel.setData("gitBranch", gitBranch);
    newPipelineWizardModel.setData("sfdcToolId", sfdcToolId);
    newPipelineWizardModel.setData("sfdcDestToolId", sfdcDestToolId);
    newPipelineWizardModel.setData("gitToolId", gitToolId);
    newPipelineWizardModel.setData("pipelineId", pipelineId);
    newPipelineWizardModel.setData("stepId", stepId);
    newPipelineWizardModel.setData("isOrgToOrg", isOrgToOrg);
    newPipelineWizardModel.setData("isProfiles", isProfiles);
    newPipelineWizardModel.setData("isTranslations", isTranslations);
    newPipelineWizardModel.setData("unitTestSteps", getCustomUnitTestSteps(steps));
    const isSfdx = await checkIfSfdx(cancelSource, sfdcToolId);
    newPipelineWizardModel.setData("isSfdx", isSfdx);
    setPipelineWizardModel({...newPipelineWizardModel});
    return newPipelineWizardModel;
  };

  const checkIfSfdx = async (cancelSource, sfdcToolId) => {
    try {
      const response = await toolsActions.getRoleLimitedToolByIdV3(getAccessToken, cancelSource, sfdcToolId);
      const buildType = response?.data?.data?.configuration?.buildType;

      return buildType === "sfdx";
    }
    catch (error) {
      console.error("Could not verify if Tool is Salesforce DX");
    }
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
      await createNewPipelineWizardRecord(newPipelineWizardModel, false, false);
    }
  };

  const createNewPipelineWizardRecord = async (newPipelineWizardModel = pipelineWizardModel, moveToNextScreen, translation) => {
    try {
      if (moveToNextScreen === true) {
        setCreatingNewRecord(true);
      }

      if(translation === true) {
        newPipelineWizardModel.setData("isTranslations", true);
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
      setError("Could not create new Salesforce Pipeline Wizard record");
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

    newPipelineWizardModel.setData("includeDependencies", existingRecord?.excludeDependencies !== true);
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
        <LoadingDialog message={"Initializing Salesforce Pipeline Wizard"} size={"sm"} />
      );
    }

    if (existingRecord) {
      return (
        <div>
          <div>
            {`
          The Salesforce Pipeline Run Wizard was previously initiated on ${format(new Date(existingRecord?.createdAt), "yyyy-MM-dd', 'hh:mm a")} by 
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
            {`Please note, using the Salesforce Pipeline Run Wizard at the same time as someone else for the same use case will lead to unintended side effects.`}
          </div>
          {pipelineWizardModel.getData("isProfiles") === true ? 
            <SaveButtonContainer>
              <Button className={"mr-2"} size={"sm"} variant="primary" disabled={isLoading}
                      onClick={() => createNewPipelineWizardRecord(undefined, true, false)}>
                <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Profile Instance</span>
              </Button>
              <Button className={"mr-2"} size={"sm"} variant="primary" disabled={isLoading}
                      onClick={() => createNewPipelineWizardRecord(undefined, true, true)}>
                <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Translation Instance</span>
              </Button>
              <Button size={"sm"} variant="success" disabled={isLoading} onClick={() => unpackPreviousPipelineRun()}>
                <span><IconBase icon={faStepForward} fixedWidth className="mr-2"/>Continue Where The Last Instance Left Off</span>
              </Button>
              <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose}
                            size={"sm"}/>
            </SaveButtonContainer>
            :
            <SaveButtonContainer>
              <Button className={"mr-2"} size={"sm"} variant="primary" disabled={isLoading}
                      onClick={() => createNewPipelineWizardRecord(undefined, true, false)}>
                <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Instance</span>
              </Button>
              <Button size={"sm"} variant="success" disabled={isLoading} onClick={() => unpackPreviousPipelineRun()}>
                <span><IconBase icon={faStepForward} fixedWidth className="mr-2"/>Continue Where The Last Instance Left Off</span>
              </Button>
              <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose}
                            size={"sm"}/>
            </SaveButtonContainer>
          }
          
        </div>
      );
    }

    return (
      <div>
        <div className={"mt-2"}>
          {`Would you like to start a new SFDC Pipeline Run Wizard Instance?`}
        </div>
        {pipelineWizardModel.getData("isProfiles") === true ? 
          <SaveButtonContainer>
            <Button className={"mr-2"} size={"sm"} variant="primary" disabled={isLoading} onClick={() => createNewPipelineWizardRecord(undefined, true, false)}>
              <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Profile Instance</span>
            </Button>
            <Button className={"mr-2"} size={"sm"} variant="primary" disabled={isLoading} onClick={() => createNewPipelineWizardRecord(undefined, true, true)}>
              <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Translation Instance</span>
            </Button>
            <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
          </SaveButtonContainer>
          :
          <SaveButtonContainer>
            <Button className={"mr-2"} size={"sm"} variant="primary" disabled={isLoading} onClick={() => createNewPipelineWizardRecord(undefined, true)}>
              <span><IconBase icon={faSync} fixedWidth className="mr-2"/>Start A New Instance</span>
            </Button>
            <CancelButton className={"ml-2"} showUnsavedChangesMessage={false} cancelFunction={handleClose} size={"sm"} />
          </SaveButtonContainer>
        }
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

  const getDynamicTab = () => {
    if (pipelineWizardModel?.getData("run_count") === 1 || pipelineWizardModel?.getData("fromGitTasks") === true || pipelineWizardModel?.getData("isProfiles") === true) {
      return null;
    }

    return (
      <CustomTab
        activeTab={activeTab}
        tabText={"Use Past Run's XML"}
        handleTabClick={handleTabClick}
        tabName={"past_run"}
        toolTipText={"Deploy using a past Pipeline run's Package XML"}
        icon={faSync}
      />
    );
  };

  const getTabContainer = () => {
    return (
      <div>
        <div className={"mt-2"}>
          Would you like to start a manual Pipeline Wizard run or use the XML/File Upload Process?
        </div>
        <div className={"mt-2"}>
          <CustomTabContainer>
            <CustomTab
              activeTab={activeTab}
              tabText={"Manual Pipeline Wizard Run"}
              handleTabClick={handleTabClick}
              tabName={"manual"}
              toolTipText={"Use Salesforce Component Selection Deployment"}
              icon={faSalesforce}
            />
            {getDynamicTab()}
            <CustomTab
              activeTab={activeTab}
              tabText={"XML/File Upload Process"}
              handleTabClick={handleTabClick}
              tabName={"automatic"}
              toolTipText={"Deploy using an XML or CSV file"}
              icon={faFileCode}
            />
          </CustomTabContainer>
        </div>
      </div>
    );
  };

  const getFileUploadBody = () => {
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

  const getPastRunBody = () => {
    return (
      <SfdcPipelineWizardPastRunComponent
        pipelineWizardModel={pipelineWizardModel}
        setPipelineWizardScreen={setPipelineWizardScreen}
        setPipelineWizardModel={setPipelineWizardModel}
        handleClose={handleClose}
      />
    );
  };

  const getView = () => {
    switch (activeTab) {
      case "manual":
        return getBody();
      case "past_run":
        return getPastRunBody();
      case "automatic":
        return getFileUploadBody();
    }
  };

  const getMainView = () => {
    if (creatingNewRecord) {
      return (
        <LoadingDialog message={"Starting a new Salesforce Pipeline Wizard Instance"} size={"sm"} />
      );
    }

    return (
      <div>
        <div className="h5">Salesforce Pipeline Run: Initialization</div>
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
