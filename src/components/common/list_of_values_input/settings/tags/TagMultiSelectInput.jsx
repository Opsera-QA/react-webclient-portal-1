import React, {useState} from "react";
import PropTypes from "prop-types";
import InputContainer from "components/common/inputs/InputContainer";
import InputLabel from "components/common/inputs/info_text/InputLabel";
import TagMultiSelectInputBase from "components/common/list_of_values_input/settings/tags/TagMultiSelectInputBase";

function TagMultiSelectInput(
  {
    fieldName,
    dataObject,
    setDataObject,
    disabled,
    setDataFunction,
    showLabel,
    className,
    infoOverlay,
    inputHelpOverlay,
  }) {
  const [field] = useState(dataObject.getFieldById(fieldName));

  if (field == null) {
    return null;
  }

  return (
    <InputContainer className={className}>
      <InputLabel
        field={field}
        showLabel={showLabel}
        model={dataObject}
        infoOverlay={infoOverlay}
        inputHelpOverlay={inputHelpOverlay}
      />
      <TagMultiSelectInputBase
        fieldName={fieldName}
        dataObject={dataObject}
        setDataObject={setDataObject}
        setDataFunction={setDataFunction}
        disabled={disabled}
      />
    </InputContainer>
  );
}

TagMultiSelectInput.propTypes = {
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataFunction: PropTypes.func,
  showLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  infoOverlay: PropTypes.any,
  inputHelpOverlay: PropTypes.any,
};

TagMultiSelectInput.defaultProps = {
  fieldName: "tags"
};

export default TagMultiSelectInput;