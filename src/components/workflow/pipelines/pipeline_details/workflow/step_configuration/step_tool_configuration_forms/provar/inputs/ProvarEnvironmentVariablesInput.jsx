import React from "react";
import PropTypes from "prop-types";
import { faHandshake } from "@fortawesome/pro-light-svg-icons";
import ParameterMappingInputBase from "components/common/list_of_values_input/parameters/ParameterMappingInputBase";

function ProvarEnvironmentVariablesInput({
  dataObject,
  setDataObject,
  disabled,
  fieldName,
  visible,
}) {
  if (!visible) {
    return null;
  }

  return (
    <ParameterMappingInputBase
      titleIcon={faHandshake}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={true}
      type={"Environment Variables"}
      regexValidationRequired={false}
      titleText={"Environment Variable Mapping"}
    />
  );
}

ProvarEnvironmentVariablesInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
  visible: PropTypes.bool,
};

ProvarEnvironmentVariablesInput.defaultProps = {
  fieldName: "environmentVariables",
};

export default ProvarEnvironmentVariablesInput;
