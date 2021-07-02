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

function SfdcPipelineWizardGitRollbackModeButton({pipelineWizardModel, setPipelineWizardScreen, size, className, icon}) {
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
        <Button size={size} variant="outline-success" disabled={isLoading || destructiveXml?.length === 0} onClick={() => setPipelineWizardScreen(PIPELINE_WIZARD_SCREENS.XML_VIEWER)}>
          <span><IconBase icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
        </Button>
      </div>
    </div>
  );
}

SfdcPipelineWizardGitRollbackModeButton.propTypes = {
  pipelineWizardModel: PropTypes.object,
  setPipelineWizardScreen: PropTypes.func,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
};

SfdcPipelineWizardGitRollbackModeButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default SfdcPipelineWizardGitRollbackModeButton;