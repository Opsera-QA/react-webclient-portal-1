import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faArrowRight} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import sfdcPipelineActions from "components/workflow/wizards/sfdc_pipeline_wizard/sfdc-pipeline-actions";
import { DEPENDENCY_ANALYSER_SCREENS } from "../DependencyAnalyser";
import sfdcDependencyAnalyserActions from "../sfdc-dependency-analyser-actions";

function DependencyAnalyserSubmitSelectedFilesButton({pipelineWizardModel, setPipelineWizardScreen, filteredFileCount, size, className, icon, isLoading}) {
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

      if (pipelineWizardModel.getData("fromFileUpload") === true) {
        await triggerDependencyList();
      }
      else {
        await sfdcPipelineActions.setSfdcFileListV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
        await triggerDependencyList();
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


  const triggerDependencyList = async () => {
    const response = await sfdcDependencyAnalyserActions.triggerDependentFiles(getAccessToken, cancelTokenSource, pipelineWizardModel);
    if(response?.data?.status !== 200) {
      toastContext.showInlineErrorMessage(response?.data?.message);
      return;
    }
    setPipelineWizardScreen(DEPENDENCY_ANALYSER_SCREENS.DEPENDENCY_VIEWER);
    return;
  };

  if (pipelineWizardModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return (`Saving ${filteredFileCount} Salesforce Files`);
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

DependencyAnalyserSubmitSelectedFilesButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardScreen: PropTypes.func,
  filteredFileCount: PropTypes.number,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

DependencyAnalyserSubmitSelectedFilesButton.defaultProps = {
  size: "sm",
  icon: faArrowRight
};

export default DependencyAnalyserSubmitSelectedFilesButton;