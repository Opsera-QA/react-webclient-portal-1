import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import TextInputBase from "components/common/inputs/text/TextInputBase";

export default function JfrogDockerStepRepositorySubFolderNameInputs(
  {
    model,
    setModel,
  }) {
  const setDataFunction = (fieldName, newValue) => {
    model?.setData(fieldName, newValue);
    model?.setDefaultValue("repositorySubFolderName");
    setModel({...model});
  };

  return (
    <>
      <BooleanToggleInput
        fieldName={"useRepositorySubFolderName"}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
      />
      <TextInputBase
        fieldName={"repositorySubFolderName"}
        dataObject={model}
        setDataObject={setModel}
        visible={model?.getData("useRepositorySubFolderName") === true}
      />
    </>
  );
}

JfrogDockerStepRepositorySubFolderNameInputs.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
};
