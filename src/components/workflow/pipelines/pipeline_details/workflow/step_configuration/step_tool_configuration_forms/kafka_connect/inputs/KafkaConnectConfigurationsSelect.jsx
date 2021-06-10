import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogToastContext } from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import axios from "axios";
import KafkaConnectActions from "../kafkaConnect-step-actions";

function KafkaConnectConfigurationSelectInput({
  fieldName,
  dataObject,
  setDataObject,
  disabled,
  textField,
  valueField,
  tool_prop,
  pipelineId,
}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [configurations, setKafkaConnectConfigurations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Configuration");
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (!disabled) {
      loadData(source).catch((error) => {
        if (isMounted?.current === true) {
          throw error;
        }
      });
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, []);

  const loadData = async (cancelSource = cancelTokenSource) => {
    try {
      setIsLoading(true);
      await loadTypes(cancelSource);
    } catch (error) {
      if (isMounted?.current === true) {
        console.error(error);
        toastContext.showLoadingErrorDialog(error);
      }
    } finally {
      if (isMounted?.current === true) {
        setIsLoading(false);
      }
    }
  };

  const loadTypes = async () => {
    try {
      const res = await KafkaConnectActions.getConfigurations(
        dataObject.getData("kafkaToolId"),
        getAccessToken,
        cancelTokenSource
      );
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No Configurations Found");
          return;
        }
        setPlaceholder("Select a Configuration");
        setKafkaConnectConfigurations(res.data);
        return;
      }
      setPlaceholder("No Configurations Found");
      setKafkaConnectConfigurations([]);
    } catch (error) {
      setPlaceholder("No Configurations Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  const handleDtoChange = async (fieldName, value) => {
    let newDataObject = dataObject;
    newDataObject.setData("kafkaConnectorName", value);
    setDataObject({ ...newDataObject });
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataFunction={handleDtoChange}
        setDataObject={setDataObject}
        selectOptions={configurations}
        busy={isLoading}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (configurations == null || configurations.length === 0))}
      />
    </div>
  );
}

KafkaConnectConfigurationSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string,
};

KafkaConnectConfigurationSelectInput.defaultProps = {
  fieldName: "kafkaConnectorName",
};

export default KafkaConnectConfigurationSelectInput;
