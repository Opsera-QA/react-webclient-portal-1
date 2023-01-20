import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const STEP_TYPES = [
  { name: "View Pending Migrations", value: "view" },
  { name: "Deploy Pending Migrations", value: "deploy" },
  { name: "Rollback", value: "rollback" },
];

function LiquibaseStepTypeSelectInput({ fieldName, model, setModel, disabled, textField, valueField }) {

  const setDataFunction = (fieldName, selectedOption) => {
    let newModel = {...model};    
    newModel.setData(fieldName, selectedOption.value);    
    newModel.setDefaultValue("tag");
    setModel({...newModel});
  };

  return (
    <SelectInputBase
      fieldName={fieldName}
      dataObject={model}
      setDataObject={setModel}
      selectOptions={STEP_TYPES}
      valueField={valueField}
      textField={textField}
      disabled={disabled}
      setDataFunction={setDataFunction}
    />
  );
}

LiquibaseStepTypeSelectInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  textField: PropTypes.string,
  valueField: PropTypes.string,
};

LiquibaseStepTypeSelectInput.defaultProps = {
  fieldName: "jobType",
  valueField: "value",
  textField: "name"
};

export default LiquibaseStepTypeSelectInput;
