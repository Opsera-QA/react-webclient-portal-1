import React from "react";
import PropTypes from "prop-types";
import TagSelectInput from "components/common/list_of_values_input/settings/tags/TagSelectInput";

function StepConfigurationEnvironmentTagInput({ dataObject, setDataObject, className, fieldName}) {
  const validateAndSetData = (fieldName, value) => {
    let newDataObject = dataObject;
    const tags = [value];
    newDataObject.setData(fieldName, tags);
    setDataObject({...newDataObject});
  };

  const getCurrentValue = () => {
    const tags = dataObject.getArrayData("tags");

    if (Array.isArray(tags) && tags.length > 0) {
      const tag = tags[0];

      if (tag.type === "environment") {
        return tag;
      }
    }

    return null;
  };

  return (
    <TagSelectInput
      className={className}
      allowedTypes={["environment"]}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      getCurrentValue={getCurrentValue}
      setDataFunction={validateAndSetData}
    />
  );
}

StepConfigurationEnvironmentTagInput.propTypes = {
  className: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  fieldName: PropTypes.string
};

StepConfigurationEnvironmentTagInput.defaultProps = {
  fieldName: "tags"
};

export default StepConfigurationEnvironmentTagInput;


