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

function InformaticaRunAssistantSelectConfigurationButton(
  {
    informaticaRunParametersModel,
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
      setIsSaving(false);
    }
  };

  // TODO: Add showing info messages based on status
  const checkValidity = () => {
    if (isSaving) {
      return false;
    }
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