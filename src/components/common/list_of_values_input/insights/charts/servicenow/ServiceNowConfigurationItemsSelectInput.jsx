import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import MultiSelectInputBase from "components/common/inputs/select/MultiSelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import pipelineStepNotificationActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
// import { DialogToastContext } from "contexts/DialogToastContext";

function ServiceNowConfigurationItemsSelectInput({
  valueField,
  textField,
  fieldName,
  dataObject,
  setDataObject,
  setDataFunction,
  disabled,
  serviceNowToolId,
}) {
  // const toastContext = useContext(DialogToastContext);
  const [field] = useState(dataObject?.getFieldById(fieldName));
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [configurationItems, setConfigurationItems] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData(fieldName, value);
    setDataObject({ ...newDataObject });
  };

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setConfigurationItems([]);
    if (serviceNowToolId !== "" && serviceNowToolId != null) {
      loadConfigurationItems(serviceNowToolId, source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [serviceNowToolId]);

  const loadConfigurationItems = async (serviceNowId, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await pipelineStepNotificationActions.getServiceNowConfigurationItems(
        serviceNowId,
        getAccessToken,
        cancelSource
      );

      if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
        setConfigurationItems(response.data.message);
      }
    } catch (error) {
      if (isMounted?.current === true) {
        // toastContext.showErrorDialog(
        //   "Tool information is missing or unavailable! Please ensure the required credentials are registered and up to date in Tool Registry."
        // );
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const getPlaceholderText = () => {
    if (isLoading) {
      return "Loading Configuration Items";
    }

    if (serviceNowToolId === "") {
      return "A ServiceNow Tool must be selected before selecting a Configuration Item";
    }

    if (!isLoading && serviceNowToolId !== "" && configurationItems.length === 0) {
      return "No Configuration Items found for selected ServiceNow account.";
    }

    if (!isLoading && serviceNowToolId !== "" && configurationItems.length !== 0) {
      return "Select Configuration Items";
    }
  };

  return (
    <MultiSelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={configurationItems}
      setDataFunction={setDataFunction}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || serviceNowToolId === "" || configurationItems.length === 0}
      onChange={(newValue) => validateAndSetData(field.id, newValue)}
    />
  );
}

ServiceNowConfigurationItemsSelectInput.propTypes = {
  fieldName: PropTypes.string,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  visible: PropTypes.bool,
  placeholderText: PropTypes.string,
  serviceNowToolId: PropTypes.string,
};

ServiceNowConfigurationItemsSelectInput.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default ServiceNowConfigurationItemsSelectInput;
