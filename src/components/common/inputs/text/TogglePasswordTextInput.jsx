import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";
import ShowSensitiveDataButton from "components/common/buttons/data/ShowSensitiveDataButton";
import CopyToClipboardButton from "components/common/buttons/data/CopyToClipboardButton";
import InputLabel from "components/common/inputs/info_text/InputLabel";

function TogglePasswordTextInput({fieldName, model, setModel, disabled}) {
  const [field, setField] = useState(model?.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState("");
  const [valueShown, setValueShown] = useState(false);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

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
    return (
      <ShowSensitiveDataButton
        showDataFunction={showDataFunction}
        hideDataFunction={hideDataFunction}
        className={"input-button"}
        valueShown={valueShown}
      />
    );
  };

  const getButtons = () => {
    if (!model?.isNew()) {
      return (
        <div className={"d-flex ml-auto mt-2"}>
          {getSensitiveDataButton()}
          <CopyToClipboardButton
            copyString={model?.getData(fieldName)}
            className={"input-button"}
          />
        </div>
      );
    }

    return (
      <div className={"d-flex ml-auto mt-2"}>
        {getSensitiveDataButton()}
      </div>
    );
  };

  if (model == null || field == null) {
    return null;
  }

  return (
    <InputContainer>
      <InputLabel model={model} field={field}/>
      <div>
        <textarea
          style={valueShown  === false ? {WebkitTextSecurity: 'disc'} : undefined}
          disabled={disabled}
          value={model?.getData(fieldName)}
          onChange={(event) => validateAndSetData(event.target.value)}
          className={"form-control"}
          rows={5}
        />
        <div className={"d-flex w-100"}>
          {getButtons()}
        </div>
      </div>
      <InfoText
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage}
        model={model}
      />
    </InputContainer>
  );
}

TogglePasswordTextInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TogglePasswordTextInput;