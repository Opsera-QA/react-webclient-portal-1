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

function SfdcPipelineWizardSubmitProfileComponentsButton({pipelineWizardModel, setPipelineWizardScreen, filteredFileCount, size, className, icon, isLoading}) {
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

  const processFilteredList = async () => {
    try {
      setIsSaving(true);
      await sfdcPipelineActions.setProfileComponentListV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
      await generateXml();
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

  const generateXml = async () => {
    let generateXMLResponse = await sfdcPipelineActions.generateSfdcProfileMigrationPackageXmlV2(getAccessToken, cancelTokenSource, pipelineWizardModel);
    
    if(generateXMLResponse?.data?.status !== 200) {
      toastContext.showInlineErrorMessage(generateXMLResponse?.data?.message);
      return;
    }
    setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.XML_VIEWER);
  };

  if (pipelineWizardModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return ("Saving Filtered Profile Component List");
    }

    return (`Proceed with ${filteredFileCount} Profile Components`);
  };

  return (
    <div className={className}>
      <div className={"d-flex"}>
        <Button size={size} variant="success" disabled={filteredFileCount === 0 || isLoading || isSaving} onClick={() => processFilteredList()}>
          <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

SfdcPipelineWizardSubmitProfileComponentsButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardScreen: PropTypes.func,
  filteredFileCount: PropTypes.number,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool
};

SfdcPipelineWizardSubmitProfileComponentsButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default SfdcPipelineWizardSubmitProfileComponentsButton;