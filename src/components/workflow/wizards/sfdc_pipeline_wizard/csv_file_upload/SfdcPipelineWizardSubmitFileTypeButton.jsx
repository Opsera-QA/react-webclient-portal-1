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

function SfdcPipelineWizardSubmitFileTypeButton({pipelineWizardModel, setPipelineWizardScreen, size, className, icon, isLoading, isXml}) {
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

  const callbackFunc = async() => {
    if(isXml) {
      setPipelineWizardScreen(
        pipelineWizardModel.getData("unitTestSteps").length > 0
          ? PIPELINE_WIZARD_SCREENS.UNIT_TEST_SELECTOR
          : PIPELINE_WIZARD_SCREENS.XML_VIEWER
      );
    } else {
      // TODO: Wire up, remove modified files check when both sides are complete
      // if (pipelineWizardModel.getData("modifiedFilesOrigin") === "git") {
      //   setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.VALIDATED_FILE_VIEWER);
      //   return;
      // }
      // TODO: Remove this when both sides are complete;
      await generateXml();
    }
  };

  const submitFiles = async () => {
    try {
      console.log(isXml);
      setIsSaving(true);
      if (pipelineWizardModel.getData("isProfiles") === true) {
        toastContext.showInlineErrorMessage("Profile Migration with CSV/XML is not supported yet! Please check with Opsera Team.");
      }
      else {
        if(isXml) {
          await sfdcPipelineActions.setXmlFilecomponentsV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
          return await callbackFunc();
        }
        await sfdcPipelineActions.setCsvFileComponentsV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
        return await callbackFunc();
      }
    } catch (error) {
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      setIsSaving(false);
    }
  };

  const generateXml = async () => {
    if (pipelineWizardModel.getData("fromGitTasks") === true) {
      await sfdcPipelineActions.generateGitTaskXmlV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
    }
    else {
      await sfdcPipelineActions.generateSfdcPackageXmlV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
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
      return ("Saving File List");
    }

    return (`Proceed with Selected File`);
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button size={size} variant="success" disabled={pipelineWizardModel.getData("modifiedFilesOrigin") && pipelineWizardModel.getData("modifiedFilesOrigin").length < 1 ||isSaving || isLoading} onClick={() => submitFiles()}>
          <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

SfdcPipelineWizardSubmitFileTypeButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardScreen: PropTypes.func,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  isXml: PropTypes.bool,
};

SfdcPipelineWizardSubmitFileTypeButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default SfdcPipelineWizardSubmitFileTypeButton;