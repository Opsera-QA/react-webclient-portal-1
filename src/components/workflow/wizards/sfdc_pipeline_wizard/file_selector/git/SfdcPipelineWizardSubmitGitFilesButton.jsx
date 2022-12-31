import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faStepForward} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";

function SfdcPipelineWizardSubmitGitFilesButton({pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, filteredFileCount, size, className, icon, isLoading}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isSaving, setIsSaving] = useState(false);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;
    setIsSaving(false);

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const submitFilteredFiles = async () => {
    try {
      setIsSaving(true);
      let newDataObject = {...pipelineWizardModel};
      newDataObject.setData("isRollBack", false);
      setPipelineWizardModel({...newDataObject});

      if (pipelineWizardModel.getData("isProfiles") === true) {
        await saveSelectedProfileFilesList();
      }
      else {
        if (pipelineWizardModel.getData("fromFileUpload") !== true) {
          await sfdcPipelineActions.setGitFileListV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
        }
        await generateXML();
      }
    } catch (error) {
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsSaving(false);
      }
    }
  };

  const saveSelectedProfileFilesList = async () => {
    await sfdcPipelineActions.setGitProfileFilesListV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
    setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.PROFILE_COMPONENT_SELECTOR);
  };

  const generateXML = async () => {
    let generateXMLResponse = undefined;
    if (pipelineWizardModel.getData("fromGitTasks") === true) {
      generateXMLResponse = await sfdcPipelineActions.generateGitTaskXmlV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
    }
    else {
      generateXMLResponse = await sfdcPipelineActions.generateSfdcPackageXmlV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
    }

    if(generateXMLResponse?.data?.status !== 200) {
      toastContext.showInlineErrorMessage(generateXMLResponse?.data?.message);
      return;
    }
    setPipelineWizardScreen(
      pipelineWizardModel.getData("unitTestSteps").length > 0
        ? PIPELINE_WIZARD_SCREENS.UNIT_TEST_SELECTOR
        : PIPELINE_WIZARD_SCREENS.XML_VIEWER
    );
  };

  if (pipelineWizardModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return (`Saving ${filteredFileCount} Git Files`);
    }

    return (`Proceed with ${filteredFileCount} Files`);
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button size={size} variant="success" disabled={filteredFileCount === 0 || isSaving || isLoading} onClick={() => submitFilteredFiles()}>
          <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

SfdcPipelineWizardSubmitGitFilesButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  filteredFileCount: PropTypes.number,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

SfdcPipelineWizardSubmitGitFilesButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default SfdcPipelineWizardSubmitGitFilesButton;