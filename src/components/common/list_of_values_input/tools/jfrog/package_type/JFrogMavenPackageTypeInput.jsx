import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Make types file
const PACKAGE_TYPES = [
  {
    text: "Maven",
    value: "Maven"
  }
];

const JFrogMavenPackageTypeInput = ({model, setModel, disabled, fieldName}) => {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={PACKAGE_TYPES}
      valueField={"value"}
      textField={"text"}
      placeholderText={"Select Package Type"}
      disabled={disabled}
    />
  );
};

JFrogMavenPackageTypeInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,  
  fieldName: PropTypes.string,
};

JFrogMavenPackageTypeInput.defaultProps = {
  disabled: false
};

export default JFrogMavenPackageTypeInput;
