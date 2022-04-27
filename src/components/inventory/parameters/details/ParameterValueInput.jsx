import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import CopyToClipboardButton from "components/common/buttons/data/CopyToClipboardButton";
import ShowSensitiveDataButton from "components/common/buttons/data/ShowSensitiveDataButton";

function ParameterValueTextInput(
  {
    fieldName,
    model,
    parameterId,
    setModel,
    disabled,
    inputHelpOverlay,
    infoOverlay,
  }) {
  const [field, setField] = useState(model.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [valueShown, setValueShown] = useState(false);
  const [secretValue, setSecretValue] = useState("");
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    setSecretValue("");
    setValueShown(false);
    return () => {
      isMounted.current = false;
    };
  }, [parameterId]);

  const validateAndSetData = (value) => {
    let newDataObject = model;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setModel({...newDataObject});
  };

  const getValueFromVault = async () => {
    try {
      setIsLoading(true);
      if (!model.isNew() && model?.getData("vaultEnabled") === true) {
        setSecretValue(await model.getValueFromVault(fieldName));
      }
    }
    catch (error) {
      if (isMounted.current === true) {
        if (error?.response?.status === 404) {
          setErrorMessage("No value stored in vault");
        } else {
          setErrorMessage("Could not pull value from Vault");
          console.error(error);
        }
      }
    }
    finally {
      setIsLoading(false);
    }
  };

  const getButtons = () => {
    return (
      <div className={"d-flex ml-2"}>
        <ShowSensitiveDataButton
          showDataFunction={showData}
          hideDataFunction={hideValue}
          isLoading={isLoading}
          className={"input-button"}
          valueShown={valueShown || model?.isChanged(fieldName)}
          disable={model?.isChanged(fieldName)}
        />
        <CopyToClipboardButton
          copyString={model?.getData(fieldName)}
          className={"input-button ml-2"}
        />
      </div>
    );
  };

  const hideValue = () => {
    setSecretValue("");
    setValueShown(false);
  };

  const showData = async () => {
    await getValueFromVault();
    setValueShown(true);
  };

  const getValue = () => {
    if (valueShown === true && !model?.isChanged(fieldName)) {
      return secretValue;
    }

    if (typeof model?.getData(fieldName) === "object") {
      return "stored_in_vault";
    }

    return (model?.getData(fieldName));
  };

  return (
    <InputContainer>
      <InputLabel
        field={field}
        model={model}
        infoOverlay={infoOverlay}
        inputHelpOverlay={inputHelpOverlay}
      />
      <div className={"d-flex"}>
        <textarea
          type={valueShown === false && !model?.isChanged(fieldName) ? "password" : undefined}
          disabled={disabled}
          value={getValue()}
          onChange={(event) => validateAndSetData(event.target.value)}
          className="form-control"
          autoComplete="off"
        />
        {getButtons()}
      </div>
      <InfoText
        model={model}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

ParameterValueTextInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  parameterId: PropTypes.string,
  infoOverlay: PropTypes.any,
  inputHelpOverlay: PropTypes.any,
};

export default ParameterValueTextInput;