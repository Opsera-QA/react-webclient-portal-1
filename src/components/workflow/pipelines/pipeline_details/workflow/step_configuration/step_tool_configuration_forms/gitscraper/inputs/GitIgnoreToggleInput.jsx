import React from "react";
import PropTypes from "prop-types";
import BooleanToggleInput from "components/common/inputs/boolean/BooleanToggleInput";
import ScraperCommonInputBase from "./ScraperCommonInputBase";
import { faFileCode, faHandshake, faUserSecret } from "@fortawesome/pro-light-svg-icons";
import GitSecretsToIgnoreInput from "./GitSecretsToIgnoreInput";
import ParameterSelectListInputBase
  from "../../../../../../../../common/list_of_values_input/parameters/ParameterSelectListInputBase";

function GitIgnoreToggleInput({model, setModel, fieldName, disabled, plan}) {

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
      <ParameterSelectListInputBase
        titleIcon={faUserSecret}
        dataObject={model}
        setDataObject={setModel}
        fieldName={"excludeSecrets"}
        allowIncompleteItems={true}
        type={"Secret"}
        regexValidationRequired={false}
        titleText={"Secrets To Ignore"}
        plan={plan}
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
  disabled: PropTypes.bool,
  plan: PropTypes.array
};

export default GitIgnoreToggleInput;