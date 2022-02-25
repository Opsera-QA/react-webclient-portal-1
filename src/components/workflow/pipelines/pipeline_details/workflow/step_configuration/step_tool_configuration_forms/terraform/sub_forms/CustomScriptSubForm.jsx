import React, { useState } from "react";
import PropTypes from "prop-types";
import TerraformCustomScriptSelectInput from "../inputs/custom_scripts/TerraformCustomScriptSelectInput";
import TextAreaInput from "../../../../../../../../common/inputs/text/TextAreaInput";

function CustomScriptSubForm({ model, setModel }) {

  return (
    <>
      <TerraformCustomScriptSelectInput dataObject={model} setDataObject={setModel} />
      {model?.getData("customScript") && (
        <>
          <TextAreaInput dataObject={model} fieldName={"terraformCommands"} setDataObject={setModel}/>          
        </>
      )}
    </>
  );
}

CustomScriptSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default CustomScriptSubForm;
