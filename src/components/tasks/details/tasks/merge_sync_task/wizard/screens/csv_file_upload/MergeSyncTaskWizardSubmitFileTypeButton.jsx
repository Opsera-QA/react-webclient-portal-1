import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faArrowRight} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import mergeSyncTaskWizardActions from "components/tasks/details/tasks/merge_sync_task/wizard/mergeSyncTaskWizard.actions";
import {PIPELINE_WIZARD_SCREENS} from "components/workflow/wizards/sfdc_pipeline_wizard/SfdcPipelineWizard";

function MergeSyncTaskWizardSubmitFileTypeButton({wizardModel, setWizardScreen, size, className, icon, isLoading, isXml}) {
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

  const submitFiles = async () => {
    try {
      setIsSaving(true);

      if (isXml) {
        await mergeSyncTaskWizardActions.setXmlFileContentsV2(getAccessToken, cancelTokenSource, wizardModel);
        setWizardScreen(PIPELINE_WIZARD_SCREENS.VALIDATED_FILE_VIEWER);
      } else {
        await mergeSyncTaskWizardActions.setUploadedCsvFileListV2(getAccessToken, cancelTokenSource, wizardModel);
        setWizardScreen(PIPELINE_WIZARD_SCREENS.VALIDATED_FILE_VIEWER);
      }
    } catch (error) {
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      setIsSaving(false);
    }
  };

  if (wizardModel == null) {
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
        <Button size={size} variant="success" disabled={wizardModel.getData("modifiedFilesOrigin") && wizardModel.getData("modifiedFilesOrigin").length < 1 ||isSaving || isLoading} onClick={() => submitFiles()}>
          <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

MergeSyncTaskWizardSubmitFileTypeButton.propTypes = {
  wizardModel: PropTypes.object,
  setWizardScreen: PropTypes.func,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  isXml: PropTypes.bool,
};

MergeSyncTaskWizardSubmitFileTypeButton.defaultProps = {
  size: "sm",
  icon: faArrowRight
};

export default MergeSyncTaskWizardSubmitFileTypeButton;
