import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import {faStepForward} from "@fortawesome/pro-light-svg-icons";
import {DialogToastContext} from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import {AuthContext} from "contexts/AuthContext";
import axios from "axios";
import {informaticaRunParametersActions} from "components/workflow/run_assistants/informatica/informaticaRunParameters.actions";
import {INFORMATICA_RUN_ASSISTANT_SCREENS} from "components/workflow/run_assistants/informatica/InformaticaPipelineRunAssistant";
import {hasStringValue} from "components/common/helpers/string-helpers";
import {hasDateValue} from "components/common/helpers/date/date.helpers";

function InformaticaRunAssistantSelectConfigurationButton(
  {
    informaticaRunParametersModel,
    setInformaticaRunParametersModel,
    informaticaRunParameterConfigurationModel,
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

      const selectedConfigurationIndex = informaticaRunParametersModel?.getData("selectedConfigurationIndex");
      const configuration = informaticaRunParameterConfigurationModel?.getPersistData();
      const configurations = informaticaRunParametersModel?.getArrayData("configurations");
      configurations[selectedConfigurationIndex] = configuration;
      informaticaRunParametersModel.setData("configurations", configurations);
      setInformaticaRunParametersModel({...informaticaRunParametersModel});
      const result = await informaticaRunParametersActions.updateRunParametersRecordV2(getAccessToken, cancelTokenSource, informaticaRunParametersModel);

      if (result?.data?.status === 500) {
        const error = `Error Saving Selected Component Types: ${result?.data?.message}`;
        toastContext.showInlineErrorMessage(error);
      } else {
        setRunAssistantScreen(INFORMATICA_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTION_SCREEN);
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

    const configuration = informaticaRunParameterConfigurationModel?.getPersistData();
    const selectedConfigurationIndex = informaticaRunParametersModel?.getData("selectedConfigurationIndex");

    if (configuration == null || typeof configuration !== "object" || typeof selectedConfigurationIndex !== "number") {
      return false;
    }

    if (
         hasStringValue(configuration.location) !== true
      && (!Array.isArray(configuration.types) || configuration.types.length === 0)
      && hasStringValue(configuration.updateBy) !== true
      && hasDateValue(configuration.updateTime) !== true
      && hasStringValue(configuration.tag) !== true
    ) {
      return false;
    }

    return true;
  };

  if (informaticaRunParametersModel == null) {
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

InformaticaRunAssistantSelectConfigurationButton.propTypes = {
  informaticaRunParametersModel: PropTypes.object,
  setInformaticaRunParametersModel: PropTypes.func,
  informaticaRunParameterConfigurationModel: PropTypes.object,
  setRunAssistantScreen: PropTypes.func,
  disable: PropTypes.bool,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
};

InformaticaRunAssistantSelectConfigurationButton.defaultProps = {
  size: "sm",
  icon: faStepForward
};

export default InformaticaRunAssistantSelectConfigurationButton;