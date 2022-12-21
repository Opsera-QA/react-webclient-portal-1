import React from "react";
import PropTypes from "prop-types";
import PipelineThresholdInputBase
  from "components/common/inputs/object/pipelines/threshhold/PipelineThresholdInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";

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
    newModel.setDefaultValue("thresholdCompliance");
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
          fieldName={"thresholdCompliance"}
          model={model}
          className={"mb-3"}
          setModel={setModel}
          disabled={disabled}
        />
        <PipelineThresholdInputBase
          fieldName={"thresholdLicence"}
          model={model}
          className={"mb-3"}
          setModel={setModel}
          disabled={disabled}
        />
        <PipelineThresholdInputBase
          fieldName={"thresholdOperational"}
          model={model}
          className={"mb-3"}
          setModel={setModel}
          disabled={disabled}
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
