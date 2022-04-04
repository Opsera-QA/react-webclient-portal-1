import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import ShowSensitiveDataButton from "components/common/buttons/data/ShowSensitiveDataButton";
import CopyToClipboardButton from "components/common/buttons/data/CopyToClipboardButton";
import InputLabel from "components/common/inputs/info_text/InputLabel";

function TogglePasswordTextAreaInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
  }) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [valueShown, setValueShown] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    setValueShown(false);
    setField(model?.getFieldById(fieldName));

    return () => {
      isMounted.current = false;
    };
  }, [fieldName]);

  const validateAndSetData = (value) => {
    let newDataObject = model;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setModel({...newDataObject});
  };

  const hideDataFunction = () => {
    setValueShown(false);
  };

  const showDataFunction = async () => {
    setValueShown(true);
  };

  const getSensitiveDataButton = () => {
    if (model?.isNew() === true || model?.getData("vaultEnabled") === true) {
      return (
        <ShowSensitiveDataButton
          showDataFunction={showDataFunction}
          hideDataFunction={hideDataFunction}
          className={"input-button mb-2"}
          valueShown={valueShown}
        />
      );
    }
  };

  const getButtons = () => {
    if (!model?.isNew()) {
      return (
        <div>
          {getSensitiveDataButton()}
          <CopyToClipboardButton
            copyString={model?.getData(fieldName)}
            className={"input-button"}
          />
        </div>
      );
    }

    return (
      <div className={"d-flex"}>
        {getSensitiveDataButton()}
      </div>
    );
  };

  const getInputStyling = () => {
    if ((model?.isNew() === true || model?.getData("vaultEnabled") === true) && valueShown === false) {
      return ({WebkitTextSecurity: 'disc'});
    }
  };

  if (model == null || field == null) {
    return null;
  }

  return (
    <InputContainer>
      <InputLabel
        model={model}
        field={field}
      />
      <div className={"d-flex"}>
        <textarea
          style={getInputStyling()}
          disabled={disabled}
          value={model?.getData(fieldName)}
          onChange={(event) => validateAndSetData(event.target.value)}
          className={"form-control"}
          rows={5}
        />
        <div className={"ml-2"}>
          {getButtons()}
        </div>
      </div>
      <InfoText
        errorMessage={errorMessage}
      />
    </InputContainer>
  );
}

TogglePasswordTextAreaInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TogglePasswordTextAreaInput;