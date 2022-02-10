import React, { useState } from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InfoText from "components/common/inputs/info_text/InfoText";
import { Button, Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TextInputWithButtonAWSLambda({
                                   fieldName,
                                   dataObject,
                                   setDataObject,
                                   disabled,
                                   type,
                                   extraActionButtons,
                                   inputClasses,
                                   btnVariant,
                                   btnText,
                                   btnIcon,
                                   btnDisabled,
                                   btnClickHandler,
                                   btnToolTipText,
                                   errorMsg,
                                   successMsg
                                 }) {
  const [field, setField] = useState(dataObject.getFieldById(fieldName));
  const [errorMessage, setErrorMessage] = useState(errorMsg);

  const validateAndSetData = (value) => {
    let newDataObject = dataObject;
    newDataObject.setTextData(fieldName, value);
    setErrorMessage(newDataObject.getFieldError(fieldName));
    setDataObject({ ...newDataObject });
  };

  const getInputClasses = () => {
    let classes = `form-control`;

    if (errorMessage !== "" || errorMsg !== "") {
      classes += ` border border-danger error-text`;
    }

    if (inputClasses) {
      classes += ` ${inputClasses}`;
    }

    return classes;
  };

  const getButton = () => {

    if(btnToolTipText != null && btnToolTipText !== "") {
      return (
        <OverlayTrigger
          placement="top"
          delay={{ hide: 150 }}
          overlay={ <Tooltip>{btnToolTipText}</Tooltip> }
        >
          <Button size="md" variant={btnVariant} disabled={btnDisabled} onClick={btnClickHandler}>
            <span>
              {btnIcon && <FontAwesomeIcon icon={btnIcon} fixedWidth className="mr-2" />}
              {btnText}
            </span>
          </Button>
        </OverlayTrigger>
      );
    }

    return (
      <Button size="md" variant={btnVariant} disabled={btnDisabled} onClick={btnClickHandler}>
        <span>
          {btnIcon && <FontAwesomeIcon icon={btnIcon} fixedWidth className="mr-2" />}
          {btnText}
        </span>
      </Button>
    );
  };

  return (
    <InputContainer>
      <InputLabel field={field} extraActionButtons={extraActionButtons} model={dataObject} />
      <Row>
        <div className="input-group mb-3 ml-3 mr-3">
          <input
            type={type}
            disabled={disabled}
            value={dataObject.getData(fieldName)}
            onChange={(event) => validateAndSetData(event.target.value)}
            className={getInputClasses()}
          />
            <div className="input-group-append">
              {getButton()}
            </div>
        </div>
      </Row>
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
        errorMessage={errorMessage || errorMsg}
        successMessage={successMsg}
      />
    </InputContainer>
  );
}

TextInputWithButtonAWSLambda.propTypes = {
  type: PropTypes.string,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  extraActionButtons: PropTypes.any,
  inputClasses: PropTypes.string,
  disabled: PropTypes.bool,
  btnVariant: PropTypes.string,
  btnText: PropTypes.string,
  btnDisabled: PropTypes.bool,
  btnClickHandler: PropTypes.func,
  btnIcon: PropTypes.object,
  btnToolTipText: PropTypes.string,
  errorMsg: PropTypes.string,
  successMsg: PropTypes.string,
};

export default TextInputWithButtonAWSLambda;