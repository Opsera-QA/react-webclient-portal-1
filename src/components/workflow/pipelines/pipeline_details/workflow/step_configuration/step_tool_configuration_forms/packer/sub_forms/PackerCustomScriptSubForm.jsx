import React from "react";
import PropTypes from "prop-types";
import PackerCustomScriptSelectInput from "../inputs/custom_scripts/PackerCustomScriptSelectInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import PackerInputParameters from "../inputs/PackerInputParameters";
import PackerVariablesFilesInput from "../inputs/PackerVariablesFilesInput";
import PackerVariablesFileToggleInput from "../inputs/PackerVariablesFileToggleInput";

function PackerCustomScriptSubForm({ model, setModel }) {


  const getScriptFields = () => {
    if(model?.getData("customScript")){
      return (
        <TextAreaInput dataObject={model} fieldName={"commands"} setDataObject={setModel}/>
      );
    }

    return (
      <>
        <TextInputBase fieldName={"inputFileName"} dataObject={model} setDataObject={setModel} />
        <PackerVariablesFileToggleInput fieldName={"isVariableFile"} model={model} setModel={setModel} />
        {getVariableInputs()}
      </>
    );
  };

  const getVariableInputs = () => {
    if(model?.getData("isVariableFile")){
      return (
        <PackerVariablesFilesInput
          dataObject={model}
          setDataObject={setModel}
        />
      );
    }

    return (
      <PackerInputParameters
        dataObject={model}
        setDataObject={setModel}
      />
    );

  };

  return (
    <>
      <PackerCustomScriptSelectInput dataObject={model} setDataObject={setModel} />
      {getScriptFields()}
    </>
  );
}

PackerCustomScriptSubForm.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default PackerCustomScriptSubForm;
