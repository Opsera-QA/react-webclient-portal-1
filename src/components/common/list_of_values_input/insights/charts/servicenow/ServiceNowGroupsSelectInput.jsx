import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import pipelineStepNotificationActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
import { DialogToastContext } from "contexts/DialogToastContext";

function ServiceNowAssignmentGroupSelectInput({
  valueField,
  textField,
  fieldName,
  dataObject,
  setDataObject,
  setDataFunction,
  disabled,
  serviceNowId,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setGroups([]);
    if (serviceNowId) {
      loadGroups(serviceNowId, source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [serviceNowId]);

  const loadGroups = async (serviceNowId, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await pipelineStepNotificationActions.getServiceNowGroups(
        serviceNowId,
        getAccessToken,
        cancelSource
      );

      if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
        setGroups(response.data.message);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        toastContext.showErrorDialog(
          "Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry."
        );
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Assignment Groups";
    }

    if (serviceNowId === "") {
      return "A ServiceNow Tool must be selected before selecting a Assignment Group";
    }

    if (!isLoading && serviceNowId !== "" && groups.length === 0) {
      return "No Assignment Groups found for selected ServiceNow account.";
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={groups}
      setDataFunction={setDataFunction}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || serviceNowId === "" || groups.length === 0}
    />
  );
}

ServiceNowAssignmentGroupSelectInput.propTypes = {
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  placeholderText: PropTypes.string,
  serviceNowId: PropTypes.string,
};

ServiceNowAssignmentGroupSelectInput.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default ServiceNowAssignmentGroupSelectInput;
