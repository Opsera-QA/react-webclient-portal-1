import React from "react";
import PropTypes from "prop-types";
import CodeInput from "components/common/inputs/code/CodeInput";

function CodeFieldBase({model, fieldName, mode, className, isLoading}) {
  return (
    <CodeInput
      disabled={true}
      model={model}
      mode={mode}
      isLoading={isLoading}
      fieldName={fieldName}
      className={className}
    />
  );
}

CodeFieldBase.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  className: PropTypes.string,
  mode: PropTypes.string,
  isLoading: PropTypes.bool
};

export default CodeFieldBase;