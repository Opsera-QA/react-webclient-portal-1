import React from "react";
import PropTypes from "prop-types";
import TextAreaInputBase from "components/common/inputs/text/text_area/TextAreaInputBase";
import {hasStringValue} from "components/common/helpers/string-helpers";

function SonarStepSonarSourcePathTextAreaInput({model, setModel, disabled}) {
  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};
    const parsedValue = hasStringValue(newValue) === true ? newValue.replace(/\r?\n/g, ',') : "";
    newModel.setData(fieldName, parsedValue);
    setModel({...newModel});
  };

  return (
    <TextAreaInputBase
      fieldName={"sonarSourcePath"}
      model={model}
      setDataFunction={setDataFunction}
      setModel={setModel}
      disabled={disabled}
    />
  );
}

SonarStepSonarSourcePathTextAreaInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default SonarStepSonarSourcePathTextAreaInput;