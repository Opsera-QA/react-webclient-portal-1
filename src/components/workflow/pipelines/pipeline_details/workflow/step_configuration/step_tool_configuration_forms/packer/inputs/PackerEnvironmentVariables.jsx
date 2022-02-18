import React from "react";
import PropTypes from "prop-types";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import ParameterMappingInputBase
  from "../../../../../../../../../common/list_of_values_input/parameters/ParameterMappingInputBase";

function PackerEnvironmentVariables({ dataObject, setDataObject, disabled, fieldName}) {

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

PackerEnvironmentVariables.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
};


PackerEnvironmentVariables.defaultProps = {
  fieldName: "environmentVariables"
};

export default PackerEnvironmentVariables;
