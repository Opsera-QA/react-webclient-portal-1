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

function SfdcPipelineWizardGitRollbackModeButton({pipelineWizardModel, setPipelineWizardModel, setPipelineWizardScreen, size, className, filteredFileCount, icon}) {
  const { getAccessToken } = useContext(AuthContext);
  const toastContext = useContext(DialogToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(false);
  const [destructiveXml, setDestructiveXml] = useState("");
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

  const submitFilteredFiles = async () => {
    try {
      setIsLoading(true);
      let newDataObject = {...pipelineWizardModel};
      newDataObject.setData("isRollBack", true);
      setPipelineWizardModel({...newDataObject});

      if (pipelineWizardModel.getData("isProfiles") === true) {
        await saveSelectedProfileFilesList();
      }
      else {
        await sfdcPipelineActions.setGitFileListV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
        await generateXML();
      }
    } catch (error) {
      console.error(error);
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
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

  const saveSelectedProfileFilesList = async () => {
    await sfdcPipelineActions.setGitProfileFilesListV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
    setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.PROFILE_COMPONENT_SELECTOR);
  };

  const loadXmlData = async (cancelSource = cancelTokenSource) => {
    const response = await sfdcPipelineActions.getPackageXmlV2(getAccessToken, cancelSource, pipelineWizardModel);
    const data = response?.data?.destructiveXml;

    if (typeof data === "string" && data.length > 0) {
      setDestructiveXml(data);
    }
  };

  if (pipelineWizardModel == null) {
    return null;
  }

  const getLabel = () => {
    return ("Enter Rollback Mode");
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button size={size} variant="outline-success" disabled={isLoading || filteredFileCount > 0} onClick={() => submitFilteredFiles()}>
          <span><IconBase icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

SfdcPipelineWizardGitRollbackModeButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardModel: PropTypes.func,
  setPipelineWizardScreen: PropTypes.func,
  filteredFileCount: PropTypes.number,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
};

SfdcPipelineWizardGitRollbackModeButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default SfdcPipelineWizardGitRollbackModeButton;