import React, {useState, useRef, useEffect, useContext} from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {AuthContext} from "contexts/AuthContext";
import SaveButtonContainer from "components/common/buttons/saving/containers/SaveButtonContainer";
import {Button} from "react-bootstrap";
import {faStepBackward} from "@fortawesome/free-solid-svg-icons";
import CancelButton from "components/common/buttons/CancelButton";
import {DialogToastContext} from "contexts/DialogToastContext";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";
import LoadingDialog from "components/common/status_notifications/loading";
import SfdcPipelineWizardProfileComponentTable
  from "components/workflow/wizards/sfdc_pipeline_wizard/profile_component_selector/SfdcPipelineWizardProfileComponentTable";
import SfdcPipelineWizardSubmitProfileComponentsButton
  from "components/workflow/wizards/sfdc_pipeline_wizard/profile_component_selector/SfdcPipelineWizardSubmitProfileComponentsButton";
import ErrorDialog from "components/common/status_notifications/error";
import IconBase from "components/common/icons/IconBase";

const SfdcPipelineWizardProfileComponentSelector = ({ pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, handleClose, }) => {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [filteredFileCount, setFilteredFileCount] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filePullTriggered, setFilePullTriggered] = useState(false);

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
      await triggerProfileComponentListPull(cancelSource);
      setFilePullTriggered(true);
    }
    catch (error) {
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true ) {
        setIsLoading(false);
      }
    }
  };

  const triggerProfileComponentListPull = async (cancelSource = cancelTokenSource) => {
    await sfdcPipelineActions.triggerProfileComponentListPullV2(getAccessToken, cancelSource, pipelineWizardModel);
  };

  const handleBackButtonClick = () => {
    if (pipelineWizardModel.getData("fromGitTasks") === true) {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.GIT_TASKS_FILE_SELECTOR);
    }
    else if (pipelineWizardModel.getData("isOrgToOrg") === true) {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.ORG_TO_ORG_FILE_SELECTOR);
    }
    else {
      setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.STANDARD_FILE_SELECTOR);
    }
  };

  const getBody = () => {
    if (isLoading) {
      return <LoadingDialog size={"sm"} message={"Requesting Files"} />;
    }

    if (!filePullTriggered) {
      return <ErrorDialog align={"dialogToast"} message={"Service Error Pulling File List from Salesforce"} />;
    }

    return (
      <SfdcPipelineWizardProfileComponentTable
        pipelineWizardModel={pipelineWizardModel}
        setFilteredFileCount={setFilteredFileCount}
        setPipelineWizardModel={setPipelineWizardModel}
      />
    );
  };

  return (
    <div>
      <div>
        <div className="h5">Salesforce Pipeline Run: Component Selection for {pipelineWizardModel?.getArrayData("selectedComponentTypes")?.length} Components</div>
        <div className="text-muted mb-2">
          Select which Component will have changes impacted in this pipeline run by using filter rules.
        </div>
      </div>
      {getBody()}
      <SaveButtonContainer>
        <Button variant="secondary" size="sm" className="mr-2" onClick={() => handleBackButtonClick()}>
          <IconBase icon={faStepBackward} className={"mr-1"}/>Back
        </Button>
        <SfdcPipelineWizardSubmitProfileComponentsButton
          filteredFileCount={filteredFileCount}
          pipelineWizardModel={pipelineWizardModel}
          setPipelineWizardScreen={setPipelineWizardScreen}
          isLoading={isLoading || isSaving}
        />
        <CancelButton size={"sm"} className={"ml-2"} cancelFunction={handleClose}/>
      </SaveButtonContainer>
    </div>
  );
};

SfdcPipelineWizardProfileComponentSelector.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  handleClose: PropTypes.func,
};

export default SfdcPipelineWizardProfileComponentSelector;