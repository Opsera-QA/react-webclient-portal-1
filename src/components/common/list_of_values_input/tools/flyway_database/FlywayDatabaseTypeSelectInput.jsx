import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

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

const FlywayDatabaseTypeSelectInput = ({dataObject, setDataObject, fieldName, disabled}) => {
  
  const setDataFunction = (fieldName, selectedOption) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("buildType", selectedOption.value);
    setDataObject({...newDataObject});
  };

  const clearDataFunction = (fieldName) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("buildType", "");
    setDataObject({...newDataObject});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      selectOptions={FLYWAY_DB_TYPES}      
      valueField="value"
      textField="name"
      placeholderText={"Select Database Type"}
      disabled={disabled}
    />
  );
};

FlywayDatabaseTypeSelectInput.propTypes = {
  dataObject: PropTypes.object,
  fieldName: PropTypes.string,
  setDataObject: PropTypes.func,    
  disabled: PropTypes.bool,  
};

FlywayDatabaseTypeSelectInput.defaultProps = {
  disabled: false
};

export default FlywayDatabaseTypeSelectInput;
