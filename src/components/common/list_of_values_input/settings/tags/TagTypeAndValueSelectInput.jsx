import React from "react";
import PropTypes from "prop-types";
import TagSelectInput from "components/common/list_of_values_input/settings/tags/TagSelectInput";

// TODO: THis isn't used anywhere so it needs to be reused
function TagTypeAndValueSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = dataObject;
    let tag = `${value["type"]}: ${value["value"]}`;
    dataObject.setData(fieldName, tag)
    setDataObject({...newDataObject});
  };

  return (
    <TagSelectInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

TagTypeAndValueSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default TagTypeAndValueSelectInput;