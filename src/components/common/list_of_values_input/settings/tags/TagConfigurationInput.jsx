import React from "react";
import PropTypes from "prop-types";
import ObjectPropertiesInput from "../../../input/ObjectPropertiesInput";

function TagConfigurationInput({ fieldName, dataObject, setDataObject, disabled}) {

  return (
    <ObjectPropertiesInput
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