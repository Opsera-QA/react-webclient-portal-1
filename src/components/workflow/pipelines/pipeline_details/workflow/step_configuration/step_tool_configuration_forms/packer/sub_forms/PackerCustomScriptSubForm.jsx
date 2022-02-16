import React from "react";
import PropTypes from "prop-types";
import PackerCustomScriptSelectInput from "../inputs/custom_scripts/PackerCustomScriptSelectInput";
import TextAreaInput from "components/common/inputs/text/TextAreaInput";
import PackerInputParameters from "../inputs/PackerInputParameters";
import PackerEnvironmentVariables from "../inputs/custom_scripts/PackerEnvironmentVariables";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import PackerVariablesFilesInput from "../inputs/PackerVariablesFilesInput";

function PackerCustomScriptSubForm({ model, setModel }) {


  const getScriptFields = () => {
    if(model?.getData("customScript")){
      return (
        <>
          <TextAreaInput dataObject={model} fieldName={"commands"} setDataObject={setModel}/>
          <PackerEnvironmentVariables
            dataObject={model}
            setDataObject={setModel}
          />
        </>
      );
    }

    return (
      <>        
        <BooleanToggleInput 
          fieldName={"isVariableFile"}
          dataObject={model}
          setDataObject={setModel}
        />
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
