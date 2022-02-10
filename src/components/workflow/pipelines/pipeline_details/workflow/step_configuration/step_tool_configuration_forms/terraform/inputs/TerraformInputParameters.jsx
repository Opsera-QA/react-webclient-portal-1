import React from "react";
import PropTypes from "prop-types";
import {faHandshake} from "@fortawesome/pro-light-svg-icons";
import ParameterMappingInputBase
  from "../../../../../../../../common/list_of_values_input/parameters/ParameterMappingInputBase";

function TerraformInputParameters({ dataObject, setDataObject, disabled, fieldName}) {

  return (
    <ParameterMappingInputBase
      titleIcon={faHandshake}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={true}
      type={"Input Parameters"}
      regexValidationRequired={false}
      titleText={"Input Parameter Mapping"}
    />
  );
}

TerraformInputParameters.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
};


TerraformInputParameters.defaultProps = {
  fieldName: "inputParameters"
};

export default TerraformInputParameters;
