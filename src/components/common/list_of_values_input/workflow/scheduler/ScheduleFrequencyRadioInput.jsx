import React from "react";
import PropTypes from "prop-types";
import RadioButtonOption from "components/common/inputs/radio/RadioButtonOption";
import InputContainer from "components/common/inputs/InputContainer";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {faSync} from "@fortawesome/pro-light-svg-icons";

function ScheduleFrequencyRadioInput({ fieldName, dataObject, setDataObject, disabled }) {
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
        </div>
      </div>
    </InputContainer>
  );
}

ScheduleFrequencyRadioInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

ScheduleFrequencyRadioInput.defaultProps = {
  fieldName: "frequency",
};

export default ScheduleFrequencyRadioInput;
