import React, {useState} from "react";
import PropTypes from "prop-types";
import {removeSpacesFromString, truncateString} from "components/common/helpers/string-helpers";
import TextInputBase from "components/common/inputs/text/TextInputBase";

function EndpointResponseFieldNameTextInput(
  {
    model,
    setModel,
    fieldName,
    updateMainModelFunction,
    disabled,
  }) {
  const [error, setError] = useState("");

  const setDataFunction = (fieldName, newValue) => {
    let parsedString = removeSpacesFromString(newValue);
    const maxLength = model?.getMaxLength(fieldName);
    setError(model?.getPotentialFieldValidationError(parsedString, fieldName));
    parsedString = truncateString(parsedString, maxLength, false);
    return updateMainModelFunction(fieldName, parsedString);
  };

  return (
    <TextInputBase
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      error={error}
      disabled={disabled}
    />
  );
}

EndpointResponseFieldNameTextInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  updateMainModelFunction: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
};

EndpointResponseFieldNameTextInput.defaultProps = {
  fieldName: "fieldName",
};

export default EndpointResponseFieldNameTextInput;