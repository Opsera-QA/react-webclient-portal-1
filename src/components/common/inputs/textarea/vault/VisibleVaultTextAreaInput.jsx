import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import ShowSensitiveDataButton from "components/common/buttons/data/ShowSensitiveDataButton";
import CopyToClipboardButton from "components/common/buttons/data/CopyToClipboardButton";
import {parseError} from "components/common/helpers/error-helpers";
import { hasStringValue } from "components/common/helpers/string-helpers";

function VisibleVaultTextAreaInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    pullVaultDataFunction,
    isLoading,
    setDataFunction,
    error,
    customMessage,
    parameterId,
  }) {
  const [field] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [pullingValueFromVault, setPullingValueFromVault] = useState(false);
  const [valueShown, setValueShown] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    if (hasStringValue(model?.getData(fieldName)) !== true) {
      setValueShown(false);
    }

    return () => {
      isMounted.current = false;
    };
  }, [parameterId]);

  useEffect(() => {
    setErrorMessage(error ? parseError(error) : "");
  }, [error]);

  const validateAndSetData = (value) => {
    const newModel = model;
    newModel.setTextData(fieldName, value);
    setErrorMessage(newModel.getFieldError(fieldName));
    setModel({...newModel});
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      const newDataObject = setDataFunction(fieldName, newValue);

      if (newDataObject) {
        setErrorMessage(newDataObject?.getFieldError(fieldName));
      }
    }
    else {
      validateAndSetData(newValue);
    }
  };

  const hideValue = () => {
    setValueShown(false);
  };

  const showData = async () => {
    if (isMounted?.current === true) {
      try {
        setPullingValueFromVault(true);

        if (pullVaultDataFunction) {
          await pullVaultDataFunction();
        }
        setValueShown(true);
      }
      catch (error) {
        setErrorMessage(error);
      }
      finally {
        if (isMounted?.current === true) {
          setPullingValueFromVault(false);
        }
      }
    }
  };

  const getSensitiveDataButton = () => {
    if (pullVaultDataFunction) {
      return (
        <ShowSensitiveDataButton
          isLoading={pullingValueFromVault || isLoading}
          showDataFunction={showData}
          hideDataFunction={hideValue}
          className={"input-button"}
          valueShown={valueShown}
        />
      );
    }
  };

  const getButtons = () => {
    if (model?.isNew() !== true) {
      return (
        <div>
          {getSensitiveDataButton()}
          <CopyToClipboardButton
            copyString={model?.getData(fieldName)}
            className={"input-button mt-2"}
          />
        </div>
      );
    }
  };

  const getPlaceholderText = () => {
    if (valueShown === false) {
      return ("Value must be pulled from the Vault to be visible.");
    }

    return ("No value saved in the Vault.");
  };

  if (field == null) {
    return null;
  }

  return (
    <InputContainer>
      <InputLabel
        field={field}
        model={model}
      />
      <div className={"d-flex"}>
        <textarea
          style={valueShown === false && !pullingValueFromVault ? {WebkitTextSecurity: 'disc'} : undefined}
          disabled={disabled || pullingValueFromVault}
          value={pullingValueFromVault || isLoading ? "Loading Value From Vault" : model?.getData(fieldName)}
          onChange={(event) => updateValue(event.target.value)}
          className={"form-control"}
          placeholder={getPlaceholderText()}
          rows={5}
        />
        <div className={"ml-2"}>
          {getButtons()}
        </div>
      </div>
      <InfoText
        model={model}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
        customMessage={customMessage}
      />
    </InputContainer>
  );
}

VisibleVaultTextAreaInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  pullVaultDataFunction: PropTypes.func,
  isLoading: PropTypes.bool,
  setDataFunction: PropTypes.func,
  error: PropTypes.any,
  customMessage: PropTypes.string,
  parameterId: PropTypes.string,
};

export default VisibleVaultTextAreaInput;