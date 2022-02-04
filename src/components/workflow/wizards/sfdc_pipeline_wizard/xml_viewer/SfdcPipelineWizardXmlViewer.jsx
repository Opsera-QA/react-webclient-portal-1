import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faStepBackward} from "@fortawesome/free-solid-svg-icons";
import {AuthContext} from "contexts/AuthContext";
import {DialogToastContext} from "contexts/DialogToastContext";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";

import CustomTabContainer from "components/common/tabs/CustomTabContainer";
import CustomTab from "components/common/tabs/CustomTab";
import UnitTestClassesViewer from "components/workflow/wizards/sfdc_pipeline_wizard/xml_viewer/unit_test/UnitTestClassesViewer";
import PackageXmlViewer from "components/workflow/wizards/sfdc_pipeline_wizard/xml_viewer/xml/PackageXmlViewer";
import {faCode, faTally} from "@fortawesome/pro-light-svg-icons";
import axios from "axios";
import CancelButton from "components/common/buttons/CancelButton";
import IconBase from "components/common/icons/IconBase";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import SalesforcePipelineComponentCountsViewer
  from "components/workflow/wizards/sfdc_pipeline_wizard/xml_viewer/counts/SalesforcePipelineComponentCountsViewer";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";

// TODO: This should be refactored and cleaned up.
const SfdcPipelineWizardXmlViewer = (
  {
    pipelineWizardModel,
    setPipelineWizardModel,
    handleClose,
    setPipelineWizardScreen,
    setError,
    handlePipelineWizardRequest
  }) => {
  const { getAccessToken } = useContext(AuthContext);
  const [isSaving, setIsSaving] = useState(false);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pxml");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    loadData(source).catch((error) => {
      if (isMounted?.current === true) {
        throw error;
      }
    });

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadXmlData(cancelSource);
    }
    catch (error) {
      if (isMounted?.current === true) {
        console.error("Error getting API Data: ", error);
        toastContext.showInlineErrorMessage(error);
      }
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const loadXmlData = async (cancelSource = cancelTokenSource) => {
    const response = await sfdcPipelineActions.getPackageXmlV2(getAccessToken, cancelSource, pipelineWizardModel);

    const packageXml = response?.data?.packageXml;
    const destructiveXml = response?.data?.destructiveXml;

    if (!packageXml && !destructiveXml) {
      toastContext.showInlineErrorMessage("Could not load Package XML");
    }

    pipelineWizardModel.setData("xml", packageXml);
    pipelineWizardModel.setData("destructiveXml", destructiveXml);
    setPipelineWizardModel({...pipelineWizardModel});
  };

  const handleTabClick = (tabSelection) => e => {
    e.preventDefault();
    setActiveTab(tabSelection);        
  };

  const createJenkinsJob = async () => {
    if(pipelineWizardModel.getData("fromGitTasks") === true) {
      await triggerGitTask();
    }
    else {
      await triggerJenkinsJob();
    }
  };

  const handleBackButton = () => {
    if(pipelineWizardModel.getData("isProfiles") === true){
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.PROFILE_COMPONENT_SELECTOR);
      return;
    }

    if(pipelineWizardModel.getArrayData("unitTestSteps").length > 0) {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.UNIT_TEST_SELECTOR);
    } else if (pipelineWizardModel.getData("fromFileUpload") === true) {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.INITIALIZATION_SCREEN);
    } else if (pipelineWizardModel.getData("fromGitTasks") === true) {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.GIT_TASKS_FILE_SELECTOR);
    }  else if (pipelineWizardModel.getData("isOrgToOrg") === true) {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.ORG_TO_ORG_FILE_SELECTOR);
    }  else {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.STANDARD_FILE_SELECTOR);
    }
  };

  const triggerGitTask = async () => {
    let createJobResponse;
    try {
      setIsSaving(true);
      createJobResponse = await sfdcPipelineActions.triggerGitTaskV3(getAccessToken, cancelTokenSource, pipelineWizardModel.getData("gitTaskId"));
      console.log("createJobResponse: ", createJobResponse);
    } catch (error) {
      console.log("Error posting to API: ", error);
      setError(error);
      createJobResponse = error;
    }

    if (createJobResponse?.data?.message?.status === "EXECUTED") {
      // TODO: add a success toast
      toastContext.showInformationToast("A request to start this task has been submitted.  It will begin shortly.", 20);
      // close modal
      handleClose();
    } else {
      setError(createJobResponse && createJobResponse.data && createJobResponse.data.message);
    }
  };

  const triggerJenkinsJob = async () => {
    let createJobResponse;

    //create jenkins job and automate job creation/updation of validate and deploy jobs
    try {
      setIsSaving(true);
      createJobResponse = await sfdcPipelineActions.triggerJenkinsJobV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
      console.log("createJobResponse: ", createJobResponse);
    } catch (error) {
      console.log("Error posting to API: ", error);
      setError(error);
      createJobResponse = error;
    }

    if (createJobResponse && createJobResponse.data && createJobResponse.data.message === "success") {

      //trigger start of pipeline & close modal
      await handlePipelineWizardRequest(pipelineWizardModel.getData("pipelineId"), true);
    } else {
      setError(createJobResponse && createJobResponse.data && createJobResponse.data.message);
    }
  };

  const getView = () => {
    switch (activeTab) {
      case "pxml":
        return (
          <PackageXmlViewer
            isLoading={isLoading}
            isSaving={isSaving}
            pipelineWizardModel={pipelineWizardModel}
          />
        );
      case "utc":
        return (
          <UnitTestClassesViewer
            pipelineWizardModel={pipelineWizardModel}
          />
        );
      case "counts":
        return (
          <SalesforcePipelineComponentCountsViewer
            pipelineWizardModel={pipelineWizardModel}
            setPipelineWizardModel={setPipelineWizardModel}
          />
        );
    }
  };

  const getUnitTestClassTab = () => {
    if (pipelineWizardModel?.getArrayData("unitTestSteps").length > 0) {
      return (
        <CustomTab
          activeTab={activeTab}
          tabText={"Unit Test Classes"}
          handleTabClick={handleTabClick}
          tabName={"utc"}
          toolTipText={"Unit Test Classes"}
          icon={faCode}
        />
      );
    }
  };

  const getTabContainer = () => {
    return (
      <CustomTabContainer>
        <CustomTab
          activeTab={activeTab}
          tabText={"Package XML"}
          handleTabClick={handleTabClick}
          tabName={"pxml"}
          toolTipText={"Package XML"}
          icon={faCheck}
        />
        <CustomTab
          activeTab={activeTab}
          tabText={"Component Counts"}
          handleTabClick={handleTabClick}
          tabName={"counts"}
          toolTipText={"Component Counts"}
          icon={faTally}
        />
        {getUnitTestClassTab()}
      </CustomTabContainer>
    );
  };

  return (
    <div>
      <div className="flex-container">
        {getTabContainer()}
        {getView()}        
        <SaveButtonContainer>
          <Button variant="secondary" size="sm" className="mr-2" onClick={() => { handleBackButton(); }}>
            <FontAwesomeIcon icon={faStepBackward} fixedWidth className="mr-2" />
            Back
          </Button>
          <Button variant="success" size="sm" onClick={() => {createJenkinsJob();}} disabled={isSaving || (pipelineWizardModel.getData("isRollBack") && pipelineWizardModel.getData("destructiveXml")?.length === 0)}>
            <IconBase className={"mr-2"} isLoading={isSaving} icon={faCheck} />
            Proceed
          </Button>
          <CancelButton className={"ml-2"} cancelFunction={handleClose} />
        </SaveButtonContainer>
      </div>
    </div>
  );
};


SfdcPipelineWizardXmlViewer.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
  setError: PropTypes.func,
  handlePipelineWizardRequest: PropTypes.func
};

export default SfdcPipelineWizardXmlViewer;
