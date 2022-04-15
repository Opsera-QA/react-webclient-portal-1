import React from "react";
import PropTypes from "prop-types";
import MultiTextListInputBase from "components/common/inputs/list/text/MultiTextListInputBase";
import {validateEmail} from "utils/helpers";

function MultiEmailListInput(
  {
    model,
    setModel,
    setDataFunction,
    fieldName,
    customTitle,
    error,
    singularTopic,
    pluralTopic,
    className,
    disabled,
  }) {
  return (
    <MultiTextListInputBase
      model={model}
      setModel={setModel}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
      customTitle={customTitle}
      isPotentialValueValidFunction={validateEmail}
      error={error}
      singularTopic={singularTopic}
      pluralTopic={pluralTopic}
      className={className}
      disabled={disabled}
    />
  );
}

MultiEmailListInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  singularTopic: PropTypes.string,
  pluralTopic: PropTypes.string,
  fieldName: PropTypes.string,
  customTitle: PropTypes.string,
  error: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

MultiEmailListInput.defaultProps = {
  singularTopic: "Email Address",
  pluralTopic: "Email Addresses"
};

export default MultiEmailListInput;