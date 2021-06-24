import React from "react";
import PropTypes from "prop-types";
import ProtocolsSelectInputBase from "components/workflow/pipelines/pipeline_details/workflow/step_configuration/step_tool_configuration_forms/octopus/input/ProtocolsSelectInputBase";
import {faServer} from "@fortawesome/pro-light-svg-icons";

function OctopusMultiProtocolInput({ dataObject, setDataObject, disabled, fieldName}) {

  return (
    <ProtocolsSelectInputBase
      titleIcon={faServer}
      dataObject={dataObject}
      setDataObject={setDataObject}
      fieldName={fieldName}
      allowIncompleteItems={false}
      type={"Protocol"}
      disabled={disabled}
      regexValidationRequired={false}
      titleText={"Protocol Selection"}
    />
  );
}

OctopusMultiProtocolInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  regexValidationRequired: PropTypes.bool,
};


OctopusMultiProtocolInput.defaultProps = {
  fieldName: "bindings"
};

export default OctopusMultiProtocolInput;
