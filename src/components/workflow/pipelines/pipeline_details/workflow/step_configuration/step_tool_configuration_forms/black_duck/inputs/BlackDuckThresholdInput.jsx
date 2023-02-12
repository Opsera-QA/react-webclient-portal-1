import React from "react";
import PropTypes from "prop-types";
import PipelineThresholdInputBase
  from "components/common/inputs/object/pipelines/threshhold/PipelineThresholdInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

export const THRESHOLD_LEVELS = [
  {text: "Critical", value: "critical"},
  {text: "High", value: "high"},
  {text: "Medium", value: "medium"},
  {text: "Low", value: "low"},
  {text: "Ok", value: "ok"},
  {text: "Unknown", value: "unknown"},
  {text: "Total", value: "total"},
];

function BlackDuckThresholdInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {

  const setDataFunction = (fieldName, value) => {
    let newModel = {...model};
    newModel.setData(fieldName, value);
    newModel.setDefaultValue("thresholdVulnerability");
    newModel.setDefaultValue("thresholdLicence");
    newModel.setDefaultValue("thresholdOperational");
    setModel({...newModel});
  };

  const getThresholdFields = () => {
    if (model?.getData("clientSideThreshold") !== true) {
      return null;
    }
    return (
      <>
        <PipelineThresholdInputBase
          fieldName={"thresholdVulnerability"}
          model={model}
          className={"mb-3"}
          setModel={setModel}
          disabled={disabled}
          thresholds={THRESHOLD_LEVELS}
        />
        <PipelineThresholdInputBase
          fieldName={"thresholdLicence"}
          model={model}
          className={"mb-3"}
          setModel={setModel}
          disabled={disabled}
          thresholds={THRESHOLD_LEVELS}
        />
        <PipelineThresholdInputBase
          fieldName={"thresholdOperational"}
          model={model}
          className={"mb-3"}
          setModel={setModel}
          disabled={disabled}
          thresholds={THRESHOLD_LEVELS}
        />
      </>
    );
  };


  return (
    <>
      <BooleanToggleInput
        dataObject={model}
        setDataObject={setModel}
        fieldName={fieldName}
        setDataFunction={setDataFunction}
      />
      {getThresholdFields()}
    </>
  );
}

BlackDuckThresholdInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

BlackDuckThresholdInput.defaultProps = {
  fieldName: "clientSideThreshold",
};

export default BlackDuckThresholdInput;
