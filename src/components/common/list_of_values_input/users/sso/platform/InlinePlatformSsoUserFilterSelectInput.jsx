import React from "react";
import PropTypes from "prop-types";
import PlatformSsoUserSelectFilterSelectInput
  from "components/common/list_of_values_input/users/sso/platform/PlatformSsoUserSelectFilterSelectInput";

export default function InlinePlatformSsoUserFilterSelectInput(
  {
    filterModel,
    fieldName,
    valueField,
    textField,
    className,
    loadDataFunction,
  }) {
  const setDataFunction = (fieldName, selectedOption) => {
    filterModel.setData(fieldName, selectedOption?._id);
    filterModel.setData("userEmail", selectedOption?.email);
    loadDataFunction(filterModel);
  };

  if (loadDataFunction == null) {
    return null;
  }

  return (
    <PlatformSsoUserSelectFilterSelectInput
      fieldName={fieldName}
      valueField={valueField}
      className={className}
      textField={textField}
      setDataFunction={setDataFunction}
      filterModel={filterModel}
      inline={true}
    />
  );
}

InlinePlatformSsoUserFilterSelectInput.propTypes = {
  filterModel: PropTypes.object,
  loadDataFunction: PropTypes.func,
  fieldName: PropTypes.string,
  valueField: PropTypes.string,
  showClearValueButton: PropTypes.bool,
  textField: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  className: PropTypes.string,
};
