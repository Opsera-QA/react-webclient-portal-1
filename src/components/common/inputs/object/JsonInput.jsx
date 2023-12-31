import React, {useState} from "react";
import PropTypes from "prop-types";
import locale from "react-json-editor-ajrm/locale/en";
import InfoText from "components/common/inputs/info_text/InfoText";
import ReactJson from "react-json-view";
import InputTitleBar from "components/common/inputs/info_text/InputTitleBar";
import {faBracketsCurly} from "@fortawesome/pro-light-svg-icons";
import JSONInput from "react-json-editor-ajrm";
import {objectHelpers} from "components/common/helpers/object/object.helpers";

// TODO: Rewrite and use json input base as base
function JsonInput(
  {
    fieldName,
    model,
    setModel,
    disabled,
    className,
    isLoading,
    customTitle,
    helpComponent,
    setDataFunction,
  }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [field] = useState(model.getFieldById(fieldName));

  const validateAndSetData = (fieldName, value) => {
    let newDataObject = model;
    try {
      let json = objectHelpers.parseJson(value?.json);
      newDataObject.setData(fieldName, json);
      setErrorMessage(newDataObject.getFieldError(fieldName));
      setModel({...newDataObject});
    }
    catch (error)
    {
      // TODO: Determine if necessary
      // setErrorMessage(JSON.stringify(error));
    }
  };

  const updateValue = (newValue) => {
    if (setDataFunction) {
      setDataFunction(fieldName, newValue);
    }
    else {
      validateAndSetData(fieldName,newValue);
    }
  };

  // TODO: Verify we can't just use ReactJson when not disabled
  const getBody = () => {
    if (disabled === true) {
      return (
        <ReactJson
          theme="light_mitsuketa_tribute"
          locale={locale}
          disabled={disabled}
          height="300px"
          width="100%"
          src={model.getData(fieldName)}
        />
      );
    }

    return (
      <JSONInput
        placeholder={model?.getData(fieldName)}
        onChange={e => updateValue(e)}
        theme="light_mitsuketa_tribute"
        locale={locale}
        height="300px"
        width="100%"
      />
    );
  };

  return (
    <div className={className}>
      <div className="object-properties-input">
        <div className="content-container">
          <InputTitleBar
            field={field}
            icon={faBracketsCurly}
            isLoading={isLoading}
            customTitle={customTitle}
            helpComponent={helpComponent}
          />
          <div>
            {getBody()}
          </div>
        </div>
        <InfoText
          fieldName={fieldName}
          model={model}
          field={field}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
}

JsonInput.propTypes = {
  fieldName: PropTypes.string,
  model: PropTypes.object,
  setModel: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  customTitle: PropTypes.string,
  helpComponent: PropTypes.object,
  setDataFunction: PropTypes.func,
};

export default JsonInput;