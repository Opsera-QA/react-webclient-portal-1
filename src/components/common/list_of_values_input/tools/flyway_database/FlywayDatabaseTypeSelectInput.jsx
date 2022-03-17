import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

// TODO: Make constants
const FLYWAY_DB_TYPES = [
  {
    name: "Snowflake",
    value: "snowflake"
  },
  {
    name: "Redshift",
    value: "redshift"
  },
  {
    name: "SQL Server",
    value: "sqlserver"
  },
  {
    name: "MySQL",
    value: "mysql"
  },
  {
    name: "Oracle",
    value: "oracle"
  }
];

function FlywayDatabaseTypeSelectInput(
  {
    fieldName,
    model,
    setModel,
    setDataFunction,
    clearDataFunction,
    disabled,
  }) {
  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={FLYWAY_DB_TYPES}
      valueField={"value"}
      textField={"name"}
      placeholderText={"Select Database Type"}
      disabled={disabled}
    />
  );
}

FlywayDatabaseTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  setDataFunction: PropTypes.func,
  disabled: PropTypes.bool,
  clearDataFunction: PropTypes.func,
};

export default FlywayDatabaseTypeSelectInput;
