import React from "react";
import PropTypes from "prop-types";
import TagMutliSelectInput from "components/common/list_of_values_input/settings/tags/TagMutliSelectInput";

// TODO: THis isn't used anywhere so it needs to be reused
function TagTypeAndValueMultiSelectInput({ fieldName, dataObject, setDataObject, disabled}) {
  const setDataFunction = (fieldName, value) => {
    let newDataObject = dataObject;
    let tags = [];

    if (Array.isArray(value) && value.length > 0) {
      value.map((tag) => tags.push({type: tag["type"], value: tag["value"], _id: tag["_id"]}));
    }
    else {
      newDataObject.setData(fieldName, tags);
    }

    setDataObject({...newDataObject});
  };

  return (
    <TagMutliSelectInput
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      setDataFunction={setDataFunction}
      disabled={disabled}
    />
  );
}

TagTypeAndValueMultiSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool
};

export default TagTypeAndValueMultiSelectInput;