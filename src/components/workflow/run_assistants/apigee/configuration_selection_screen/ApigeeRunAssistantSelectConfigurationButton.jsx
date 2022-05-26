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

function ApigeeRunAssistantSelectConfigurationButton(
  {
    apigeeRunParametersModel,
    setApigeeRunParametersModel,
    apigeeRunParameterConfigurationModel,
    setRunAssistantScreen,
    disable,
    size,
    className,
    icon,
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

  const updateSelectedComponentTypes = async () => {
    try {
      setIsSaving(true);

      const selectedConfigurationIndex = apigeeRunParametersModel?.getData("selectedConfigurationIndex");
      const configuration = apigeeRunParameterConfigurationModel?.getPersistData();
      const configurations = apigeeRunParametersModel?.getArrayData("configurations");
      configurations[selectedConfigurationIndex] = configuration;
      apigeeRunParametersModel.setData("configurations", configurations);
      setApigeeRunParametersModel({...apigeeRunParametersModel});
      const result = await apigeeRunParametersActions.updateRunParametersRecord(getAccessToken, cancelTokenSource, apigeeRunParametersModel);

      if (result?.status === 200) {
        setRunAssistantScreen(APIGEE_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTION_SCREEN);
      } else {
        const error = `Error Saving Selected Component Types: ${result?.data?.message}`;
        toastContext.showInlineErrorMessage(error);        
      }
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    }
    finally {
      if (isMounted.current === true) {
        setIsSaving(false);
      }
    }
  };

  // TODO: Add showing info messages based on status
  const checkValidity = () => {
    if (isSaving) {
      return false;
    }

    const configuration = apigeeRunParameterConfigurationModel?.getPersistData();
    const selectedConfigurationIndex = apigeeRunParametersModel?.getData("selectedConfigurationIndex");

    if (configuration == null || typeof configuration !== "object" || typeof selectedConfigurationIndex !== "number") {
      return false;
    }

    if (!Array.isArray(configuration.assetType) || configuration.assetType.length === 0) {
      return false;
    }

    return true;
  };

  if (apigeeRunParametersModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return ("Saving Configuration");
    }

    return ("Proceed with Selected Configuration");
  };

  return (
    <div className={className}>
      <Button size={size} variant="success" disabled={!checkValidity() || disable} onClick={() => updateSelectedComponentTypes()}>
        <span><IconBase isLoading={isSaving} icon={icon} fixedWidth className="mr-2"/>{getLabel()}</span>
      </Button>
    </div>
  );
}

ApigeeRunAssistantSelectConfigurationButton.propTypes = {
  apigeeRunParametersModel: PropTypes.object,
  setApigeeRunParametersModel: PropTypes.func,
  apigeeRunParameterConfigurationModel: PropTypes.object,
  setRunAssistantScreen: PropTypes.func,
  disable: PropTypes.bool,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
};

ApigeeRunAssistantSelectConfigurationButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default ApigeeRunAssistantSelectConfigurationButton;