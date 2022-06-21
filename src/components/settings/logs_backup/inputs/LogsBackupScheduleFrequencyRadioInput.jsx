import React from "react";
import PropTypes from "prop-types";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";
import InputContainer from "components/common/inputs/InputContainer";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {faSync} from "@fortawesome/pro-light-svg-icons";

function LogsBackupScheduleFrequencyRadioInput({ fieldName, model, setModel, scheduledTaskData, setSchedulerTaskModel, disabled }) {
  const setDataFunction = (fieldName, value) => {
    model.setData(fieldName, value);
    if (value === "HOUR") { value = 1; }
    if (value === "6HOURS") { value = 6; }
    if (value === "DAY") { value = 24; }
    console.log("value: " + JSON.stringify(value));
    scheduledTaskData.setData("task.pushToS3Interval", value);
    setSchedulerTaskModel({...scheduledTaskData});
  };

  if (model == null) {
    return null;
  }

  return (
    <InputContainer className={"custom-radio-button-input my-2 h-100"} fieldName={fieldName}>
      <div className={"content-container h-100"}>
        <InputTitleBar icon={faSync} field={model?.getFieldById(fieldName)}/>
        <div className={"p-3"}>
          <RadioButtonOption
            className={"mb-2"}
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            setDataFunction={setDataFunction}
            value={"HOUR"}
            label={
              <span>
              <div>
                <strong>Hourly</strong>
              </div>
              If active, pipeline activity logs will be backed up hourly starting at the selected time.
            </span>
            }
          />
          <RadioButtonOption
            className={"mb-2"}
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            setDataFunction={setDataFunction}
            value={"6HOURS"}
            label={
              <span>
              <div>
                <strong>6 Hours</strong>
              </div>
              If active, pipeline activity logs will be backed up every 6 hours starting at the selected time.
            </span>
            }
          />
          <RadioButtonOption
            className={"mb-2"}
            fieldName={fieldName}
            dataObject={model}
            setDataObject={setModel}
            setDataFunction={setDataFunction}
            value={"DAY"}
            label={
              <span>
              <div>
                <strong>Daily</strong>
              </div>
              If active, pipeline activity logs will be backed up daily starting at the selected time.
            </span>
            }
          />
        </div>
      </div>
    </InputContainer>
  );
}

LogsBackupScheduleFrequencyRadioInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  scheduledTaskData: PropTypes.object,
  setSchedulerTaskModel: PropTypes.func,
  disabled: PropTypes.bool,
};

LogsBackupScheduleFrequencyRadioInput.defaultProps = {
  fieldName: "recurring",
};

export default LogsBackupScheduleFrequencyRadioInput;
