import React, {useState} from "react";
import PropTypes from "prop-types";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import ReactJson from "react-json-view";

// TODO: Finish configuring when wired up
function JsonInput({fieldName, dataObject, setDataObject, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    try {
      let json = JSON.parse(value.json);
      newDataObject.setData(fieldName, json);
      setErrorMessage(newDataObject.getFieldError(fieldName));
      setDataObject({...newDataObject});
    }
    catch (error)
    {
      // TODO: Determine if necessary
      // setErrorMessage(JSON.stringify(error));
    }
  };

  if (disabled) {
    return (
      <InputContainer className="custom-text-input my-2">
        <InputLabel field={field}/>
        <ReactJson
          theme="light_mitsuketa_tribute"
          locale={locale}
          disabled={disabled}
          height="300px"
          width="100%"
          src={dataObject.getData(fieldName)}
        />
        <InfoText field={field} errorMessage={errorMessage}/>
      </InputContainer>
    );
  }

  return (
    <InputContainer className="custom-text-input my-2">
      <InputLabel field={field}/>
        <JSONInput
          placeholder={dataObject.getData(fieldName)}
          onChange={e => validateAndSetData(fieldName, e)}
          theme="light_mitsuketa_tribute"
          locale={locale}
          height="300px"
          width="100%"
        />
      <InfoText field={field} errorMessage={errorMessage}/>
    </InputContainer>
  );
}

JsonInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default JsonInput;