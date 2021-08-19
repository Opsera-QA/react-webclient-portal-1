import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

function ImageTypeSelectInput({dataObject, setDataObject, isLoading, disabled}) {

  const ACTION_LIST = [
    {
      name: "Windows",
      value: "windows",
    },
    {
      name: "Linux/Unix",
      value: "unix",
    }
  ];

  return (

    <SelectInputBase
      fieldName={"imageType"}
      dataObject={dataObject}
      setDataObject={setDataObject}
      selectOptions={ACTION_LIST}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Image Type"}
      disabled={disabled}
      busy={isLoading}
    />
  );
}

ImageTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string
};

export default ImageTypeSelectInput;