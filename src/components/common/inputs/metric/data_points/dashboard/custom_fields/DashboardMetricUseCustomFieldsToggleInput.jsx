import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

function DashboardMetricUseCustomFieldsToggleInput(
  {
    model,
    setModel,
    fieldName,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    let newModel = { ...model };
    newModel.setData(fieldName, newValue);
    newModel?.setDefaultValue("mappedFields");
    setModel({...newModel});
  };

  return (
    <BooleanToggleInput
      dataObject={model}
      setDataObject={setModel}
      setDataFunction={setDataFunction}
      fieldName={fieldName}
    />
  );
}

DashboardMetricUseCustomFieldsToggleInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
};

export default DashboardMetricUseCustomFieldsToggleInput;
