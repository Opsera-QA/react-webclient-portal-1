import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

function DtoJsonInput({fieldName, dataObject, setDataObject, disabled}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(dataObject.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    try {
      let json = JSON.parse(value.json);
      newDataObject.setData(fieldName, JSON.parse(value.json));
      let errors = newDataObject.isFieldValid(field.id);

      if (errors != null && errors !== true) {
       setErrorMessage(errors[0]);
      }
      else {
        setErrorMessage("");
      }

      setDataObject({...newDataObject});
    }
    catch (error)
    {
      // TODO: Determine if necessary
      // setErrorMessage(JSON.stringify(error));
    }
  };

  return (
    <>
      {dataObject &&
      <div className="form-group custom-text-input m-2">
        <label>{field.label}{field.isRequired ?
          <span className="danger-red">*</span> : null}</label>
        <JSONInput
          placeholder={dataObject.getData(fieldName)}
          onChange={e => validateAndSetData(fieldName, e)}
          theme="light_mitsuketa_tribute"
          locale={locale}
          height="300px"
          width="100%"
        />
        <div className="invalid-feedback">{errorMessage}</div>
        <small className="text-muted form-text">
          <div>{field.formText}</div>
        </small>
      </div>}
    </>
  );
}

DtoJsonInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default DtoJsonInput;