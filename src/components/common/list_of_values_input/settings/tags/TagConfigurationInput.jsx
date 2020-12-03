import React from "react";
import PropTypes from "prop-types";
import ConfigurationInput from "../../../input/ConfigurationInput";

function TagConfigurationInput({ fieldName, dataObject, setDataObject, disabled}) {

  return (
    <ConfigurationInput
      dataObject={dataObject}
      fieldName={fieldName}
      setDataObject={setDataObject}
    />
  );
}

TagConfigurationInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

TagConfigurationInput.defaultProps = {
  fieldName: "configuration"
};

export default TagConfigurationInput;