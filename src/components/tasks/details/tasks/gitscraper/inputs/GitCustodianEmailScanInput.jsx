import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import MultiTextInputBase from "components/common/inputs/text/MultiTextInputBase";

function GitCustodianEmailScanInput({model, setModel, fieldName, disabled, plan}) {

  const setDataFunction = () => {
    let newDataObject = model;
    newDataObject.setData(fieldName, !model.getData(fieldName));
    newDataObject.setDefaultValue("excludeDomains");
    setModel({...newDataObject});
  };

  const getDynamicInput = () => {
    if (model?.getData("scanEmail") !== true) {
      return null;
    }
    return (
      <MultiTextInputBase
        dataObject={model}
        setDataObject={setModel}
        fieldName={"excludeDomains"}
      />
    );
  };

  if (model == null) {
    return null;
  }

  return (
    <>
      <BooleanToggleInput
        setDataObject={setModel}
        dataObject={model}
        setDataFunction={setDataFunction}
        fieldName={fieldName}
        disabled={disabled}
      />
      {getDynamicInput()}
    </>
  );
}

GitCustodianEmailScanInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  plan: PropTypes.array
};

export default GitCustodianEmailScanInput;
