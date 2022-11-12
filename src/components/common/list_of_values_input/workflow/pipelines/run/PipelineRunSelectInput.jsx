import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function PipelineRunSelectInput({ model, setModel, fieldName, setDataFunction, clearDataFunction, maximumRunCount, className, showLabel, disabled}) {
  const isMounted = useRef(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(undefined);
  const [runOptions, setRunOptions] = useState([]);

  useEffect(() => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }

    const source = axios.CancelToken.source();
    setCancelTokenSource(source);
    isMounted.current = true;

    if (maximumRunCount > 0) {
      loadData();

    }
    return () => {
      source.cancel();
      isMounted.current = false;
    };
  }, [maximumRunCount]);

  const loadData = () => {
    let runArray = [];

    for (let i = 1; i <= maximumRunCount; i++) {
      runArray.push({
        text: `Run ${i}`,
        value: i,
      });
    }

    setRunOptions(runArray);
  };

  return (
    <SelectInputBase
      className={className}
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      selectOptions={runOptions}
      valueField={"value"}
      textField={"text"}
      placeholderText={"Select a Run Number"}
      showLabel={showLabel}
      clearDataFunction={clearDataFunction}
      disabled={disabled}
    />
  );
}

PipelineRunSelectInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  maximumRunCount: PropTypes.number,
  className: PropTypes.string,
  fieldName: PropTypes.string,
  setDataFunction: PropTypes.func,
  clearDataFunction: PropTypes.func,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
};

PipelineRunSelectInput.defaultProps = {
  maximumRunCount: 0,
  fieldName: "selectedRunNumber",
};

export default PipelineRunSelectInput;


