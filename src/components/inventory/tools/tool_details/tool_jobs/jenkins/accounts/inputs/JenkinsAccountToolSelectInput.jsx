import React from "react";
import PropTypes from "prop-types";
import PipelineToolInput from "components/common/list_of_values_input/workflow/pipelines/PipelineToolInput";

function JenkinsAccountToolSelectInput({ visible, dataObject, setDataObject, disabled, fieldName }) {
  const setProjectMappingTool = (fieldName, selectedOption) => {
    dataObject.setData(fieldName, "");
    dataObject.setData("credentailsToolId", "");
    dataObject.setData("gitCredential", "");
    dataObject.setData("gitUserName", "");
    dataObject.setData("accountUserName", "");
    let newDataObject = { ...dataObject };
    newDataObject.setData(fieldName, selectedOption.id);
    newDataObject.setData("credentailsToolId", selectedOption.id);
    newDataObject.setData("gitCredential", "");
    newDataObject.setData("gitUserName", selectedOption?.configuration?.accountUsername || "");
    newDataObject.setData("accountUserName", selectedOption?.configuration?.accountUsername || "");
    setDataObject({ ...newDataObject });
  };

  if (!visible) {
    return <></>;
  }

  return (
    <PipelineToolInput
      toolType={dataObject.getData("service")}
      setDataFunction={setProjectMappingTool}
      fieldName={fieldName}
      dataObject={dataObject}
      setDataObject={setDataObject}
      placeholderText={"Select a Tool"}
      visible={visible}
      disabled={disabled || dataObject.getData("service") === ""}
    />
  );
}

JenkinsAccountToolSelectInput.propTypes = {
  dataObject: PropTypes.object,
  setDataObject: PropTypes.func,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  visible: PropTypes.bool,
};

JenkinsAccountToolSelectInput.defaultProps = {
  visible: true,
  fieldName: "toolId",
};

export default JenkinsAccountToolSelectInput;
