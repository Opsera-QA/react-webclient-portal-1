import React from "react";
import PropTypes from "prop-types";
import DateTimeInput from "components/common/inputs/date/DateTimeInput";
import ServiceNowPrioritiesMultiSelectInput from "../../../../../common/list_of_values_input/insights/charts/servicenow/ServiceNowPrioritiesMultiSelectInput";

const SapCpqRunParameterDateTimeInput = ({
  sapCpqRunParameterConfigurationModel,
  setSapCpqRunParameterConfigurationModel,
  fieldName,
}) => {
  const setDataFunction = (fieldName, newDate) => {
    const newModel = { ...sapCpqRunParameterConfigurationModel };
    const parsedDate = newDate.toISOString().split(".")[0] + "Z";
    newModel.setData(fieldName, parsedDate);
    setSapCpqRunParameterConfigurationModel({ ...newModel });
    return newModel;
  };

  const clearDataFunction = (fieldName, newDate) => {
    const newModel = { ...sapCpqRunParameterConfigurationModel };
    newModel.setData(fieldName, undefined);
    setSapCpqRunParameterConfigurationModel({ ...newModel });
    return newModel;
  };

  return (
    <DateTimeInput
      fieldName={fieldName}
      setDataFunction={setDataFunction}
      clearDataFunction={clearDataFunction}
      dataObject={sapCpqRunParameterConfigurationModel}
      setDataObject={setSapCpqRunParameterConfigurationModel}
      defaultToNull={true}
      maxDate={new Date()}
    />
  );
};

SapCpqRunParameterDateTimeInput.propTypes = {
  fieldName: PropTypes.string,
  sapCpqRunParameterConfigurationModel: PropTypes.object,
  setSapCpqRunParameterConfigurationModel: PropTypes.func,
};

ServiceNowPrioritiesMultiSelectInput.defaultProps = {
  fieldName: "updateTime",
};

export default SapCpqRunParameterDateTimeInput;
