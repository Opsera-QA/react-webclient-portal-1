import React from "react";
import PropTypes from "prop-types";
import CodeInput from "components/common/inputs/code/CodeInput";

function CodeFieldBase(
  {
    model,
    fieldName,
    mode,
    className,
    isLoading,
    height,
  }) {
  return (
    <CodeInput
      disabled={true}
      model={model}
      mode={mode}
      isLoading={isLoading}
      fieldName={fieldName}
      className={className}
      height={height}
    />
  );
}

CodeFieldBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  mode: PropTypes.string,
  isLoading: PropTypes.bool,
  height: PropTypes.string,
};

export default CodeFieldBase;