import React from "react";
import PropTypes from "prop-types";
import RadioButtonInputContainer from "components/common/inputs/radio/RadioButtonInputContainer";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";

function ActiveScheduleRadioInput({ fieldName, dataObject, setDataObject, disabled}) {
  return (
    <RadioButtonInputContainer dataObject={dataObject} fieldName={fieldName}>
          <RadioButtonOption
          className={"mb-2"}
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"true"}
            label={
              <span>
                <div><strong>Active Schedule</strong></div>
                Enable the current schedule.
                The pipeline will run in accordance with this schedule until stopped. 
             </span>
            }
          />
          <RadioButtonOption
            className={"mb-2"}
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
            value={"false"}
            label={
              <span>
                <div><strong>Disable Schedule</strong></div>
                The current schedule will be paused until reactivated. 
                This does not remove your schedule. 
             </span>
            }
          />
    </RadioButtonInputContainer>
  );
}

ActiveScheduleRadioInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

ActiveScheduleRadioInput.defaultProps = {
  fieldName: "active",
};

export default ActiveScheduleRadioInput;