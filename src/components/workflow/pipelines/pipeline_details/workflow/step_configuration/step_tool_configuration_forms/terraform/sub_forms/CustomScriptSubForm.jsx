import React, { useState } from "react";
import PropTypes from "prop-types";
import TerraformCustomScriptSelectInput from "../inputs/custom_scripts/TerraformCustomScriptSelectInput";
import TextAreaInput from "../../../../../../../../common/inputs/text/TextAreaInput";
import TerraformVariablesFilesInput from "../inputs/TerraformVariablesFilesInput";
import TerraformVariablesFileToggleInput from "../inputs/TerraformVariablesFileToggleInput";
import TerraformInputParameters from "../inputs/TerraformInputParameters";

function CustomScriptSubForm({ model, setModel }) {

  const getScriptFields = () => {
    if(model?.getData("customScript")){
      return (
        <TextAreaInput dataObject={model} fieldName={"terraformCommands"} setDataObject={setModel}/>
      );
    }

    return (
      <>
        <TerraformVariablesFileToggleInput fieldName={"isVariableFile"} model={model} setModel={setModel} />
        {getVariableInputs()}
      </>
    );
  };

  const getVariableInputs = () => {
    if(model?.getData("isVariableFile")){
      return (
        <TerraformVariablesFilesInput
          dataObject={model}
          setDataObject={setModel}
        />
      );
    }

    return (
      <TerraformInputParameters
        dataObject={model}
        setDataObject={setModel}
      />
    );

  };

  return (
    <>
      <TerraformCustomScriptSelectInput dataObject={model} setDataObject={setModel} />
      {getScriptFields()}      
    </>
  );
}

CustomScriptSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default CustomScriptSubForm;
