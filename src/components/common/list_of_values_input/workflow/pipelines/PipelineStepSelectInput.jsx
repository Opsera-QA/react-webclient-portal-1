import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import pipelineHelpers from "components/workflow/pipelineHelpers";
import {isMongoDbId} from "components/common/helpers/mongo/mongoDb.helpers";

// TODO: We should add the ability to disable steps that don't match the tool_identifier of build steps we want to require
// Also we should just pull plan down with pipeline id
function PipelineStepSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    disabled,
    plan,
    stepId,
    className,
  }) {
  const [steps, setSteps] = useState([]);
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    setSteps([]);
    if (Array.isArray(plan) && isMongoDbId(stepId)) {
      const pipelineSteps = pipelineHelpers.formatStepOptions(plan, stepId);
      setSteps(pipelineSteps);
    }

    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [plan, stepId]);

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={steps}
      setDataFunction={setDataFunction}
      valueField={"_id"}
      textField={"name"}
      disabled={disabled}
      className={className}
    />
  );
}

PipelineStepSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  stepId: PropTypes.string,
  plan: PropTypes.any,
  className: PropTypes.string,
};

export default PipelineStepSelectInput;