import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";
import axios from "axios";
import pipelineHelpers from "components/workflow/pipelineHelpers";

function PipelineStepSelectInput({ fieldName, model, setModel, setDataFunction, disabled, plan, stepId }) {
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
    if (plan && stepId) {
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
};

export default PipelineStepSelectInput;