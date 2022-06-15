import React from "react";
import PropTypes from "prop-types";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";
import InputContainer from "components/common/inputs/InputContainer";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {faSync} from "@fortawesome/pro-light-svg-icons";

function LogsBackupScheduleFrequencyRadioInput({ fieldName, dataObject, setDataObject, disabled }) {
  return (
    <InputContainer className={"custom-radio-button-input my-2 h-100"} fieldName={fieldName}>
      <div className={"content-container h-100"}>
        <InputTitleBar icon={faSync} field={dataObject.getFieldById(fieldName)}/>
        <div className={"p-3"}>
          <RadioButtonOption
            className={"mb-2"}
            fieldName={fieldName}
            dataObject={dataObject}
            setDataObject={setDataObject}
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
            dataObject={dataObject}
            setDataObject={setDataObject}
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
            dataObject={dataObject}
            setDataObject={setDataObject}
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
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

LogsBackupScheduleFrequencyRadioInput.defaultProps = {
  fieldName: "frequency",
};

export default LogsBackupScheduleFrequencyRadioInput;
