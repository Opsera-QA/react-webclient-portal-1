import React, { useState } from "react";
import PropTypes from "prop-types";
import HelmCustomScriptSelectInput from "../inputs/custom_scripts/HelmCustomScriptSelectInput";
import TextAreaInput from "../../../../../../../../common/inputs/text/TextAreaInput";

function CustomScriptSubForm({ model, setModel }) {

  const getScriptFields = () => {
    if(model?.getData("customScript")){
      return (
        <TextAreaInput dataObject={model} fieldName={"commands"} setDataObject={setModel}/>
      );
    }
  };

  return (
    <>
      <HelmCustomScriptSelectInput dataObject={model} setDataObject={setModel} />
      {getScriptFields()}      
    </>
  );
}

CustomScriptSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default CustomScriptSubForm;
