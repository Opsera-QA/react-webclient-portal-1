import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {DialogToastContext} from "contexts/DialogToastContext";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import OctopusStepActions
  from "../../../../../../../../workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/octopus-step-actions";
import { AuthContext } from "../../../../../../../../../contexts/AuthContext";
import axios from "axios";

function OctopusLifecycleSelectInput({ fieldName, dataObject, setDataObject, disabled, textField, valueField, tool_prop, pipelineId}) {
  const toastContext = useContext(DialogToastContext);
  const { getAccessToken } = useContext(AuthContext);
  const [lifecycles, setOctopusLifecycles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceholder] = useState("Select a Lifecycle");
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
  }, [tool_prop]);

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
      const res = await OctopusStepActions.getLifecycles(dataObject.getData("octopusToolId"),dataObject.getData("spaceId"), getAccessToken, cancelTokenSource);
      if (res && res.status === 200) {
        if (res.data.length === 0) {
          setPlaceholder("No Lifecycles Found");
          return;
        }
        setPlaceholder("Select a Lifecycle");
        setOctopusLifecycles(res.data);
        return;
      }
      setPlaceholder("No Lifecycles Found");
      setOctopusLifecycles([]);
    } catch (error) {
      setPlaceholder("No Lifecycles Found");
      console.error(error);
      toastContext.showServiceUnavailableDialog();
    }
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={lifecycles}
        busy={isLoading}
        textField={textField}
        valueField={valueField}
        placeholderText={placeholder}
        disabled={disabled || isLoading || (!isLoading && (lifecycles == null || lifecycles.length === 0))}
      />
    </div>
  );
}

OctopusLifecycleSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
  tool_prop: PropTypes.string,
  pipelineId: PropTypes.string
};

OctopusLifecycleSelectInput.defaultProps = {
  valueField: "id",
  textField: "name"
};

export default OctopusLifecycleSelectInput;