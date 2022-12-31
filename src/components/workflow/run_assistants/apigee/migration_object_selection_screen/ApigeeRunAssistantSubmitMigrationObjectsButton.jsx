import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faStepForward} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {apigeeRunParametersActions} from "components/workflow/run_assistants/apigee/apigeeRunParameters.actions";
import {APIGEE_RUN_ASSISTANT_SCREENS} from "components/workflow/run_assistants/apigee/ApigeePipelineRunAssistant";

function ApigeeRunAssistantSubmitMigrationObjectsButton(
  {
    apigeeRunParametersModel,
    setRunAssistantScreen,
    startPipelineRunFunction,
    selectedMigrationObjectCount,
    closePanelFunction,
    size,
    className,
    icon,
    isLoading,
  }) {
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

  const submitSelectedMigrationObjects = async () => {
    try {
      setIsSaving(true);
      await apigeeRunParametersActions.setSelectedMigrationObjects(getAccessToken, cancelTokenSource, apigeeRunParametersModel);
      // TODO: Add confirmation screen
      // setRunAssistantScreen(APIGEE_RUN_ASSISTANT_SCREENS.CONFIRMATION_SCREEN);
      await startPipelineRunFunction();
      closePanelFunction();
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

  if (apigeeRunParametersModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return (`Saving ${selectedMigrationObjectCount} Selected Migration Objects`);
    }

    return (`Proceed with ${selectedMigrationObjectCount} Migration Objects`);
  };

  return (
    <div className={className}>
      <Button size={size} variant="success" disabled={selectedMigrationObjectCount === 0 || isSaving || isLoading} onClick={() => submitSelectedMigrationObjects()}>
        <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
      </Button>
    </div>
  );
}

ApigeeRunAssistantSubmitMigrationObjectsButton.propTypes = {
  apigeeRunParametersModel: PropTypes.object,
  setRunAssistantScreen: PropTypes.func,
  selectedMigrationObjectCount: PropTypes.number,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  startPipelineRunFunction: PropTypes.func,
  closePanelFunction: PropTypes.func,
};

ApigeeRunAssistantSubmitMigrationObjectsButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default ApigeeRunAssistantSubmitMigrationObjectsButton;