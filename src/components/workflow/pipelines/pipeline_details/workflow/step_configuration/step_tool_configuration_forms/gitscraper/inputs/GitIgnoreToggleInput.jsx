import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ScraperCommonInputBase from "./ScraperCommonInputBase";
import { faFileCode, faUserSecret } from "@fortawesome/pro-light-svg-icons";

function GitIgnoreToggleInput({model, setModel, fieldName, disabled}) {

  const setDataFunction = () => {
    let newDataObject = model;
    newDataObject.setData(fieldName, !model.getData(fieldName));
    if (fieldName === "secretsException") newDataObject.setData("excludeSecrets", []);
    if (fieldName === "filesException") newDataObject.setData("excludeFiles", []);
    setModel({...newDataObject});
  };

  const getParametersInput = () => {
    if (model?.getData("secretsException") === true && fieldName === "secretsException") {
      return (
        <ScraperCommonInputBase
          titleIcon={faUserSecret}
          dataObject={model}
          setDataObject={setModel}
          fieldName={"excludeSecrets"}
          allowIncompleteItems={false}
          type={"Secrets"}
          disabled={false}
          regexValidationRequired={false}
          titleText={"Secrets to Ignore"}
          subtitleText={"Secret"}
        />
      );
    }
    if (model?.getData("filesException") === true && fieldName === "filesException") {
      return (
        <ScraperCommonInputBase
          titleIcon={faFileCode}
          dataObject={model}
          setDataObject={setModel}
          fieldName={"excludeFiles"}
          allowIncompleteItems={false}
          type={"Git Files"}
          disabled={false}
          regexValidationRequired={false}
          titleText={"Project Files to Ignore"}
          subtitleText={"Absolute File Path"}
        />
      );
    }
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
      {getParametersInput()}
    </>
  );
}

GitIgnoreToggleInput.propTypes = {
  model: PropTypes.object,
  fieldName: PropTypes.string,
  setModel: PropTypes.func,
  disabled: PropTypes.bool
};

export default GitIgnoreToggleInput;