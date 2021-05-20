import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

export const frequency = [
  {value: "NONE", text: "Once"},
  {value: "DAY", text: "Daily"},
  {value: "WEEK", text: "Weekly"},
  {value: "MONTH", text: "Monthly"},
];


function PipelineScheduledTaskFrequencySelectInput({ fieldName, dataObject, setDataObject, disabled, scheduledTaskData, updateScheduleName}) {

  const handleChange = () => {
   scheduledTaskData.setData("schedule", dataObject);
  updateScheduleName(dataObject);
  };

  return (
    <div>
      <SelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        selectOptions={frequency}
        valueField={"value"}
        textField={"text"}
        disabled={disabled}
      />
    </div>
  );
}

PipelineScheduledTaskFrequencySelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  updateScheduleName: PropTypes.func,
  setDataFunction: PropTypes.func,
  scheduledTaskData: PropTypes.object,
};

PipelineScheduledTaskFrequencySelectInput.defaultProps = {
  fieldName: "recurring",
};

export default PipelineScheduledTaskFrequencySelectInput;
