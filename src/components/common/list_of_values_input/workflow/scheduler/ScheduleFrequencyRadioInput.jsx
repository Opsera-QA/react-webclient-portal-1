import React from "react";
import PropTypes from "prop-types";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";

function ScheduleFrequencyRadioInput({ fieldName, dataObject, setDataObject, updateScheduleName, disabled }) {
  return (
    <RadioButtonInputContainer dataObject={dataObject} fieldName={fieldName}>
      <RadioButtonOption
        className={"mb-2"}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        value={"NONE"}
        label={
          <span>
            <div>
              <strong>Once</strong>
            </div>
            This pipeline will run once at the scheduled time.
          </span>
        }
      />
      <RadioButtonOption
        className={"mb-2"}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        value={"DAY"}
        onChange={updateScheduleName(dataObject)}
        label={
          <span>
            <div>
              <strong>Daily</strong>
            </div>
            If active, the pipeline will run daily at the scheduled time.
          </span>
        }
      />
      <RadioButtonOption
        className={"mb-2"}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        value={"WEEK"}
        label={
          <span>
            <div>
              <strong>Weekly</strong>
            </div>
            If active, the pipeline will run weekly at the scheduled time.
          </span>
        }
      />
      <RadioButtonOption
        className={"mb-2"}
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        value={"MONTH"}
        label={
          <span>
            <div>
              <strong>Monthly</strong>
            </div>
            If active, the pipeline will run monthly at the scheduled time.
          </span>
        }
      />
    </RadioButtonInputContainer>
  );
}

ScheduleFrequencyRadioInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  updateScheduleName: PropTypes.func,
};

ScheduleFrequencyRadioInput.defaultProps = {
  fieldName: "frequency",
};

export default ScheduleFrequencyRadioInput;
