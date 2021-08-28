import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import { AuthContext } from "contexts/AuthContext";
import axios from "axios";
import pipelineStepNotificationActions from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_notification_configuration/pipeline-step-notification-actions";
// import { DialogToastContext } from "contexts/DialogToastContext";

function ServiceNowBusinessServicesSelectInput({
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
  const { getAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [businessServices, setBusinessServices] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setBusinessServices([]);
    if (serviceNowToolId !== "" && serviceNowToolId != null) {
      loadBusinessServices(serviceNowToolId, source).catch((error) => {
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

  const loadBusinessServices = async (serviceNowId, cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      const response = await pipelineStepNotificationActions.getServiceNowBusinessServices(
        serviceNowId,
        getAccessToken,
        cancelSource
      );

      if (response.data != null && response.data.message != null && Array.isArray(response.data.message)) {
        setBusinessServices(response.data.message);
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
      return "Loading Business Services";
    }

    if (serviceNowToolId === "") {
      return "A ServiceNow Tool must be selected before selecting a Business Service";
    }

    if (!isLoading && serviceNowToolId !== "" && businessServices.length === 0) {
      return "No Business Services found for selected ServiceNow account.";
    }
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={businessServices}
      setDataFunction={setDataFunction}
      busy={isLoading}
      valueField={valueField}
      textField={textField}
      placeholderText={getPlaceholderText()}
      disabled={disabled || isLoading || serviceNowToolId === "" || businessServices.length === 0}
    />
  );
}

ServiceNowBusinessServicesSelectInput.propTypes = {
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

ServiceNowBusinessServicesSelectInput.defaultProps = {
  textField: "name",
  valueField: "_id",
};

export default ServiceNowBusinessServicesSelectInput;
