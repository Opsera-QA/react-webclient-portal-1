import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { faStepForward } from "@fortawesome/pro-light-svg-icons";
import { DialogToastContext } from "contexts/DialogToastContext";
import IconBase from "components/common/icons/IconBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import { sapCpqRunParametersActions } from "components/workflow/run_assistants/sap_cpq/sapCpqRunParameters.actions";
import { SAP_CPQ_RUN_ASSISTANT_SCREENS } from "components/workflow/run_assistants/sap_cpq/SapCpqPipelineRunAssistant";
import { hasStringValue } from "components/common/helpers/string-helpers";
import { hasDateValue } from "components/common/helpers/date/date.helpers";

function SapCpqRunAssistantSelectConfigurationButton({
  sapCpqRunParametersModel,
  setSapCpqRunParametersModel,
  sapCpqRunParameterConfigurationModel,
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

      const selectedConfigurationIndex = sapCpqRunParametersModel?.getData(
        "selectedConfigurationIndex",
      );
      const configuration =
        sapCpqRunParameterConfigurationModel?.getPersistData();
      const configurations =
        sapCpqRunParametersModel?.getArrayData("configurations");
      configurations[selectedConfigurationIndex] = configuration;
      sapCpqRunParametersModel.setData("configurations", configurations);
      setSapCpqRunParametersModel({ ...sapCpqRunParametersModel });
      const result =
        await sapCpqRunParametersActions.updateRunParametersRecordV2(
          getAccessToken,
          cancelTokenSource,
          sapCpqRunParametersModel,
        );

      if (result?.data?.status === 500) {
        const error = `Error Saving Selected Component Types: ${result?.data?.message}`;
        toastContext.showInlineErrorMessage(error);
      } else {
        setRunAssistantScreen(
          SAP_CPQ_RUN_ASSISTANT_SCREENS.MIGRATION_OBJECT_SELECTION_SCREEN,
        );
      }
    } catch (error) {
      toastContext.showInlineErrorMessage(error);
    } finally {
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

    const configuration =
      sapCpqRunParameterConfigurationModel?.getPersistData();
    const selectedConfigurationIndex = sapCpqRunParametersModel?.getData(
      "selectedConfigurationIndex",
    );

    if (
      configuration == null ||
      typeof configuration !== "object" ||
      typeof selectedConfigurationIndex !== "number"
    ) {
      return false;
    }

    if (
      hasStringValue(configuration.name) !== true &&
      (!Array.isArray(configuration.scriptCategory) ||
        configuration.scriptCategory.length === 0) &&
      hasDateValue(configuration.lastCommitTimeFromStamp) !== true &&
      hasDateValue(configuration.lastCommitTimeToStamp) !== true
    ) {
      return false;
    }

    return true;
  };

  if (sapCpqRunParametersModel == null) {
    return null;
  }

  const getLabel = () => {
    if (isSaving) {
      return "Saving Configuration";
    }

    return "Proceed with Selected Configuration";
  };

  return (
    <div className={className}>
      <Button
        size={size}
        variant="success"
        disabled={!checkValidity() || disable}
        onClick={() => updateSelectedComponentTypes()}
      >
        <span>
          <IconBase
            isLoading={isSaving}
            icon={icon}
            fixedWidth
            className="mr-2"
          />
          {getLabel()}
        </span>
      </Button>
    </div>
  );
}

SapCpqRunAssistantSelectConfigurationButton.propTypes = {
  sapCpqRunParametersModel: PropTypes.object,
  setSapCpqRunParametersModel: PropTypes.func,
  sapCpqRunParameterConfigurationModel: PropTypes.object,
  setRunAssistantScreen: PropTypes.func,
  disable: PropTypes.bool,
  icon: PropTypes.object,
  size: PropTypes.string,
  className: PropTypes.string,
};

SapCpqRunAssistantSelectConfigurationButton.defaultProps = {
  size: "sm",
  icon: faStepForward,
};

export default SapCpqRunAssistantSelectConfigurationButton;
