import React from "react";
import PropTypes from "prop-types";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import ParameterMappingInputBase
  from "../../../../../../../../common/list_of_values_input/parameters/ParameterMappingInputBase";

function CommandLineParameterSelectInput({ dataObject, setDataObject, disabled, fieldName}) {

  return (
    <ParameterMappingInputBase
      titleIcon={faHandshake}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={true}
      type={"Parameter Mappings"}
      regexValidationRequired={false}
      titleText={"Response Parameter Mapping"}
    />
  );
}

CommandLineParameterSelectInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
};


CommandLineParameterSelectInput.defaultProps = {
  fieldName: "sonarCustomParameters"
};

export default CommandLineParameterSelectInput;
