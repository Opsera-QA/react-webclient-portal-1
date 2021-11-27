import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import ShowSensitiveDataButton from "components/common/buttons/data/ShowSensitiveDataButton";
import CopyToClipboardButton from "components/common/buttons/data/CopyToClipboardButton";

// TODO: We should also make a generic show/hide text input with copy capabilities.
function VisibleVaultTextInput({fieldName, dataObject, setDataObject, disabled, pullVaultDataFunction, hideIfNotShown, isLoading}) {
  const field = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [pullingValueFromVault, setPullingValueFromVault] = useState(false);
  const [valueShown, setValueShown] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({...newDataObject});
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
          className={"input-button mr-2"}
          valueShown={valueShown}
        />
      );
    }
  };

  const getButtons = () => {
    if (!dataObject?.isNew()) {
      return (
        <div className={"d-flex ml-2"}>
          {getSensitiveDataButton()}
          <CopyToClipboardButton
            copyString={dataObject?.getData(fieldName)}
            className={"input-button"}
          />
        </div>
      );
    }
  };

  return (
    <InputContainer>
      <InputLabel field={field} model={dataObject}/>
      <div className={"d-flex"}>
        <input
          type={hideIfNotShown === true && valueShown === false && !pullingValueFromVault ? "password" : undefined}
          disabled={disabled || pullingValueFromVault}
          value={pullingValueFromVault || isLoading ? "Loading Value From Vault" : dataObject?.getData(fieldName)}
          onChange={(event) => validateAndSetData(event.target.value)}
          className="form-control"
        />
        {getButtons()}
      </div>
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

VisibleVaultTextInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  pullVaultDataFunction: PropTypes.func,
  hideIfNotShown: PropTypes.bool,
  isLoading: PropTypes.bool
};

export default VisibleVaultTextInput;