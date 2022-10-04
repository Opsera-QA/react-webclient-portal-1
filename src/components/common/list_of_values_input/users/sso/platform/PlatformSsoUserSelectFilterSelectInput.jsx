import React from "react";
import PropTypes from "prop-types";
import useGetPlatformSsoUsers from "components/common/list_of_values_input/users/sso/platform/useGetPlatformSsoUsers";
import FilterSelectInputBase from "components/common/filters/input/FilterSelectInputBase";

export default function PlatformSsoUserSelectFilterSelectInput(
  {
    filterModel,
    setFilterModel,
    fieldName,
    valueField,
    textField,
    setDataFunction,
    className,
    inline,
  }) {
  const {
    platformSsoUsers,
    isLoading,
    error,
  } = useGetPlatformSsoUsers();

  return (
    <FilterSelectInputBase
      inline={inline}
      fieldName={fieldName}
      className={className}
      placeholderText={"Filter By User"}
      setDataObject={setFilterModel}
      dataObject={filterModel}
      busy={isLoading}
      textField={textField}
      valueField={valueField}
      selectOptions={platformSsoUsers}
      setDataFunction={setDataFunction}
    />
  );
}

PlatformSsoUserSelectFilterSelectInput.propTypes = {
  filterModel: PropTypes.object,
  setFilterModel: PropTypes.func,
  fieldName: PropTypes.string,
  valueField: PropTypes.string,
  showClearValueButton: PropTypes.bool,
  textField: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
  setDataFunction: PropTypes.func,
  className: PropTypes.string,
  inline: PropTypes.bool,
};

PlatformSsoUserSelectFilterSelectInput.defaultProps = {
  valueField: "_id",
  textField: "email",
};

