import React from "react";
import PropTypes from "prop-types";
import PipelineRunNumberInput
  from "components/common/inputs/number/pipelines/PipelineRunNumberInput";

function InlinePipelineRunNumberInput({ model, setModel, fieldName, maximumRunCount, className, loadData, showLabel}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = model;
    newDataObject.setData(fieldName, value);
    setModel({...newDataObject});
    loadData(newDataObject);
  };

  return (
    <PipelineRunNumberInput
      showLabel={showLabel}
      setDataFunction={setDataFunction}
      model={model}
      setModel={setModel}
      maximumRunCount={maximumRunCount}
      fieldName={fieldName}
      className={className}
    />
  );
}

InlinePipelineRunNumberInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  maximumRunCount: PropTypes.number,
  className: PropTypes.string,
  loadData: PropTypes.func,
  showLabel: PropTypes.bool,
  fieldName: PropTypes.string,
};

InlinePipelineRunNumberInput.defaultProps = {
  maximumRunCount: 0,
  showLabel: false,
};

export default InlinePipelineRunNumberInput;


