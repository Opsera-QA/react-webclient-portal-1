import React from "react";
import PropTypes from "prop-types";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import ParameterMappingInputBase
  from "../../../../../../../../../common/list_of_values_input/parameters/ParameterMappingInputBase";

function HelmEnvironmentVariables({ model, setModel, disabled, fieldName}) {

  return (
    <ParameterMappingInputBase
      titleIcon={faHandshake}
      dataObject={model}
      setDataObject={setModel}
      fieldName={fieldName}
      allowIncompleteItems={true}
      type={"Environment Variables"}
      titleText={"Environment Variable Mapping"}
    />
  );
}

HelmEnvironmentVariables.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
};


HelmEnvironmentVariables.defaultProps = {
  fieldName: "environmentVariables"
};

export default HelmEnvironmentVariables;
