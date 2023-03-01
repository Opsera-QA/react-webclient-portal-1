import React from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import DockerDynamicNameTypeSelectionInput from "./DockerDynamicNameTypeSelectionInput";

const DockerNameInput = ({ model, setModel }) => {

  const getDynamicDockerNameInput = () => {
    if (model?.getData("useDockerDynamicName") === true) {
      return (
        <DockerDynamicNameTypeSelectionInput
          model={model}
          setModel={setModel}
        />
      );
    } else {
      return (
        <TextInputBase
          dataObject={model}
          setDataObject={setModel}
          fieldName={"dockerName"}
        />
      );
    }
  };

  return (
    <>
      <BooleanToggleInput 
        dataObject={model} 
        setDataObject={setModel} 
        fieldName={"useDockerDynamicName"} 
      />
      {getDynamicDockerNameInput()}
    </>
  );
};

DockerNameInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};

export default DockerNameInput;
