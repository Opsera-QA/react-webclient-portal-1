import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faArrowRight} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import { DEPENDENCY_ANALYSER_SCREENS } from "../DependencyAnalyser";
import sfdcDependencyAnalyserActions from "../sfdc-dependency-analyser-actions";

function DependencyAnalyserSubmitFileButton({pipelineWizardModel, setPipelineWizardScreen, filteredFileCount, size, className, icon, isLoading}) {
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
      await triggerDependentComponentList();
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

  const triggerDependentComponentList = async () => {
    let triggerResponse = await sfdcDependencyAnalyserActions.triggerDependentFiles(getAccessToken, cancelTokenSource, pipelineWizardModel);

    if(triggerResponse?.data?.status !== 200) {
      toastContext.showInlineErrorMessage(triggerResponse?.data?.message);
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

DependencyAnalyserSubmitFileButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardScreen: PropTypes.func,
  filteredFileCount: PropTypes.number,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

DependencyAnalyserSubmitFileButton.defaultProps = {
  size: "sm",
  icon: faArrowRight
};

export default DependencyAnalyserSubmitFileButton;