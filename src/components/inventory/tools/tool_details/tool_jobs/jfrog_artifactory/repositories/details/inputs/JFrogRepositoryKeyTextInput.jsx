import React, {useState} from "react";
import PropTypes from "prop-types";
import TextInputBase from "components/common/inputs/text/TextInputBase";
import InfoText from "components/common/inputs/info_text/InfoText";

function JFrogRepositoryKeyTextInput(
  {
    model,
    setModel,
    fieldName,
    disabled,
    className,
  }) {
  const validationText = `Repository Name cannot end with "-cache".`;
  const [errorMessage, setErrorMessage] = useState("");

  const setDataFunction = (fieldName, newValue) => {
    const newModel = {...model};

    if (newValue.endsWith("-cache")) {
      setErrorMessage(validationText);
    }
    else {
      setErrorMessage("");
      model.setData(fieldName, newValue);
      setModel({...newModel});
    }
  };

  return (
    <>
      <TextInputBase
        className={className}
        disabled={disabled}
        fieldName={fieldName}
        dataObject={model}
        setDataObject={setModel}
        setDataFunction={setDataFunction}
        error={errorMessage}
      />
      <InfoText customMessage={validationText} />
    </>
  );
}

JFrogRepositoryKeyTextInput.propTypes = {
  model: PropTypes.object,
  setModel: PropTypes.func,
  fieldName: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

JFrogRepositoryKeyTextInput.defaultProps = {
  fieldName: "key",
};

export default JFrogRepositoryKeyTextInput;
