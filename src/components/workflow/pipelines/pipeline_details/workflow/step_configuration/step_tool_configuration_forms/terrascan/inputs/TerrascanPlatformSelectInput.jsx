import React from "react";
import PropTypes from "prop-types";
import SelectInputBase from "components/common/inputs/select/SelectInputBase";

const TOOL_TYPES = [
  {
    label: "AWS",
    value: "aws",
  },
  {
    label: "Azure",
    value: "azure",
  },
  {
    label: "Google Cloud Platform",
    value: "gcp",
  },
  {
    label: "Github",
    value: "github",
  },
  {
    label: "Kubernetes",
    value: "k8s",
  },
];

function TerrascanPlatformSelectInput({ fieldName, dataObject, setDataObject, disabled }) {

  const handleDTOChange = (fieldName, value) => {
    let newDataObject = {...dataObject};
    newDataObject.setData("platform", value.value);
    newDataObject.setData("rules", []);
    setDataObject({...newDataObject});
  };

  return (
    <div className={"mb-3"}>
    <SelectInputBase
      fieldName={fieldName}
      dataObject={dataObject}
      setDataFunction={handleDTOChange}
      setDataObject={setDataObject}
      placeholderText={"Select Cloud Provider"}
      selectOptions={TOOL_TYPES}
      valueField="value"
      textField="label"
      disabled={disabled}
    />
    </div>
  );
}

TerrascanPlatformSelectInput.propTypes = {
  fieldName: PropTypes.string,
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
};

TerrascanPlatformSelectInput.defaultProps = {
  fieldName: "platform",
};

export default TerrascanPlatformSelectInput;
