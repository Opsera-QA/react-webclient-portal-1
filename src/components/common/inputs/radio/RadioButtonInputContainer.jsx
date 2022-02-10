import React, {useState} from "react";
import PropTypes from "prop-types";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import InputContainer from "components/common/inputs/InputContainer";
import InfoText from "components/common/inputs/info_text/InfoText";

function RadioButtonInputContainer({ fieldName, dataObject, children, className}) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  return (
    <InputContainer className={className ? className : "custom-radio-button-input my-2"}>
      <InputLabel field={field} model={dataObject} />
      {children}
      <InfoText
        model={dataObject}
        fieldName={fieldName}
        field={field}
      />
    </InputContainer>
  );
}

RadioButtonInputContainer.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string
};

export default RadioButtonInputContainer;