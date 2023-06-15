import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faArrowRight} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import sfdcDependencyAnalyserActions from "../sfdc-dependency-analyser-actions";
import { DEPENDENCY_ANALYSER_SCREENS } from "../DependencyAnalyser";

function DependencyAnalyserSubmitFileButton({pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, size, className, icon, isLoading, isXml}) {
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
      let newPipelineWizardModel = pipelineWizardModel;
      const response = await sfdcDependencyAnalyserActions.createNewRecord(
        getAccessToken,
        cancelTokenSource,
        newPipelineWizardModel,
      );
      const newRecord = response?.data;
      if (newRecord) {
        // console.log(newRecord);
        newPipelineWizardModel?.setData("recordId", newRecord._id);
        setPipelineWizardModel({ ...newPipelineWizardModel });
      }

      if (isXml) {
        await sfdcDependencyAnalyserActions.setXmlFileContents(
          getAccessToken,
          cancelTokenSource,
          pipelineWizardModel,
        );
        setPipelineWizardScreen(
          DEPENDENCY_ANALYSER_SCREENS.VALIDATED_FILE_VIEWER,
        );
      } else {
        await sfdcDependencyAnalyserActions.setUploadedCsvFileList(
          getAccessToken,
          cancelTokenSource,
          pipelineWizardModel,
        );
        setPipelineWizardScreen(
          DEPENDENCY_ANALYSER_SCREENS.VALIDATED_FILE_VIEWER,
        );
      }
    } catch (error) {
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    } finally {
      setIsSaving(false);
    }
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
        <Button size={size} variant="success" disabled={pipelineWizardModel?.getData("modifiedFilesOrigin") && pipelineWizardModel.getData("modifiedFilesOrigin").length < 1 ||isSaving || isLoading} onClick={() => submitFiles()}>
          <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

DependencyAnalyserSubmitFileButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardScreen: PropTypes.func,
  setPipelineWizardModel: PropTypes.func,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  isXml: PropTypes.bool,
};

DependencyAnalyserSubmitFileButton.defaultProps = {
  size: "sm",
  icon: faArrowRight
};

export default DependencyAnalyserSubmitFileButton;